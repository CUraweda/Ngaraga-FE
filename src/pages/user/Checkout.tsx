"use client";

import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddressManager } from "@/components/checkout/AddressManager";
import { DeliveryOptions } from "@/components/checkout/DeliveryOptions";
import { PaymentOptions } from "@/components/checkout/PaymentOptions";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { useCheckoutStore } from "@/store/checkout.store";
import { toast } from "react-hot-toast";
import userStore from "@/store/user.store";

export interface CheckoutStep {
  number: number;
  title: string;
  active: boolean;
  completed: boolean;
}

export interface CustomerData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  subdistrict: string;
  postalCode: string;
  addressDetails: string;
  notes: string;
  isDefault?: boolean;
}

export interface Address {
  label: any;
  province: any;
  city: any;
  addressId: any; // receiver_destination_id untuk ongkir
  subdistrict: any;
  postalCode: any;
  id: string; // UUID alamat
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems, totalAmount } = location.state || {
    selectedItems: [],
    totalAmount: 0,
  };

  const {
    currentStep,
    setCurrentStep,
    customerType,
    deliveryMethod,
    selectedDelivery,
    setSelectedDelivery,
    selectedPayment,
    setSelectedPayment,
    selectedAddress,
    setSelectedAddress,
    customerData,
    setCustomerData,
    addresses,
    isLoading,
    setIsLoading,
    errors,
    setErrors,
    clearErrors,

    // payment & transaction
    transactionId,
    paymentStatus,
    isCheckingPayment,
    checkPaymentStatus,
    stopPaymentStatusPolling,
    paymentTimer,
    paymentExpiresAt,

    // cart & shipping
    fetchCartItems,
    cartGrandTotal,
    shippingOptions,
    shippingLoading,
    shippingError,
    calculatePostage,

    // transaction
    createTransaction,
  } = useCheckoutStore();

  const { getUser, user } = userStore();

  // Bootstrap user & cart
  useEffect(() => {
    (async () => {
      if (!user?.id) await getUser();
      const uid = userStore.getState().user?.id;
      if (uid) await fetchCartItems(uid as string);
    })();
  }, [fetchCartItems]);

  // Init data customer
  useEffect(() => {
    setCustomerData({
      name: "",
      email: "",
      phone: "",
      country: "Indonesia",
      state: "",
      city: "",
      subdistrict: "",
      postalCode: "",
      addressDetails: "",
      notes: "",
    });
  }, [setCustomerData]);

  // Cleanup polling saat unmount
  useEffect(() => {
    return () => {
      stopPaymentStatusPolling();
    };
  }, [stopPaymentStatusPolling]);

  const subtotal = cartGrandTotal || totalAmount || 0;

  const selectedDeliveryOption = useMemo(
    () => shippingOptions.find((d) => d.id === selectedDelivery),
    [shippingOptions, selectedDelivery]
  );
  const shipping = selectedDeliveryOption?.shipping_cost_net ?? 0;

  const discount = 0;
  const vat = Math.round((subtotal + shipping - discount) * 0.11);
  const total = subtotal + shipping - discount + vat;

  // Auto-redirect ke success (tetap)
  useEffect(() => {
    if (paymentStatus === "SUCCESS" && currentStep === 3) {
      toast.success("Payment confirmed! Redirecting to order success...");
      setTimeout(() => {
        navigate("/order-success", {
          state: {
            orderId: transactionId || "ORD-" + Date.now(),
            total,
            paymentMethod:
              (["BCAVA", "BNIVA", "BRIVA", "QRIS"].includes(selectedPayment)
                ? {
                    BCAVA: "Bank BCA",
                    BNIVA: "Bank BNI",
                    BRIVA: "Bank BRI",
                    QRIS: "Qris",
                  }[selectedPayment as "BCAVA" | "BNIVA" | "BRIVA" | "QRIS"]
                : selectedPayment) || "Payment",
            deliveryMethod: deliveryMethod,
            deliveryOption:
              deliveryMethod === "delivery"
                ? selectedDeliveryOption
                  ? `${selectedDeliveryOption.shipping_name} ${selectedDeliveryOption.service_name}`
                  : "-"
                : "Pickup",
            pickupTime: deliveryMethod === "pickup" ? null : null,
            pickupLocation:
              deliveryMethod === "pickup" ? "Ngaraga by Dolanan" : null,
            deliveryAddress:
              deliveryMethod === "delivery" && selectedAddress
                ? selectedAddress.address
                : null,
          },
        });
      }, 1200);
    }
  }, [
    paymentStatus,
    currentStep,
    transactionId,
    total,
    selectedPayment,
    deliveryMethod,
    selectedDeliveryOption,
    selectedAddress,
    navigate,
  ]);

  // Validasi Step 1 (tetap)
  const validateStep1 = (): boolean => {
    clearErrors();
    const newErrors: Record<string, string> = {};

    if (customerType === "new") {
      if (!customerData.name.trim()) newErrors.name = "Name is required";
      if (!customerData.email.trim()) newErrors.email = "Email is required";
      if (!customerData.phone.trim()) newErrors.phone = "Phone is required";

      if (deliveryMethod === "delivery") {
        if (!customerData.addressDetails.trim())
          newErrors.addressDetails = "Address details is required";
        if (!customerData.postalCode.trim())
          newErrors.postalCode = "Postal code is required";
      }
    } else {
      if (deliveryMethod === "delivery" && !selectedAddress) {
        newErrors.address = "Please select an address";
      }
    }

    if (deliveryMethod === "delivery" && !selectedDelivery)
      newErrors.delivery = "Please select a delivery option";

    if (!selectedPayment) newErrors.payment = "Please select a payment method";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  // MASUK STEP 2 → buat transaksi (sekali) & biarkan store auto-polling
  const handleContinueToPayment = async () => {
    if (!validateStep1()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setCurrentStep(2); // tampilkan Step 2 dulu agar UI terasa cepat

    try {
      const uid = userStore.getState().user?.id as string | undefined;
      if (!uid) throw new Error("User belum login.");
      if (!selectedAddress?.id) throw new Error("Alamat belum dipilih.");
      if (!selectedDelivery)
        throw new Error("Metode pengiriman belum dipilih.");

      // Hanya buat transaksi jika belum ada
      if (!transactionId) {
        setIsLoading(true);
        await createTransaction({
          userId: uid,
          subTotal: subtotal,
          discount,
          tax: vat,
        });
        // Store akan otomatis start polling & timer
      } else {
        // Kalau sudah ada, untuk jaga-jaga mulai cek sekali
        void checkPaymentStatus(transactionId);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Gagal menginisiasi pembayaran."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Pilih alamat → hitung ongkir
  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    void calculatePostage(address.addressId);
    toast.success("Address selected");
  };

  const formatTimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: secs.toString().padStart(2, "0"),
    };
  };

  const getExpiryDate = () => {
    if (!paymentExpiresAt) return "-";
    const dt = new Date(paymentExpiresAt);
    return (
      dt.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    );
  };

  const steps: CheckoutStep[] = [
    {
      number: 1,
      title: "Information",
      active: currentStep === 1,
      completed: currentStep > 1,
    },
    {
      number: 2,
      title: "Payment",
      active: currentStep === 2,
      completed: currentStep > 2,
    },
    {
      number: 3,
      title: "Complete Order",
      active: currentStep === 3,
      completed: false,
    },
  ];

  const deliveryOptions = shippingOptions.length
    ? shippingOptions.map((o) => ({
        id: o.id,
        name: `${o.shipping_name} ${o.service_name}`,
        time: o.etd || "-",
        price: o.shipping_cost_net,
        raw: o,
        logo: `/placeholder.svg?height=40&width=80&text=${encodeURIComponent(
          o.shipping_name
        )}`,
      }))
    : [
        {
          id: "placeholder-1",
          name: "—",
          time: "-",
          price: 0,
          logo: "/placeholder.svg?height=40&width=80&text=—",
        },
      ];

  const paymentOptions = [
    {
      id: "BCAVA",
      name: "Bank BCA",
      logo: "/placeholder.svg?height=40&width=80&text=BCA",
    },
    {
      id: "BNIVA",
      name: "Bank BNI",
      logo: "/placeholder.svg?height=40&width=80&text=BNI",
    },
    {
      id: "BRIVA",
      name: "Bank BRI",
      logo: "/placeholder.svg?height=40&width=80&text=BRI",
    },
    {
      id: "QRIS",
      name: "Qris",
      logo: "/placeholder.svg?height=40&width=80&text=QRIS",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <CheckoutSteps steps={steps} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <AddressManager
                  addresses={addresses}
                  selectedAddress={selectedAddress}
                  onAddressSelect={handleAddressSelect}
                  onAddressEdit={() => {}}
                  onAddressDelete={() => {}}
                  onAddNewAddress={() => {}}
                  error={errors.address}
                />

                {/* Status kalkulasi ongkir */}
                {shippingLoading && (
                  <div className="mb-2 text-sm text-gray-500">
                    Calculating shipping options…
                  </div>
                )}
                {shippingError && (
                  <div className="mb-2 text-sm text-red-600">
                    {shippingError}
                  </div>
                )}

                <DeliveryOptions
                  options={deliveryOptions}
                  selectedDelivery={selectedDelivery}
                  onDeliverySelect={setSelectedDelivery}
                  error={errors.delivery}
                />

                <PaymentOptions
                  options={paymentOptions}
                  selectedPayment={selectedPayment}
                  onPaymentSelect={setSelectedPayment}
                  error={errors.payment}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Payment</h3>
                  {paymentStatus && (
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        paymentStatus === "SUCCESS"
                          ? "bg-green-100 text-green-800"
                          : paymentStatus === "FAILED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {paymentStatus === "SUCCESS"
                        ? "Payment Successful"
                        : paymentStatus === "FAILED"
                        ? "Payment Failed"
                        : "Payment Pending"}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="font-bold text-lg">
                      {transactionId
                        ? transactionId.slice(-8).toUpperCase()
                        : "ORD-" + Date.now().toString().slice(-8)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Payment Within</p>
                    <div className="flex items-center space-x-2 text-lg font-bold">
                      <span>{formatTimer(paymentTimer).hours}</span>
                      <span className="text-gray-400">:</span>
                      <span>{formatTimer(paymentTimer).minutes}</span>
                      <span className="text-gray-400">:</span>
                      <span>{formatTimer(paymentTimer).seconds}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Hours</span>
                      <span>Minutes</span>
                      <span>Seconds</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Due on {getExpiryDate()}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">Total Payment</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    Rp {total.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="border rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {(() => {
                        const selectedBank = paymentOptions.find(
                          (p) => p.id === selectedPayment
                        );
                        const getBankColor = (bankId: string) => {
                          switch (bankId) {
                            case "BCAVA":
                              return {
                                bg: "bg-blue-600",
                                text: "text-white",
                                short: "BCA",
                              };
                            case "BNIVA":
                              return {
                                bg: "bg-orange-500",
                                text: "text-white",
                                short: "BNI",
                              };
                            case "BRIVA":
                              return {
                                bg: "bg-blue-800",
                                text: "text-white",
                                short: "BRI",
                              };
                            case "QRIS":
                              return {
                                bg: "bg-red-600",
                                text: "text-white",
                                short: "QRIS",
                              };
                            default:
                              return {
                                bg: "bg-blue-600",
                                text: "text-white",
                                short: "BANK",
                              };
                          }
                        };
                        const bankStyle = getBankColor(selectedPayment || "");
                        return (
                          <>
                            <div
                              className={`w-12 h-8 ${bankStyle.bg} rounded flex items-center justify-center`}
                            >
                              <span
                                className={`${bankStyle.text} text-xs font-bold`}
                              >
                                {bankStyle.short}
                              </span>
                            </div>
                            <span className="font-medium">
                              {selectedBank?.name || "Select Payment"}
                            </span>
                          </>
                        );
                      })()}
                    </div>

                    {/* HAPUS refresh di header; pindah ke area bawah */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded-md hover:bg-yellow-50 transition-colors"
                      >
                        Change Payment
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Virtual Account Name
                      </p>
                      <p className="font-medium">Ngaraga</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Virtual Account Number
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">
                          8017
                          {transactionId
                            ? transactionId.slice(-8)
                            : Date.now().toString().slice(-8)}
                        </p>
                        <button
                          onClick={() => {
                            const vaNumber = `8017${
                              transactionId
                                ? transactionId.slice(-8)
                                : Date.now().toString().slice(-8)
                            }`;
                            navigator.clipboard.writeText(vaNumber);
                            toast.success("Virtual account number copied!");
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {paymentStatus === "SUCCESS" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <h5 className="font-medium text-green-800 mb-1">
                          Payment Successful!
                        </h5>
                        <p className="text-sm text-green-700">
                          Your payment has been confirmed. Redirecting to order
                          completion...
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* AREA BAWAH: ganti Pay Now -> Refresh Status */}
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      transactionId && checkPaymentStatus(transactionId)
                    }
                    disabled={isLoading || !transactionId || isCheckingPayment}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isCheckingPayment ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        <span>Checking...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        <span>Refresh Status</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Order Completed!</h3>
                <p className="text-gray-600 mb-4">
                  Your payment has been processed successfully.
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting to order confirmation...
                </p>
              </div>
            )}
          </div>

          {/* Summary Order */}
          <div className="lg:col-span-1">
            <OrderSummary
              selectedItems={selectedItems}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              vat={vat}
              total={total}
              currentStep={currentStep}
              onContinueToPayment={handleContinueToPayment}
              isLoading={isLoading}
              deliveryMethod={deliveryMethod ?? "delivery"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

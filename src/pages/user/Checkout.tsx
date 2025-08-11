"use client";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { AddressManager } from "@/components/checkout/AddressManager";
import { DeliveryOptions } from "@/components/checkout/DeliveryOptions";
import { PaymentOptions } from "@/components/checkout/PaymentOptions";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { useCheckoutStore } from "@/store/checkout.store";
import { toast } from "react-hot-toast";

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
  id: string;
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
    setCustomerType,
    deliveryMethod,
    setDeliveryMethod,
    selectedDelivery,
    setSelectedDelivery,
    selectedPayment,
    setSelectedPayment,
    selectedAddress,
    setSelectedAddress,
    customerData,
    setCustomerData,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    isLoading,
    setIsLoading,
    errors,
    setErrors,
    clearErrors,
  } = useCheckoutStore();

  // Initialize with mock data
  useEffect(() => {
    // Mock existing customer addresses
    const mockAddresses: Address[] = [
      {
        id: "1",
        name: "Animakid",
        phone: "+62 854 5565 6745",
        address:
          "Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110",
        isDefault: true,
      },
      {
        id: "2",
        name: "Animakid",
        phone: "+62 854 5565 6745",
        address: "Jl. Sudirman No.45, Jakarta Selatan, DKI Jakarta 12190",
        isDefault: false,
      },
    ];

    // Set mock addresses
    mockAddresses.forEach((addr) => addAddress(addr));
    setSelectedAddress(mockAddresses[0]);

    // Set default customer data for new customer form
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
  }, []);

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

  const deliveryOptions = [
    {
      id: "anteraja",
      name: "Anter Aja",
      time: "3-4 Days",
      price: 15000,
      logo: "/placeholder.svg?height=40&width=80&text=AnterAja",
    },
    {
      id: "jne",
      name: "JNE",
      time: "3-4 Days",
      price: 15000,
      logo: "/placeholder.svg?height=40&width=80&text=JNE",
    },
    {
      id: "idexpress",
      name: "ID Express",
      time: "3-4 Days",
      price: 15000,
      logo: "/placeholder.svg?height=40&width=80&text=IDExpress",
    },
  ];

  const paymentOptions = [
    {
      id: "bca",
      name: "Bank BCA",
      logo: "/placeholder.svg?height=40&width=80&text=BCA",
    },
    {
      id: "bni",
      name: "Bank BNI",
      logo: "/placeholder.svg?height=40&width=80&text=BNI",
    },
    {
      id: "bri",
      name: "Bank BRI",
      logo: "/placeholder.svg?height=40&width=80&text=BRI",
    },
    {
      id: "qris",
      name: "Qris",
      logo: "/placeholder.svg?height=40&width=80&text=QRIS",
    },
  ];

  const subtotal = totalAmount || 0;
  const selectedDeliveryOption = deliveryOptions.find(
    (d) => d.id === selectedDelivery
  );
  const shipping = selectedDeliveryOption?.price || 15000;
  const discount = 100000;
  const vat = Math.round((subtotal + shipping - discount) * 0.11);
  const total = subtotal + shipping - discount + vat;

  const validateStep1 = (): boolean => {
    clearErrors();
    const newErrors: Record<string, string> = {};

    if (customerType === "new") {
      if (!customerData.name.trim()) newErrors.name = "Name is required";
      if (!customerData.email.trim()) newErrors.email = "Email is required";
      if (!customerData.phone.trim()) newErrors.phone = "Phone is required";
      if (!customerData.addressDetails.trim())
        newErrors.addressDetails = "Address details is required";
      if (!customerData.postalCode.trim())
        newErrors.postalCode = "Postal code is required";
    } else {
      if (!selectedAddress) newErrors.address = "Please select an address";
    }

    if (!selectedDelivery)
      newErrors.delivery = "Please select a delivery option";
    if (!selectedPayment) newErrors.payment = "Please select a payment method";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleContinueToPayment = async () => {
    if (!validateStep1()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStep(2);
      toast.success("Information saved successfully");
    } catch (error) {
      toast.error("Failed to save information");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayNow = async () => {
    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock payment success
      toast.success("Payment processed successfully!");
      setCurrentStep(3);

      // Navigate to success page after delay
      setTimeout(() => {
        navigate("/order-success", {
          state: {
            orderId: "ORD-" + Date.now(),
            total,
            paymentMethod: paymentOptions.find((p) => p.id === selectedPayment)
              ?.name,
            deliveryMethod: deliveryOptions.find(
              (d) => d.id === selectedDelivery
            )?.name,
          },
        });
      }, 1500);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    toast.success("Address selected");
  };

  const handleAddressEdit = (address: Address) => {
    updateAddress(address.id, address);
    toast.success("Address updated successfully");
  };

  const handleAddressDelete = (addressId: string) => {
    if (addresses.length <= 1) {
      toast.error("You must have at least one address");
      return;
    }

    deleteAddress(addressId);

    // If deleted address was selected, select the first remaining address
    if (selectedAddress?.id === addressId) {
      const remainingAddresses = addresses.filter((a) => a.id !== addressId);
      if (remainingAddresses.length > 0) {
        setSelectedAddress(remainingAddresses[0]);
      }
    }

    toast.success("Address deleted successfully");
  };

  const handleAddNewAddress = (newAddress: Omit<Address, "id">) => {
    const address: Address = {
      ...newAddress,
      id: Date.now().toString(),
    };
    addAddress(address);
    setSelectedAddress(address);
    toast.success("New address added successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <CheckoutSteps steps={steps} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Customer Type Toggle */}
                <div className="mb-6">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setCustomerType("existing")}
                      className={`px-4 py-2 rounded-md border ${
                        customerType === "existing"
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      Existing Customer
                    </button>
                    <button
                      onClick={() => setCustomerType("new")}
                      className={`px-4 py-2 rounded-md border ${
                        customerType === "new"
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      New Customer
                    </button>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="mb-6">
                  <div className="flex space-x-4 mb-6">
                    <button
                      onClick={() => setDeliveryMethod("delivery")}
                      className={`flex items-center px-4 py-2 rounded-md border ${
                        deliveryMethod === "delivery"
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                          : "border-gray-300"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                      Delivery
                    </button>
                    <button
                      onClick={() => setDeliveryMethod("pickup")}
                      className={`flex items-center px-4 py-2 rounded-md border ${
                        deliveryMethod === "pickup"
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                          : "border-gray-300"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Pick Up
                    </button>
                  </div>
                </div>

                {customerType === "existing" ? (
                  <AddressManager
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    onAddressSelect={handleAddressSelect}
                    onAddressEdit={handleAddressEdit}
                    onAddressDelete={handleAddressDelete}
                    onAddNewAddress={handleAddNewAddress}
                    error={errors.address}
                  />
                ) : (
                  <CheckoutForm
                    customerData={customerData}
                    onCustomerDataChange={setCustomerData}
                    errors={errors}
                  />
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
                <h3 className="text-lg font-semibold mb-4">
                  Payment Confirmation
                </h3>
                <p className="text-gray-600 mb-6">
                  Please review your order details before completing the
                  payment.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Selected Payment Method:</span>
                    <span className="font-medium">
                      {
                        paymentOptions.find((p) => p.id === selectedPayment)
                          ?.name
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Selected Delivery:</span>
                    <span className="font-medium">
                      {
                        deliveryOptions.find((d) => d.id === selectedDelivery)
                          ?.name
                      }
                    </span>
                  </div>
                  {customerType === "existing" && selectedAddress && (
                    <div className="flex justify-between">
                      <span>Delivery Address:</span>
                      <span className="font-medium text-right max-w-xs">
                        {selectedAddress.address}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handlePayNow}
                  disabled={isLoading}
                  className="w-full bg-yellow-500 text-white py-3 rounded-md font-medium hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing Payment...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </button>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { formatRupiah } from "@/helper/formatRupiah";
import { MapPin, Clock, CreditCard, Truck } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    orderId,
    total,
    paymentMethod,
    deliveryMethod,
    deliveryOption,
    pickupTime,
    pickupLocation,
    deliveryAddress,
  } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex items-center justify-center py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
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

          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Order Successful!
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Thank you for your purchase. Your order has been confirmed and is
            being processed.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4 text-lg">Order Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-medium">{orderId}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium">{paymentMethod}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-medium text-lg">{formatRupiah(total)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {deliveryMethod === "delivery" ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Truck className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Delivery Method</p>
                        <p className="font-medium">{deliveryOption}</p>
                      </div>
                    </div>

                    {deliveryAddress && (
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mt-1">
                          <MapPin className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Delivery Address
                          </p>
                          <p className="font-medium text-sm leading-relaxed">
                            {deliveryAddress}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pickup Location</p>
                        <p className="font-medium">{pickupLocation}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pickup Time</p>
                        <p className="font-medium">{pickupTime}</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                      <div className="flex items-start space-x-2">
                        <svg
                          className="w-5 h-5 text-yellow-600 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-yellow-800">
                            Pickup Instructions
                          </p>
                          <p className="text-sm text-yellow-700 mt-1">
                            Please bring your order ID and a valid ID when
                            picking up your items. Our store is located at Jl.
                            Medan Merdeka Barat No.12, Jakarta Pusat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* <button
              onClick={() => navigate("/orders")}
              className="w-full bg-yellow-500 text-white py-3 rounded-md font-medium hover:bg-yellow-600 transition-colors"
            >
              {deliveryMethod === "delivery"
                ? "Track Your Order"
                : "View Order Details"}
            </button> */}
            <button
              onClick={() => navigate("/")}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              {deliveryMethod === "delivery"
                ? "You will receive an email confirmation and tracking information shortly."
                : "You will receive an email confirmation with pickup details shortly."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

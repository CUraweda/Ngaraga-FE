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

  // useEffect(() => {
  //   if (!orderId) {
  //     navigate("/");
  //   }
  // }, [orderId, navigate]);

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
         
          {/* Action Buttons */}
          <div className="space-y-3">

            <button
              onClick={() => {
                navigate("/profile");
                window.location.reload();
              }}
              className="w-full border cursor-pointer border-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              View Collection
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

"use client";

import { formatRupiah } from "@/helper/formatRupiah";

interface OrderSummaryProps {
  selectedItems: any[];
  subtotal: number;
  shipping: number;
  discount: number;
  vat: number;
  total: number;
  currentStep: number;
  onContinueToPayment: () => void;
  isLoading: boolean;
}

export const OrderSummary = ({
  selectedItems,
  subtotal,
  shipping,
  discount,
  vat,
  total,
  currentStep,
  onContinueToPayment,
  isLoading,
}: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Summary Order
      </h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {selectedItems.map((item: any, index: number) => (
          <div key={index} className="flex items-center space-x-3">
            <img
              src={`${import.meta.env.VITE_REACT_API_URL}/api/download?path=${
                item?.card?.image
              }`}
              alt={item?.card?.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item?.card?.name}</h4>
              <p className="text-xs text-gray-500 uppercase">
                {item?.card?.category?.name}
              </p>
              <p className="text-xs">Qty: {item?.quantity}</p>
            </div>
            <span className="font-medium text-sm">
              {formatRupiah(item?.card?.price)}
            </span>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">{formatRupiah(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-red-600">
            -{formatRupiah(discount)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">VAT 11%</span>
          <span className="font-medium">{formatRupiah(vat)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold border-t pt-3">
          <span>Total</span>
          <span>{formatRupiah(total)}</span>
        </div>
      </div>

      {currentStep === 1 && (
        <button
          onClick={onContinueToPayment}
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
              Saving...
            </>
          ) : (
            "Continue to Payment"
          )}
        </button>
      )}
    </div>
  );
};

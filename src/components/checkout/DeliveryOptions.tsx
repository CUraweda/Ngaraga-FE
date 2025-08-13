"use client";

import { formatRupiah } from "@/helper/formatRupiah";

interface DeliveryOption {
  id: string;
  name: string;
  time: string;
  price: number;
  logo: string;
}

interface DeliveryOptionsProps {
  options: DeliveryOption[];
  selectedDelivery: string;
  onDeliverySelect: (deliveryId: string) => void;
  error?: string;
}

export const DeliveryOptions = ({
  options,
  selectedDelivery,
  onDeliverySelect,
  error,
}: DeliveryOptionsProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Delivery Options</h3>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
              selectedDelivery === option.id
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="delivery"
              value={option.id}
              checked={selectedDelivery === option.id}
              onChange={(e) => onDeliverySelect(e.target.value)}
              className="sr-only"
            />
            <img
              src={option.logo || "/placeholder.svg"}
              alt={option.name}
              className="w-12 h-8 object-contain mr-4"
            />
            <div className="flex-1">
              <div className="font-medium">{option.name}</div>
              <div className="text-sm text-gray-500">
                Estimated Delivery: {option.time}
              </div>
            </div>
            <div className="font-semibold">{formatRupiah(option.price)}</div>
            {selectedDelivery === option.id && (
              <div className="ml-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

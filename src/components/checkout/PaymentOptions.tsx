"use client";

interface PaymentOption {
  id: string;
  name: string;
  logo: string;
}

interface PaymentOptionsProps {
  options: PaymentOption[];
  selectedPayment: string;
  onPaymentSelect: (paymentId: string) => void;
  error?: string;
}

export const PaymentOptions = ({
  options,
  selectedPayment,
  onPaymentSelect,
  error,
}: PaymentOptionsProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
              selectedPayment === option.id
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={option.id}
              checked={selectedPayment === option.id}
              onChange={(e) => onPaymentSelect(e.target.value)}
              className="sr-only"
            />
            <img
              src={option.logo || "/placeholder.svg"}
              alt={option.name}
              className="w-12 h-8 object-contain mr-3"
            />
            <span className="font-medium">{option.name}</span>
            {selectedPayment === option.id && (
              <div className="ml-auto w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
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

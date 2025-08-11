import type { CheckoutStep } from "@/pages/user/Checkout";

interface CheckoutStepsProps {
  steps: CheckoutStep[];
}

export const CheckoutSteps = ({ steps }: CheckoutStepsProps) => {
  return (
    <div className="flex items-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              step.active
                ? "bg-yellow-500 text-white"
                : step.completed
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {step.completed ? (
              <svg
                className="w-5 h-5"
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
            ) : (
              step.number
            )}
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              step.active ? "text-yellow-600" : "text-gray-500"
            }`}
          >
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className="w-12 h-px bg-gray-300 mx-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};

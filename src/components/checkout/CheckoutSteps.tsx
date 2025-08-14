import type { CheckoutStep } from "@/pages/user/Checkout";

interface CheckoutStepsProps {
  steps: CheckoutStep[];
}

export const CheckoutSteps = ({ steps }: CheckoutStepsProps) => {
  const getCircleClass = (s: CheckoutStep) =>
    s.active
      ? "bg-yellow-500 text-white"
      : s.completed
      ? "bg-green-500 text-white"
      : "bg-gray-200 text-gray-600";

  const getTitleClass = (s: CheckoutStep) =>
    s.active ? "text-yellow-600" : "text-gray-500";

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar px-2">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div
              key={step.number}
              className="flex items-center flex-1 min-w-[70px]"
            >
              {/* Circle */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${getCircleClass(
                    step
                  )}`}
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
                  className={`mt-2 text-[11px] leading-tight text-center max-w-[80px] truncate ${getTitleClass(
                    step
                  )}`}
                  title={step.title}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`flex-1 h-[2px] mx-2 ${
                    step.completed ? "bg-green-400" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

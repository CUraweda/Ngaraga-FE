// components/StatusBadge.tsx
import { FaStore, FaBoxOpen, FaTruck, FaCheck } from "react-icons/fa";

interface StatusBadgeProps {
  status: "Payment" | "Packaging" | "Shipping" | "Delivered";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    Payment: {
      icon: <FaStore />,
      color: "text-red-500 border-red-500",
    },
    Packaging: {
      icon: <FaBoxOpen />,
      color: "text-yellow-500 border-yellow-500",
    },
    Shipping: {
      icon: <FaTruck />,
      color: "text-blue-500 border-blue-500",
    },
    Delivered: {
      icon: <FaCheck />,
      color: "text-green-500 border-green-500",
    },
  };

  const { icon, color } = config[status];

  return (
    <span
      className={`badge badge-outline flex items-center gap-2 px-3 py-2 ${color}`}
    >
      {icon}
      {status}
    </span>
  );
};

export default StatusBadge;

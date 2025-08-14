// components/StatusBadge.tsx
import { FaStore, FaBoxOpen, FaTruck, FaCheck } from "react-icons/fa";

interface StatusBadgeProps {
  status: "pending" | "sent" | "DELIVERED" | "PICKED-UP";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    pending: {
      icon: <FaStore />,
      color: "text-red-500 border-red-500",
    },
    sent: {
      icon: <FaBoxOpen />,
      color: "text-yellow-500 border-yellow-500",
    },
    DELIVERED: {
      icon: <FaTruck />,
      color: "text-blue-500 border-blue-500",
    },
    "PICKED-UP": {
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

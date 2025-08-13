import {
  FaMoneyBillWave,
  FaBoxOpen,
  FaTruck,
  FaCheck,
  FaPen,
  FaTrashAlt,
} from "react-icons/fa";
import { Package, Truck, PackageCheck } from "lucide-react";

type NodeKind = "icon" | "dot";
type Step = {
  at: string;
  title: string;
  desc?: string;
  kind: NodeKind;
  tone: "gold" | "gray";
  icon?: "package" | "truck" | "done";
};

const steps: Step[] = [
  {
    at: "10 Dec 2024 17:20",
    title: "Delivered",
    kind: "icon",
    tone: "gray",
    icon: "done",
  },
  {
    at: "10 Dec 2024 13:53",
    title: "The order is in transit for delivery.",
    kind: "dot",
    tone: "gray",
  },
  {
    at: "10 Dec 2024 06:24",
    title: "Pesanan diproses di lokasi transit JAKARTA.",
    kind: "dot",
    tone: "gray",
  },

  {
    at: "09 Dec 2024 20:51",
    title: "The order was dispatched from the sorting facility in JAKARTA.",
    kind: "icon",
    tone: "gold",
    icon: "truck",
  },
  {
    at: "09 Dec 2024 20:51",
    title: "The order was received by the JAKARTA agent for processing.",
    kind: "dot",
    tone: "gold",
  },

  {
    at: "12 Dec 2024 16:00",
    title: "Preparing to ship",
    kind: "icon",
    tone: "gold",
    icon: "package",
  },
  {
    at: "09 Dec 2024 13:07",
    title: "Courier assigned to pick up the order.",
    kind: "dot",
    tone: "gold",
  },

  {
    at: "09 Dec 2024 12:54",
    title: "Order placed",
    kind: "icon",
    tone: "gold",
    icon: "package",
  },
];

const color = {
  gold: {
    bg: "bg-[#F0B429]",
    ring: "ring-[#F0B429]",
    text: "text-[#826A00]", // tone gelap sedikit
  },
  gray: {
    bg: "bg-[#BDBDBD]",
    ring: "ring-[#BDBDBD]",
    text: "text-[#6B7280]",
  },
};

const Icon = ({ name }: { name: NonNullable<Step["icon"]> }) => {
  if (name === "truck") return <Truck className="h-4 w-4" />;
  if (name === "done") return <PackageCheck className="h-4 w-4" />;
  return <Package className="h-4 w-4" />;
};

const DetailOrder = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Detail Orders</h1>

      <div className="card shadow-md p-5 border border-gray-300 mt-6">
        <h2 className="card-title">Order Stages</h2>
        <ul className="steps mt-4">
          <li className="step step-primary">
            <button className="btn btn-sm btn-outline btn-active gap-2">
              <FaMoneyBillWave /> Payment
            </button>
          </li>
          <li className="step step-primary">
            <button className="btn btn-sm btn-outline gap-2">
              <FaBoxOpen /> Packaging
            </button>
          </li>
          <li className="step">
            <button className="btn btn-sm btn-outline gap-2">
              <FaTruck /> Shipping
            </button>
          </li>
          <li className="step">
            <button className="btn btn-sm btn-outline gap-2">
              <FaCheck /> Delivered
            </button>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Left Card - Summary Order */}
        <div className="card bg-base-100 shadow-md border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title">Summary Order</h2>
            <p>
              Order ID <span className="font-bold">ORD123456789</span>
            </p>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="card card-side bg-base-100 shadow-sm border border-gray-200 rounded-xl p-3"
              >
                {/* Gambar Produk */}
                <figure className="w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1679768431550-334c06c14a2f"
                    alt="Dancing Robot"
                    className="w-full h-full object-cover"
                  />
                </figure>

                {/* Info Produk */}
                <div className="card-body p-3 flex flex-col justify-between">
                  <div>
                    <h2 className="card-title text-sm">Dancing Robot 0512</h2>
                    <p className="text-xs text-gray-500">Orbitian</p>
                    <p className="font-bold text-sm">Rp 200.000</p>
                  </div>
                  <p className="text-xs">Qty: 1</p>
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-center justify-between p-2">
                  <button className="btn btn-ghost btn-xs">
                    <FaPen className="text-gray-500" />
                  </button>
                  <button className="btn btn-ghost btn-xs">
                    <FaTrashAlt className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="divider my-4"></div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp 500.000</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rp 15.000</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-red-500">- Rp 100.000</span>
            </div>
            <div className="flex justify-between">
              <span>VAT 11%</span>
              <span>Rp 45.650</span>
            </div>
          </div>
          <div className="divider my-2"></div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rp 460.650</span>
          </div>
        </div>

        {/* Right Card - Order Info */}
        <div className="card bg-base-100 shadow-md border border-gray-200 rounded-xl p-5 space-y-6">
          {/* Payment */}
          <div>
            <h3 className="font-semibold mb-2">Payment</h3>
            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0a/BCA_logo.svg"
                alt="BCA"
                className="w-16"
              />
              <span>Bank BCA</span>
            </div>
          </div>

          {/* Shipment */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Shipment</h3>
              <button className="btn btn-ghost btn-xs">
                <FaPen className="text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Anter_Aja_logo.png"
                alt="Anter Aja"
                className="w-16"
              />
              <div>
                <p>Anter Aja</p>
                <p className="text-xs text-gray-500">
                  Estimated Delivery: 3–4 Days
                </p>
              </div>
            </div>

            <p className="mt-2 text-sm">
              Receipt: <span className="font-mono">BDG1234567890JKT</span>
            </p>
          </div>

          {/* Shipping Info */}
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <button className="btn btn-ghost btn-xs">
                <FaPen className="text-gray-500" />
              </button>
            </div>
            <p className="font-bold">Animakid</p>
            <p className="text-sm text-gray-500">animakid@gmail.com</p>
            <p className="text-sm text-gray-500">+62 854 5565 6745</p>
            <p className="text-sm">
              Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota
              Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
            </p>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-semibold mb-1">Notes</h3>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Order Tracking */}
          <div>
            <h3 className="font-semibold mb-3">Order Tracking</h3>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mt-4">
              {steps.map((s, i) => {
                const tone = color[s.tone];
                return (
                  <li key={i}>
                    {/* Left column: date time */}
                    <div className="timeline-start md:text-end">
                      <time className="font-medium text-[15px] leading-5">
                        {s.at}
                      </time>
                    </div>

                    {/* Middle: custom node (icon or dot) */}
                    <div className="timeline-middle relative">
                      {s.kind === "icon" ? (
                        <div
                          className={`grid h-8 w-8 place-items-center rounded-full ${tone.bg} text-white ring-2 ${tone.ring}`}
                        >
                          <Icon name={s.icon!} />
                        </div>
                      ) : (
                        <span
                          className={`block h-2 w-2 rounded-full ${tone.bg} ring-2 ${tone.ring}`}
                        />
                      )}
                    </div>

                    {/* Right column: text */}
                    <div className="timeline-end">
                      <p className="font-semibold leading-snug">{s.title}</p>
                      {s.desc && (
                        <p className="text-sm text-gray-500">{s.desc}</p>
                      )}
                    </div>

                    {/* Connector line (tipis & abu-abu) */}
                    <hr className="bg-[#D1D5DB]" />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;

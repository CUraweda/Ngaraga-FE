import {
  FaMoneyBillWave,
  FaBoxOpen,
  FaTruck,
  FaCheck,
} from "react-icons/fa";
import orderStore from "@/store/order.store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { formatRupiah } from "@/helper/formatRupiah";


const DetailOrder = () => {
  const { id } = useParams();
  const { getDetailOrder, detailOrder } = orderStore();

  const fetchDetailOrder = async () => {
    await getDetailOrder(id);
  };

  useEffect(() => {
    fetchDetailOrder();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Detail Orders</h1>

      <div className="card shadow-md p-5 border border-gray-300 mt-6">
        <h2 className="card-title">Order Stages</h2>
        <ul className="steps mt-4">
          <li
            className={`step  ${
              detailOrder?.transactionStep == "PAYMENT" ? "step-primary" : ""
            }`}
          >
            <button className="btn btn-sm btn-outline btn-active gap-2">
              <FaMoneyBillWave /> Payment
            </button>
          </li>
          <li
            className={`step ${
              detailOrder?.transactionStep == "PACKAGING" ? "step-primary" : ""
            }`}
          >
            <button className="btn btn-sm btn-outline btn-active gap-2">
              <FaBoxOpen /> Packaging
            </button>
          </li>
          <li
            className={`step ${
              detailOrder?.transactionStep == "SHIPPING" ? "step-primary" : ""
            }`}
          >
            <button className="btn btn-sm btn-outline btn-active gap-2">
              <FaTruck /> Shipping
            </button>
          </li>
          <li
            className={`step ${
              detailOrder?.transactionStep == "DELIVERED" ? "step-primary" : ""
            }`}
          >
            <button className="btn btn-sm btn-outline btn-active gap-2">
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
              Order ID{" "}
              <span className="font-bold">{detailOrder?.transactionId}</span>
            </p>
          </div>

          <div className="space-y-3">
            {detailOrder?.items.map((items: any, index: number) => (
              <div
                key={index}
                className="card card-side bg-base-100 shadow-sm border border-gray-200 rounded-xl p-3"
              >
                {/* Gambar Produk */}
                <figure className="w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={
                      import.meta.env.VITE_REACT_API_URL +
                      "/" +
                      items?.card?.image
                    }
                    alt="Dancing Robot"
                    className="w-full h-full object-cover"
                  />
                </figure>

                {/* Info Produk */}
                <div className="card-body p-3 flex flex-col justify-between">
                  <div>
                    <h2 className="card-title text-sm">{items?.card?.name}</h2>
                    {/* <p className="text-xs text-gray-500">Orbitian</p> */}
                    <p className="font-bold text-sm">
                      {formatRupiah(items?.card?.price)}
                    </p>
                  </div>
                  <p className="text-xs">Qty: {items?.quantity}</p>
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-center justify-between p-2">
                  {/* <button className="btn btn-ghost btn-xs">
                    <FaPen className="text-gray-500" />
                  </button>
                  <button className="btn btn-ghost btn-xs">
                    <FaTrashAlt className="text-red-500" />
                  </button> */}
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="divider my-4"></div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatRupiah(detailOrder?.subTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatRupiah(detailOrder?.shippingCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-red-500">
                -{formatRupiah(detailOrder?.discount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TAX</span>
              <span>{formatRupiah(detailOrder?.tax)}</span>
            </div>
          </div>
          <div className="divider my-2"></div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatRupiah(detailOrder?.totalAmount)}</span>
          </div>
        </div>

        {/* Right Card - Order Info */}
        <div className="card bg-base-100 shadow-md border border-gray-200 rounded-xl p-5 space-y-6">
          {/* Payment */}
          <div>
            <h3 className="font-semibold mb-2">Payment</h3>
            <div className="flex items-center gap-3">
              {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0a/BCA_logo.svg"
                alt="BCA"
                className="w-16"
              /> */}
              <span>{detailOrder?.TransactionPayment[0]?.paymentType}</span>
            </div>
          </div>

          {/* Shipment */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Shipment</h3>
              {/* <button className="btn btn-ghost btn-xs">
                <FaPen className="text-gray-500" />
              </button> */}
            </div>

            <div className="flex items-center gap-3">
              {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Anter_Aja_logo.png"
                alt="Anter Aja"
                className="w-16"
              /> */}
              <div>
                <p>{detailOrder?.TransactionShipping[0]?.name}</p>
                <p className="text-xs text-gray-500">
                  {detailOrder?.TransactionShipping[0]?.estimatedDate}
                </p>
              </div>
            </div>

            <p className="mt-2 text-sm">
              Receipt:
              <span className="font-mono">
                {detailOrder?.TransactionShipping[0]?.resiNo ?? "-"}
              </span>
            </p>
          </div>

          {/* Shipping Info */}
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              {/* <button className="btn btn-ghost btn-xs">
                <FaPen className="text-gray-500" />
              </button> */}
            </div>
            <p className="font-bold">{detailOrder?.user?.name}</p>
            <p className="text-sm text-gray-500">{detailOrder?.user?.email}</p>
            <p className="text-sm text-gray-500">
              {detailOrder?.address?.phone}
            </p>
            <p className="text-sm">
              {[
                detailOrder?.address?.address,
                detailOrder?.address?.subdistrict,
                detailOrder?.address?.city,
                detailOrder?.address?.province,
                detailOrder?.address?.postalCode,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-semibold mb-1">Notes</h3>
            <p className="text-sm text-gray-500">
              {detailOrder?.address?.note}
            </p>
          </div>

          {/* Order Tracking */}
          {/* <div>
            <h3 className="font-semibold mb-3">Order Tracking</h3>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mt-4">
              {steps.map((s, i) => {
                const tone = color[s.tone];
                return (
                  <li key={i}> */}
          {/* Left column: date time */}
          {/* <div className="timeline-start md:text-end">
                      <time className="font-medium text-[15px] leading-5">
                        {s.at}
                      </time>
                    </div> */}

          {/* Middle: custom node (icon or dot) */}
          {/* <div className="timeline-middle relative">
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
                    </div> */}

          {/* Right column: text */}
          {/* <div className="timeline-end">
                      <p className="font-semibold leading-snug">{s.title}</p>
                      {s.desc && (
                        <p className="text-sm text-gray-500">{s.desc}</p>
                      )}
                    </div> */}

          {/* Connector line (tipis & abu-abu) */}
          {/* <hr className="bg-[#D1D5DB]" />
                  </li>
                );
              })}
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;

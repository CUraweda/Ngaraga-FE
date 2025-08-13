import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  FaMoneyBillWave,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaPrint,
  FaTrash,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/StatusBadge";
import { AiOutlinePrinter } from "react-icons/ai";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { CiTrash } from "react-icons/ci";
import Pagination from "@/components/ui/Pagination";
import { useNavigate } from "react-router-dom";
import orderStore from "@/store/order.store";

const Order = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const { getOrder, orders } = orderStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    const payload = `limit=${itemsPerPage}&page=${currentPage}`;
    await getOrder(payload);
  };

  useEffect(() => {
    fetchOrder();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (orders) {
      setTotalPages(orders.total_pages);
    }
  }, [orders, itemsPerPage]);

  const cards = [
    {
      label: "Payment",
      value: 20,
      icon: <FaMoneyBillWave className="text-red-500" size={20} />,
      borderColor: "border-red-300",
      bgColor: "bg-red-50",
      textColor: "text-red-500",
    },
    {
      label: "Packaging",
      value: 8,
      icon: <FaBoxOpen className="text-yellow-500" size={20} />,
      borderColor: "border-yellow-300",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-500",
    },
    {
      label: "Shipping",
      value: 3,
      icon: <FaTruck className="text-blue-500" size={20} />,
      borderColor: "border-blue-300",
      bgColor: "bg-blue-50",
      textColor: "text-blue-500",
    },
    {
      label: "Delivered",
      value: 100,
      icon: <FaCheckCircle className="text-green-500" size={20} />,
      borderColor: "border-green-300",
      bgColor: "bg-green-50",
      textColor: "text-green-500",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Order List</h1>
      {/* card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Revenue Today", value: "Rp 2.000.000" },
          { label: "Orders Today", value: "18" },
          { label: "Total Revenue", value: "Rp 5.000.000" },
          { label: "Total Orders", value: "131" },
        ].map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <h2 className="text-3xl font-bold text-center">{item.value}</h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* subcard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {cards.map((item, idx) => (
          <div
            key={idx}
            className={`card border ${item.borderColor} ${item.bgColor} rounded-xl shadow-sm flex flex-row items-center justify-between px-4 py-3`}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className={`text-sm font-medium ${item.textColor}`}>
                {item.label}
              </span>
            </div>
            <span className={`text-lg font-bold ${item.textColor}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
      {/* filter */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-3">
          {/* Tombol Print Receipt */}
          <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none">
            <FaPrint className="text-white" />
            Print Receipt
          </button>

          {/* Tombol Delete */}
          <button className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            <FaTrash />
            Delete
          </button>
        </div>

        <div>
          <div className="flex items-center gap-2 ml-auto">
            <input type="text" className="input " placeholder="Search" />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal w-[180px]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? format(fromDate, "dd MMM yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <span>-</span>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal w-[180px]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, "dd MMM yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="card bg-base-100 shadow-md rounded-lg overflow-x-auto">
          <div className="card-body p-0">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Date</th>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Shipping</th>
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders?.items?.map((item: any, index: number) => (
                  <tr key={index}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div>{item.createdAt.split("T")[0]}</div>
                    </td>
                    <td>{item.transactionId}</td>
                    <td>{"Nama"}</td>
                    <td>
                      {item.totalAmount.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      })}
                    </td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.transactionStep}</td>
                    <td>
                      {/* <StatusBadge status={item.shippingStatus} /> */}
                    </td>
                    <th className="space-x-2">
                      {/* Detail */}
                      <div className="tooltip" data-tip="Detail">
                        <button className="btn btn-ghost btn-xs text-gray-600 hover:bg-gray-100">
                          <HiMagnifyingGlassPlus
                            size={"1.2rem"}
                            onClick={() =>
                              navigate(`/admin/collections/order/1`)
                            }
                          />
                        </button>
                      </div>

                      {/* Print */}
                      <div className="tooltip" data-tip="Print">
                        <button className="btn btn-ghost btn-xs text-gray-600 hover:bg-gray-100">
                          <AiOutlinePrinter size={"1.2rem"} />
                        </button>
                      </div>

                      {/* Delete */}
                      <div className="tooltip" data-tip="Delete">
                        <button className="btn btn-ghost btn-xs text-red-500 hover:bg-red-100">
                          <CiTrash size={"1.2rem"} />
                        </button>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          <div className="flex w-full justify-end mt-4">
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => setCurrentPage(newPage)}
              onTotalPageItem={(total) => setItemsPerPage(total)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

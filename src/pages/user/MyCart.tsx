"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import CartItemStore from "@/store/cartItem.store";
import userStore from "@/store/user.store";
import { useEffect } from "react";
import { formatRupiah } from "@/helper/formatRupiah";

const MyCart = () => {
  const navigate = useNavigate();
  const { carts, getCart, updateCart, deleteCart } = CartItemStore();
  const { user } = userStore();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const fetchData = async () => {
    const payload = `limit=100&page=1&?where=userId:${user?.id}`;
    await getCart(payload);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if (carts?.items) {
      const allItemIds = carts.items.map((item: any) => item.id);
      if (selectAll) {
        setSelectedItems(allItemIds);
      } else {
        setSelectedItems([]);
      }
    }
  }, [selectAll, carts?.items]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleQuantity = (id: string, quantity: number, type: string) => {
    const payload = {
      quantity: type === "add" ? quantity + 1 : quantity - 1,
    };
    if (payload.quantity <= 0) {
      deleteCart(id).then(() => {
        fetchData();
      });
      return;
    }
    updateCart(id, payload).then(() => {
      fetchData();
    });
  };

  const handleDelete = (id: string) => {
    deleteCart(id).then(() => {
      fetchData();
    });
  };

  const handleCheckout = () => {
    const selectedCartItems = carts?.items?.filter((item: any) =>
      selectedItems.includes(item.id)
    );

    if (selectedCartItems?.length > 0) {
      // Navigate to checkout with selected items
      navigate("/checkout", {
        state: {
          selectedItems: selectedCartItems,
          totalAmount: calculateSelectedTotal(),
        },
      });
    }
  };

  const calculateSelectedTotal = () => {
    if (!carts?.items) return 0;
    return carts.items
      .filter((item: any) => selectedItems.includes(item.id))
      .reduce(
        (total: number, item: any) => total + item.card.price * item.quantity,
        0
      );
  };

  const selectedCount = selectedItems.length;
  const selectedTotal = calculateSelectedTotal();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Cart</h1>
          <p className="text-gray-600">
            Review your selected items, adjust quantities, and proceed to
            checkout seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Select All Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Select All
                  </span>
                </label>
                <button className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600">
                  Delete
                </button>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {carts?.items?.map((item: any, index: number) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 mt-1"
                      />
                      <img
                        src={`${
                          import.meta.env.VITE_REACT_API_URL
                        }/api/download?path=${item?.card?.image}`}
                        alt={item?.card?.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item?.card?.name}
                        </h3>
                        <p className="text-sm text-gray-500 uppercase">
                          {item?.card?.category?.name}
                        </p>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                          {formatRupiah(item?.card?.price)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleDelete(item?.id)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              handleQuantity(item?.id, item?.quantity, "minus")
                            }
                            className="p-2 hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-sm font-medium">
                            {item?.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantity(item?.id, item?.quantity, "add")
                            }
                            className="p-2 hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Order */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Summary Order
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatRupiah(selectedTotal)}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200">
                    Apply
                  </button>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={selectedCount === 0}
                className="w-full bg-yellow-500 text-white py-3 rounded-md font-medium hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Checkout Now ({selectedCount} items)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import CartItemStore from "@/store/cartItem.store";
import userStore from "@/store/user.store";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    if (carts?.items) {
      const allItemIds = carts.items.map((item: any) => item.id);
      setSelectedItems(selectAll ? allItemIds : []);
    }
  }, [selectAll, carts?.items]);

  const handleSelectAll = () => setSelectAll((v) => !v);

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleQuantity = (
    id: string,
    quantity: number,
    type: "add" | "minus"
  ) => {
    const nextQty = type === "add" ? quantity + 1 : quantity - 1;
    if (nextQty <= 0) {
      deleteCart(id).then(fetchData);
      return;
    }
    updateCart(id, { quantity: nextQty }).then(fetchData);
  };

  const handleDelete = (id: string) => deleteCart(id).then(fetchData);

  const handleBulkDelete = () => {
    if (!selectedItems.length) return;
    Promise.all(selectedItems.map((id) => deleteCart(id))).then(() => {
      setSelectedItems([]);
      setSelectAll(false);
      fetchData();
    });
  };

  const handleCheckout = () => {
    const selectedCartItems = carts?.items?.filter((item: any) =>
      selectedItems.includes(item.id)
    );
    if (selectedCartItems?.length > 0) {
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
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-3">
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

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBulkDelete}
                    disabled={!selectedCount}
                    className="px-4 py-2 bg-red-50 text-red-600 text-sm rounded-md hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Delete Selected
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-200">
                {!carts?.items?.length && (
                  <div className="p-6 text-center text-gray-500">
                    Your cart is empty.
                  </div>
                )}

                {carts?.items?.map((item: any) => (
                  <div key={item.id} className="p-4">
                    {/* Satu layout konsisten (mobile/tab/desktop) */}
                    {/* Grid 2 kolom di mobile, 3 kolom di ≥sm:
                        - Kolom 1: Gambar (atas), Qty (bawah)
                        - Kolom 2-3: Detail teks kanan (atas), Remove kanan (bawah)
                    */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                      {/* Gambar (kolom kiri) */}
                      <div className="relative col-span-1">
                        {/* Checkbox absolut agar tidak menggeser layout & tidak mempengaruhi alignment detail */}
                        <label className="absolute -top-1 -left-1 z-10 bg-white/90 rounded-md p-1 shadow-sm">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 align-middle"
                            aria-label={`Select ${item?.card?.name}`}
                          />
                        </label>

                        <img
                          src={`${
                            import.meta.env.VITE_REACT_API_URL
                          }/api/download?path=${item?.card?.image}`}
                          alt={item?.card?.name}
                          className="w-full h-24 sm:h-28 object-cover rounded-lg"
                        />
                      </div>

                      {/* Detail teks kanan atas (selalu text-right & sejajar atas dengan gambar) */}
                      <div className="col-span-1 sm:col-span-2 self-start text-right">
                        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-2">
                          {item?.card?.name}
                        </h3>
                        <p className="text-[11px] sm:text-sm text-gray-500 uppercase">
                          {item?.card?.category?.name}
                        </p>
                        <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
                          {formatRupiah(item?.card?.price)}
                        </p>
                      </div>

                      {/* Qty kiri bawah (tepat di bawah gambar) */}
                      <div className="col-span-1 self-end">
                        <div className="inline-flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              handleQuantity(item?.id, item?.quantity, "minus")
                            }
                            className="p-2 hover:bg-gray-50 active:scale-[0.98]"
                            aria-label="Decrease quantity"
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
                            className="p-2 hover:bg-gray-50 active:scale-[0.98]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remove kanan bawah (align kanan) */}
                      <div className="col-span-1 sm:col-span-2 sm:col-start-3 self-end">
                        <div className="w-full flex justify-end">
                          <button
                            onClick={() => handleDelete(item?.id)}
                            className="px-3 py-2 text-sm text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                            aria-label="Remove item"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-4">
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
                <div className="flex gap-2">
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

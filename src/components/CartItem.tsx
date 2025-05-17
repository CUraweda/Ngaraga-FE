import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import CartItemStore from "@/store/cartItem.store";
import userStore from "@/store/user.store";
import { useEffect } from "react";
import { formatRupiah } from "@/helper/formatRupiah";

const CartItem = () => {
  const { carts, getCart, updateCart, deleteCart } = CartItemStore();
  const { user } = userStore();

  const fetchData = async () => {
    const payload = `limit=100&page=1&?where=userId:${user?.id}`;
    await getCart(payload);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

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

  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md max-h-[500px] overflow-y-auto">
        {carts?.items?.map((cart: any, index: number) => (
          <li className="list-row flex w-full flex-col " key={index}>
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  className="w-10"
                  src={`${
                    import.meta.env.VITE_REACT_API_URL
                  }/api/download?path=${cart?.card?.image}`}
                />
                <div className="flex flex-col">
                  <div>{cart?.card?.name}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {cart?.card?.category?.name}
                  </div>
                  <span className="text-xs font-semibold opacity-60">
                    <p> {formatRupiah(cart?.card?.price)}</p>
                  </span>
                </div>
              </div>
              <button className="btn btn-square btn-ghost" onClick={() => handleDelete(cart?.id)}>
                <Trash2 />
              </button>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <fieldset className="fieldset ">
                  <div className="join">
                    <button
                      className="btn join-item btn-xs"
                      onClick={() =>
                        handleQuantity(cart?.id, cart?.quantity, "minus")
                      }
                    >
                      <MinusIcon />
                    </button>
                    <input
                      type="number"
                      value={cart?.quantity}
                      className="input join-item input-xs w-12"
                      placeholder="0"
                    />
                    <button
                      className="btn join-item btn-xs"
                      onClick={() =>
                        handleQuantity(cart?.id, cart?.quantity, "add")
                      }
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </fieldset>
              </div>
              <span className="text-xs font-semibold opacity-60">
                {formatRupiah(cart?.card?.price * cart?.quantity)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center mt-5 justify-between">
        <span className="text-lg font-semibold">{formatRupiah(carts?.grandTotal)}</span>
        <button className="btn btn-primary btn-sm">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

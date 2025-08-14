import { create } from "zustand";
import type { CustomerData, Address } from "@/pages/user/Checkout";
import { getDataCheckout } from "@/middleware/Checkout";
import apiClient from "@/middleware/Base";

// ====== Types untuk Cart (mengikuti API kamu) ======
export type CartItem = {
  id: string;
  userId: string;
  cardId: string;
  quantity: number;
  totalPrice: number; // dari API
  name: string; // dari card.name
  price?: number; // dari card.price (opsional, buat UI)
  image?: string; // card.image (opsional, buat UI)
};

export type ShippingOption = {
  id: string; // e.g. "JNT-EZ"
  shipping_name: string; // e.g. "JNT"
  service_name: string; // e.g. "EZ"
  weight: number; // kg
  is_cod: boolean;
  shipping_cost: number; // gross
  shipping_cashback: number;
  shipping_cost_net: number; // NET (dipakai sebagai price di UI & shippingCost transaksi)
  grandtotal: number;
  service_fee: number;
  net_income: number;
  etd: string;
};

interface CheckoutState {
  // Step management
  currentStep: number;
  setCurrentStep: (step: number) => void;

  // Customer type
  customerType: "existing" | "new";
  setCustomerType: (type: "existing" | "new") => void;

  // Delivery method
  deliveryMethod: "delivery" | "pickup";
  setDeliveryMethod: (method: "delivery" | "pickup") => void;

  // Selected options
  selectedDelivery: string;
  setSelectedDelivery: (delivery: string) => void;
  selectedPayment: "bca" | "bni" | "bri" | "qris" | string;
  setSelectedPayment: (
    payment: "bca" | "bni" | "bri" | "qris" | string
  ) => void;

  // Pickup time
  selectedPickupTime: string;
  setSelectedPickupTime: (time: string) => void;

  // Address management
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address | null) => void;
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Address) => void;
  deleteAddress: (id: string) => void;

  // Customer data
  customerData: CustomerData;
  setCustomerData: (data: CustomerData) => void;

  // Generic loading & errors
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;

  // Checkout detail
  getCheckout: (id: any) => Promise<void>;
  checkouts: any | null;

  // Cart
  cartItems: CartItem[];
  cartGrandTotal: number; // ⬅️ dari API (data.data.grandTotal)
  cartLoading: boolean;
  cartError: string | null;
  fetchCartItems: (userId: string) => Promise<void>;
  clearCart: () => void;
  setCartItems: (items: CartItem[]) => void;
  // Helpers
  cartTotalQty: () => number;

  // Shipping (ongkir)
  shippingOptions: ShippingOption[];
  shippingLoading: boolean;
  shippingError: string | null;
  setShippingOptions: (opts: ShippingOption[]) => void;
  calculatePostage: (receiverDestinationId?: string) => Promise<void>;
  calculatePostageForSelectedAddress: () => Promise<void>;

  // Transaction
  createTransaction: (params: {
    userId: string;
    subTotal?: number;
    discount?: number;
    tax?: number;
  }) => Promise<any>;

  // Reset
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  // Initial state
  currentStep: 1,
  customerType: "existing",
  deliveryMethod: "delivery",
  selectedDelivery: "",
  selectedPayment: "bca",
  selectedPickupTime: "08:00",
  selectedAddress: null,
  addresses: [],
  customerData: {
    name: "",
    email: "",
    phone: "",
    country: "Indonesia",
    state: "",
    city: "",
    subdistrict: "",
    postalCode: "",
    addressDetails: "",
    notes: "",
  },
  isLoading: false,
  errors: {},
  checkouts: null,

  // Cart
  cartItems: [],
  cartGrandTotal: 0,
  cartLoading: false,
  cartError: null,

  // Shipping
  shippingOptions: [],
  shippingLoading: false,
  shippingError: null,

  // Actions umum
  setCurrentStep: (step) => set({ currentStep: step }),
  setCustomerType: (type) => set({ customerType: type }),
  setDeliveryMethod: (method) => set({ deliveryMethod: method }),
  setSelectedDelivery: (delivery) => set({ selectedDelivery: delivery }),
  setSelectedPayment: (payment) => set({ selectedPayment: payment }),
  setSelectedPickupTime: (time) => set({ selectedPickupTime: time }),
  setSelectedAddress: (address) => set({ selectedAddress: address }),

  getCheckout: async (id: any) => {
    const { data } = await getDataCheckout(id);
    set({ checkouts: data });
  },

  addAddress: (address) =>
    set((state) => ({ addresses: [...state.addresses, address] })),

  updateAddress: (id, updatedAddress) =>
    set((state) => ({
      addresses: state.addresses.map((addr) =>
        addr.id === id ? updatedAddress : addr
      ),
      selectedAddress:
        state.selectedAddress?.id === id
          ? updatedAddress
          : state.selectedAddress,
    })),

  deleteAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((addr) => addr.id !== id),
      selectedAddress:
        state.selectedAddress?.id === id ? null : state.selectedAddress,
    })),

  setCustomerData: (data) => set({ customerData: data }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setErrors: (errors) => set({ errors }),
  clearErrors: () => set({ errors: {} }),

  // ====== Cart API ======
  fetchCartItems: async (userId: string) => {
    const encoded = encodeURIComponent(`userId:${userId}`);
    set({ cartLoading: true, cartError: null });
    try {
      const { data } = await apiClient.get(
        `/api/v1/cart-item/show-all?where=${encoded}&limit=10000`
      );

      const rawItems = data?.data?.items ?? data?.items ?? data?.rows ?? [];

      const items: CartItem[] = Array.isArray(rawItems)
        ? rawItems.map((x: any) => ({
            id: String(x.id),
            userId: String(x.userId ?? userId),
            cardId: String(x.cardId ?? x.card?.id ?? ""),
            quantity: Number(x.quantity ?? 0),
            totalPrice: Number(x.totalPrice ?? 0),
            name: String(x.card?.name ?? x.name ?? ""),
            price: x.card?.price != null ? Number(x.card.price) : undefined,
            image: x.card?.image,
          }))
        : [];

      const grand: number = Number(
        data?.data?.grandTotal ?? data?.grandTotal ?? 0
      );

      set({
        cartItems: items,
        cartGrandTotal: grand,
        cartLoading: false,
      });
    } catch (e: any) {
      console.error("fetchCartItems failed:", e);
      set({
        cartLoading: false,
        cartError:
          e?.response?.data?.message || e?.message || "Gagal memuat keranjang.",
      });
    }
  },

  clearCart: () => set({ cartItems: [], cartGrandTotal: 0 }),
  setCartItems: (items) => set({ cartItems: items }),

  cartTotalQty: () => {
    const items = get().cartItems;
    return items.reduce((acc, it) => acc + Number(it.quantity ?? 0), 0);
  },

  // ====== Shipping (ongkir) ======
  setShippingOptions: (opts) => set({ shippingOptions: opts }),

  // Pakai addressId (yang kamu kirim dari Checkout) sebagai receiver_destination_id
  calculatePostage: async (receiverDestinationId?: string) => {
    const state = get();

    const receiver_destination_id = receiverDestinationId;
    if (!receiver_destination_id) {
      set({
        shippingOptions: [],
        shippingError:
          "ID alamat tujuan (receiver_destination_id) tidak ditemukan.",
      });
      return;
    }

    // 1) HARDCODE origin id
    const shipper_destination_id = "10110";

    // 2) item_value dari API cartItem grandTotal
    const item_value = Number(state.cartGrandTotal || 0);

    // 3) weight = total quantity * 0.002 (kg)
    const totalQty = state.cartTotalQty();
    const weight = Number((totalQty * 0.002).toFixed(3));

    set({ shippingLoading: true, shippingError: null });
    try {
      const { data } = await apiClient.get(`/api/v1/postage/calculate`, {
        params: {
          shipper_destination_id,
          receiver_destination_id,
          item_value,
          weight,
        },
      });

      const list =
        data?.data?.data?.calculate_reguler ??
        data?.data?.calculate_reguler ??
        [];

      const opts: ShippingOption[] = Array.isArray(list)
        ? list.map((x: any) => ({
            id: `${x.shipping_name}-${x.service_name}`,
            shipping_name: x.shipping_name,
            service_name: x.service_name,
            weight: Number(x.weight ?? weight),
            is_cod: !!x.is_cod,
            shipping_cost: Number(x.shipping_cost ?? 0),
            shipping_cashback: Number(x.shipping_cashback ?? 0),
            shipping_cost_net: Number(x.shipping_cost_net ?? 0),
            grandtotal: Number(x.grandtotal ?? 0),
            service_fee: Number(x.service_fee ?? 0),
            net_income: Number(x.net_income ?? 0),
            etd: String(x.etd ?? "-"),
          }))
        : [];

      set({
        shippingOptions: opts,
        shippingLoading: false,
        shippingError: null,
      });

      // auto pilih opsi pertama kalau belum ada pilihan
      if (!get().selectedDelivery && opts.length > 0) {
        set({ selectedDelivery: opts[0].id });
      }
    } catch (e: any) {
      console.error("calculatePostage failed:", e);
      set({
        shippingOptions: [],
        shippingLoading: false,
        shippingError:
          e?.response?.data?.message ||
          e?.message ||
          "Gagal menghitung ongkir.",
      });
    }
  },

  calculatePostageForSelectedAddress: async () => {
    // Kompatibilitas jika masih mengandalkan selectedAddress.addressId
    const maybeAddrId: any = (get().selectedAddress as any)?.addressId;
    return get().calculatePostage(maybeAddrId);
  },

  // ====== Transaction (Create) ======
  createTransaction: async ({ userId, subTotal, discount, tax }) => {
    const {
      selectedAddress,
      selectedPayment,
      selectedDelivery,
      shippingOptions,
      cartItems,
      cartGrandTotal,
    } = get();

    if (!selectedAddress?.id) {
      throw new Error("Address belum dipilih.");
    }
    if (!userId) {
      throw new Error("User ID tidak ditemukan.");
    }

    // Ambil opsi shipping terpilih dari shippingOptions
    const pick = shippingOptions.find((o) => o.id === selectedDelivery);

    // Payment method mapping (UI -> API)
    const paymentMethodMap: Record<string, string> = {
      bca: "BCA",
      bni: "BNI",
      bri: "BRI",
      qris: "QRIS",
    };
    const paymentMethod =
      paymentMethodMap[selectedPayment] ||
      String(selectedPayment || "").toUpperCase();

    // Nilai default:
    const _subTotal = Number(subTotal ?? cartGrandTotal ?? 0);
    // Kirim NET sebagai biaya shipping transaksi
    const _shippingCost = pick ? Number(pick.shipping_cost_net ?? 0) : 0;
    const _discount = Number(discount ?? 0);
    const _tax = Number(tax ?? 0);

    // Cart ID list (array of cart item id)
    const cartId = cartItems.map((c) => c.id);

    // Shipping detail (gross & cashback & info)
    const shipping = pick
      ? {
          name: pick.shipping_name, // "JNT"
          serviceName: pick.service_name, // "EZ"
          shippingCost: Number(pick.shipping_cost), // gross
          cashback: Number(pick.shipping_cashback),
          additional: 0,
          codValue: 0,
          estimatedDate: String(pick.etd ?? "-"),
          description: "",
        }
      : {
          name: "",
          serviceName: "",
          shippingCost: 0,
          cashback: 0,
          additional: 0,
          codValue: 0,
          estimatedDate: "-",
          description: "",
        };

    const payload = {
      transaction: {
        addressId: selectedAddress.id, // UUID string
        userId,
        paymentMethod,
        subTotal: _subTotal,
        shippingCost: _shippingCost,
        discount: _discount,
        tax: _tax,
      },
      shipping,
      cartId, // ["uuid", ...]
    };

    const { data } = await apiClient.post(
      "/api/v1/transaction/create",
      payload
    );
    return data;
  },

  // Reset
  resetCheckout: () =>
    set({
      currentStep: 1,
      customerType: "existing",
      deliveryMethod: "delivery",
      selectedDelivery: "",
      selectedPayment: "bca",
      selectedPickupTime: "08:00",
      selectedAddress: null,
      customerData: {
        name: "",
        email: "",
        phone: "",
        country: "Indonesia",
        state: "",
        city: "",
        subdistrict: "",
        postalCode: "",
        addressDetails: "",
        notes: "",
      },
      isLoading: false,
      errors: {},
      cartItems: [],
      cartGrandTotal: 0,
      cartLoading: false,
      cartError: null,
      shippingOptions: [],
      shippingLoading: false,
      shippingError: null,
    }),
}));

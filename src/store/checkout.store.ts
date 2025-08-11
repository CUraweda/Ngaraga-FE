import { create } from "zustand";
import type { CustomerData, Address } from "@/pages/user/Checkout";

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
  selectedPayment: string;
  setSelectedPayment: (payment: string) => void;

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

  // Loading and error states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;

  // Reset function
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  // Initial state
  currentStep: 1,
  customerType: "existing",
  deliveryMethod: "delivery",
  selectedDelivery: "anteraja",
  selectedPayment: "bca",
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

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),
  setCustomerType: (type) => set({ customerType: type }),
  setDeliveryMethod: (method) => set({ deliveryMethod: method }),
  setSelectedDelivery: (delivery) => set({ selectedDelivery: delivery }),
  setSelectedPayment: (payment) => set({ selectedPayment: payment }),
  setSelectedAddress: (address) => set({ selectedAddress: address }),

  addAddress: (address) =>
    set((state) => ({
      addresses: [...state.addresses, address],
    })),

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

  resetCheckout: () =>
    set({
      currentStep: 1,
      customerType: "existing",
      deliveryMethod: "delivery",
      selectedDelivery: "anteraja",
      selectedPayment: "bca",
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
    }),
}));

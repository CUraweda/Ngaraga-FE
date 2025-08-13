"use client";

import { useState } from "react";
import type { Address } from "@/pages/user/Checkout";
import { AddressModal } from "./AddressModal";

interface AddressManagerProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onAddressSelect: (address: Address) => void;
  onAddressEdit: (address: Address) => void;
  onAddressDelete: (addressId: string) => void;
  onAddNewAddress: (address: Omit<Address, "id">) => void;
  error?: string;
}

export const AddressManager = ({
  addresses,
  selectedAddress,
  onAddressSelect,
  onAddressEdit,
  onAddressDelete,
  onAddNewAddress,
  error,
}: AddressManagerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleModalSave = (addressData: Omit<Address, "id">) => {
    if (editingAddress) {
      onAddressEdit({ ...addressData, id: editingAddress.id });
    } else {
      onAddNewAddress(addressData);
    }
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (addressId: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      onAddressDelete(addressId);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="space-y-3 mb-4">
        {addresses.map((address) => (
          <label
            key={address.id}
            className={`block border rounded-lg p-4 cursor-pointer ${
              selectedAddress?.id === address.id
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="address"
              checked={selectedAddress?.id === address.id}
              onChange={() => onAddressSelect(address)}
              className="sr-only"
            />
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{address.name}</h4>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{address.phone}</p>
                <p className="text-sm text-gray-600 mt-1">{address.address}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditAddress(address);
                  }}
                  className="text-yellow-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteAddress(address.id);
                  }}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            {selectedAddress?.id === address.id && (
              <div className="mt-2 flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2 h-2 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-sm text-yellow-600">Selected</span>
              </div>
            )}
          </label>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleAddNewAddress}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          + Add New Address
        </button>
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAddress(null);
        }}
        onSave={handleModalSave}
        address={editingAddress}
      />
    </div>
  );
};

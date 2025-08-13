"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { Address } from "@/pages/user/Checkout";
import { X, User } from "lucide-react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Omit<Address, "id">) => void;
  address?: Address | null;
}

type FormState = {
  name: string;
  phone: string; // tanpa prefix +62
  address: string;
  isDefault: boolean;
  country: string;
  state: string;
  city: string;
  subdistrict: string;
  postalCode: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  address: "",
  isDefault: false,
  country: "",
  state: "",
  city: "",
  subdistrict: "",
  postalCode: "",
};

export const AddressModal = ({
  isOpen,
  onClose,
  onSave,
  address,
}: AddressModalProps) => {
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);

  // Set form saat modal dibuka
  useEffect(() => {
    if (!isOpen) return;

    if (address) {
      // HANYA ambil field yang memang ada di tipe Address
      setFormData({
        name: address.name ?? "",
        phone: (address.phone ?? "").replace(/^\+62\s?/, ""),
        address: address.address ?? "",
        isDefault: !!address.isDefault,

        // Field detail alamat TIDAK ada di Address → kosongkan saja
        country: "",
        state: "",
        city: "",
        subdistrict: "",
        postalCode: "",
      });
    } else {
      setFormData(EMPTY_FORM); // Mode Add Address → kosong
    }
  }, [isOpen, address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name.trim(),
      phone: `+62 ${formData.phone.trim()}`,
      address: formData.address.trim(),
      isDefault: formData.isDefault,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-lg w-full max-w-lg mx-4 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">
            {address ? "Edit Address" : "Add New Address"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Nama penerima"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              required
            />
            {formData.name && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, name: "" })}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Phone */}
          <div className="flex gap-2">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3">
              <select
                value="+62"
                className="border-none outline-none bg-transparent text-sm font-medium"
              >
                <option value="+62">+62</option>
              </select>
              <svg
                className="w-4 h-4 ml-1 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="flex-1 relative">
              <input
                type="tel"
                placeholder="8xx xxxx xxxx"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
              {formData.phone && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, phone: "" })}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Country */}
          <select
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Pilih Negara</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Singapore">Singapore</option>
          </select>

          {/* State & City */}
          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Pilih Provinsi</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
            </select>
            <select
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Pilih Kota</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
            </select>
          </div>

          {/* Subdistrict & Postal Code */}
          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.subdistrict}
              onChange={(e) =>
                setFormData({ ...formData, subdistrict: e.target.value })
              }
              className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Pilih Kecamatan</option>
              <option value="Gambir">Gambir</option>
              <option value="Tanah Abang">Tanah Abang</option>
            </select>
            <input
              type="text"
              placeholder="Kode Pos"
              value={formData.postalCode}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
              className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Address */}
          <textarea
            placeholder="Alamat lengkap"
            rows={3}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 resize-none"
          />

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {address ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

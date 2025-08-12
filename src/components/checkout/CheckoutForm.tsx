"use client";

import type { CustomerData } from "@/pages/user/Checkout";

interface CheckoutFormProps {
  customerData: CustomerData;
  onCustomerDataChange: (data: CustomerData) => void;
  errors: Record<string, string>;
}

export const CheckoutForm = ({
  customerData,
  onCustomerDataChange,
  errors,
}: CheckoutFormProps) => {
  const handleInputChange = (field: keyof CustomerData, value: string) => {
    onCustomerDataChange({
      ...customerData,
      [field]: value,
    });
  };

  const provinces = [
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Banten",
    "Yogyakarta",
  ];

  const cities = [
    "Jakarta Pusat",
    "Jakarta Selatan",
    "Jakarta Utara",
    "Jakarta Barat",
    "Jakarta Timur",
    "Bandung",
    "Surabaya",
  ];

  const subdistricts = [
    "Gambir",
    "Tanah Abang",
    "Menteng",
    "Senen",
    "Cempaka Putih",
    "Johar Baru",
  ];

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-lg font-semibold mb-4">Customer Information</h3>

      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={customerData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={customerData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="flex space-x-2">
        <select
          value="+62"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="+62">+62</option>
          <option value="+1">+1</option>
          <option value="+65">+65</option>
        </select>
        <input
          type="tel"
          placeholder="Enter Phone Number"
          value={customerData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {errors.phone && (
        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
      )}

      <div>
        <select
          value={customerData.country}
          onChange={(e) => handleInputChange("country", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="Indonesia">Indonesia</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Singapore">Singapore</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <select
            value={customerData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">State/Province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={customerData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">City/Regency</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <select
            value={customerData.subdistrict}
            onChange={(e) => handleInputChange("subdistrict", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Subdistrict</option>
            {subdistricts.map((subdistrict) => (
              <option key={subdistrict} value={subdistrict}>
                {subdistrict}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Postal Code"
            value={customerData.postalCode}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
              errors.postalCode ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
          )}
        </div>
      </div>

      <div>
        <textarea
          placeholder="Address Details"
          rows={3}
          value={customerData.addressDetails}
          onChange={(e) => handleInputChange("addressDetails", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
            errors.addressDetails ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.addressDetails && (
          <p className="text-red-500 text-sm mt-1">{errors.addressDetails}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Notes (Optional)"
          rows={3}
          value={customerData.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
    </div>
  );
};

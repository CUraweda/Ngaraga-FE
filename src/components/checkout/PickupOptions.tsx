"use client";

import { MapPin } from "lucide-react";

interface PickupOptionsProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  error?: string;
}

export const PickupOptions = ({
  selectedTime,
  onTimeSelect,
  error,
}: PickupOptionsProps) => {
  const timeSlots = [
    { id: "08:00", label: "08.00" },
    { id: "10:00", label: "10.00" },
    { id: "13:00", label: "13.00" },
    { id: "14:00", label: "14.00" },
    { id: "15:00", label: "15.00" },
  ];

  return (
    <div className="mb-8">
      {/* Pickup Location */}
      <div className="mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Ngaraga by Dolanan
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota
                Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pickup Time Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Pick a Pickup Time</h3>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex flex-wrap gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => onTimeSelect(slot.id)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                selectedTime === slot.id
                  ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

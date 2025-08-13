import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onResult: (data: string) => void;
}

type CameraDevice = { id: string; label: string };

export default function QRScanner({ onResult }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const qrRef = useRef<Html5Qrcode | null>(null);

  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [cameraId, setCameraId] = useState<string | null>(null);

  // Optional: gunakan facingMode untuk switch cepat front/back di HP
  const [facingMode, setFacingMode] = useState<"user" | "environment" | null>(null);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((cams) => {
        if (cams.length) {
          setDevices(cams);
          // Default: coba pilih kamera belakang bila ada; kalau tidak, pakai pertama
          const back = cams.find((c) =>
            /back|rear|environment/i.test(c.label || "")
          );
          setCameraId((back || cams[0]).id);
        } else {
          alert("No camera found!");
        }
      })
      .catch(() => alert("No camera found!"));
  }, []);

  const startScan = async () => {
    if (!cameraId && !facingMode) return;

    // Pastikan container ada & instance fresh
    if (!qrRef.current) {
      qrRef.current = new Html5Qrcode("reader");
    }

    try {
      // Argumen pertama bisa deviceId (string) atau constraints { facingMode }
      const cameraSelector = facingMode ? { facingMode } : cameraId!;
      await qrRef.current.start(
        cameraSelector as any,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          onResult(decodedText);
          stopScan();
        },
        (error) => {
          console.warn("⛔ Scan error:", error);
        }
      );
      setScanning(true);
    } catch (e) {
      console.error(e);
      alert("Gagal memulai kamera. Coba pilih kamera lain.");
    }
  };

  const stopScan = async () => {
    if (qrRef.current) {
      try {
        if (scanning) await qrRef.current.stop();
      } finally {
        await qrRef.current.clear();
        setScanning(false);
        // Biarkan instance tetap ada untuk start ulang cepat
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const scanner = new Html5Qrcode("reader");
    try {
      const result = await scanner.scanFile(file, true);
      onResult(result);
    } catch {
      alert("Gagal membaca QR dari gambar.");
    } finally {
      await scanner.clear();
    }
  };

  // Helper switch front/back di HP
  const switchFacing = async (mode: "user" | "environment") => {
    setFacingMode(mode);
    // Saat scanning, restart agar langsung pindah kamera
    if (scanning) {
      await stopScan();
      await startScan();
    }
  };

  // Bila user pilih device secara manual, kita pakai deviceId (override facingMode)
  const handleSelectDevice = async (id: string) => {
    setCameraId(id);
    setFacingMode(null); // pakai deviceId, bukan facingMode
    if (scanning) {
      await stopScan();
      await startScan();
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto text-center space-y-4">
      <span className="text-2xl font-bold">Scan to get your Card</span>

      {/* Pilih kamera (deviceId) */}
      {devices.length > 0 && (
        <div className="flex items-center gap-2 justify-center">
          <label className="text-sm font-medium">Camera:</label>
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            value={cameraId ?? ""}
            onChange={(e) => handleSelectDevice(e.target.value)}
            disabled={devices.length === 0}
          >
            {devices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label || d.id}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Tombol cepat front/back untuk HP */}
      {isMobile && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className={`btn btn-sm ${facingMode === "user" ? "btn-primary" : "btn-outline"}`}
            onClick={() => switchFacing("user")}
          >
            📱 Front
          </button>
          <button
            type="button"
            className={`btn btn-sm ${facingMode === "environment" ? "btn-primary" : "btn-outline"}`}
            onClick={() => switchFacing("environment")}
          >
            📷 Back
          </button>
        </div>
      )}

      <div id="reader" className="w-full rounded border border-gray-200" />

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
        {!scanning ? (
          <button onClick={startScan} className="btn btn-success">
            🎥 Start Camera Scan
          </button>
        ) : (
          <button onClick={stopScan} className="btn btn-error">
            🛑 Stop Camera Scan
          </button>
        )}

        <label className="btn btn-info cursor-pointer">
          📤 Upload QR Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
}

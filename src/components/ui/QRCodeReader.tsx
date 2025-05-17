import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onResult: (data: string) => void;
}

export default function QRScanner({ onResult }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const qrRef = useRef<Html5Qrcode | null>(null);
  const [cameraId, setCameraId] = useState<string | null>(null);

  useEffect(() => {
    Html5Qrcode.getCameras().then((devices) => {
      if (devices.length) {
        setCameraId(devices[0].id);
      } else {
        alert("No camera found!");
      }
    });
  }, []);

  const startScan = async () => {
    if (!cameraId) return;

    qrRef.current = new Html5Qrcode("reader");

    qrRef.current.start(
      cameraId,
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
  };

  const stopScan = async () => {
    if (qrRef.current) {
      await qrRef.current.stop();
      qrRef.current.clear();
      setScanning(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const scanner = new Html5Qrcode("reader");

    try {
      const result = await scanner.scanFile(file, true);
      onResult(result);
    } catch (err) {
      alert("Gagal membaca QR dari gambar.");
    } finally {
      scanner.clear();
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto text-center space-y-4">
      <span className="text-2xl font-bold ">Scan to get your Card</span>
      <div id="reader" className="w-full  rounded border border-gray-200" />

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

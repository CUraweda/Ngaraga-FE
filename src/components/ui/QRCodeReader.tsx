import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 }, false);

    scanner.render(
      (decodedText) => {
        console.log("✅ QR Code:", decodedText);
        scanner.clear(); // Stop scanning after success
      },
      (error) => {
        console.warn("⛔ Scan error:", error);
      }
    );
  }, []);

  return <div id="reader" style={{ width: "100%" }} />;
}

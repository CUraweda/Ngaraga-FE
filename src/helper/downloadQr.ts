import JSZip from "jszip";
import { saveAs } from "file-saver";

export const handleDownloadZip = async (cardsList: any) => {
  const zip = new JSZip();

  for (const item of cardsList.items) {
    const canvas = document.getElementById(item.uniqeCode) as HTMLCanvasElement;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.split(",")[1];

      zip.file(`QR-${item.uniqeCode}.png`, base64, { base64: true });
    }
  }

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "qr-codes.zip");
};

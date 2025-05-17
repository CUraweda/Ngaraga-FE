import React, { useState, useEffect } from "react";

interface FileUploaderProps {
  value?: File | null; // Gunakan value dari parent component
  onChange?: (file: File | null) => void; // Prop untuk mengubah file di parent
}

const FileUploader: React.FC<FileUploaderProps> = ({ value, onChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Update preview setiap kali `value` berubah
  useEffect(() => {
    if (value) {
      const preview = URL.createObjectURL(value);
      setPreviewUrl(preview);
      return () => URL.revokeObjectURL(preview); // Cleanup URL setelah unmount
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateImageFile(droppedFile)) {
      handleFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateImageFile(selectedFile)) {
      handleFile(selectedFile);
    }
  };

  const validateImageFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPEG and PNG files are allowed!");
      return false;
    }
    if (file.size > 2 * 1024 * 1024) { // Max 2MB
      alert("File size should not exceed 2MB!");
      return false;
    }
    return true;
  };

  const handleFile = (uploadedFile: File) => {
    if (onChange) {
      onChange(uploadedFile); // Kirim ke parent
    }
  };


  return (
    <div
      className={`border-dashed border-2 rounded-md flex flex-col items-center justify-center h-40 w-full ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <div className="flex items-center gap-5 justify-center w-full p-5 overflow-hidden">
          <label htmlFor="file-upload">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-52 object-cover mb-2 rounded"
            />
          </label>

        </div>
      ) : (
        <>
          <span className="text-gray-400 text-center">
            Drag & Drop file here, or click to upload
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            id="file-upload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="mt-2 px-4 py-1 bg-emerald-500 text-white text-sm font-medium rounded cursor-pointer hover:bg-emerald-600"
          >
            Browse File
          </label>
          <span className="text-gray-400 text-center text-sm">
            jpeg, jpg, png, max 2MB
          </span>
        </>
      )}
    </div>
  );
};

export default FileUploader;
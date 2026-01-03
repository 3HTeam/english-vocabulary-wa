import { Upload } from "lucide-react";
import React, { RefObject } from "react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleBoxClick: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (files: FileList | null) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
}
const FileDropzone = ({
  fileInputRef,
  handleBoxClick,
  handleDragOver,
  handleDrop,
  handleFileSelect,
  accept = "image/*",
  maxSize = 1024 * 1024,
  disabled = false,
}: FileDropzoneProps) => {
  const maxSizeMB = Math.round(maxSize / (1024 * 1024));
  const maxSizeKB = maxSizeMB < 1 ? Math.round(maxSize / 1024) : null;

  return (
    <div className="px-6">
      <div
        className={cn(
          "border-2 border-dashed border-border rounded-md px-24 py-10 flex flex-col items-center justify-center text-center",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="mb-2 bg-muted rounded-full p-3">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">Tải lên tệp tin</p>
        <p className="text-sm text-muted-foreground mt-1">
          hoặc,{" "}
          <label
            htmlFor="fileUpload"
            className={cn(
              "text-primary hover:text-primary/90 font-medium",
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            nhấp để duyệt
          </label>{" "}
          ({maxSizeKB ? `${maxSizeKB}KB` : `${maxSizeMB}MB`} tối đa)
        </p>
        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          disabled={disabled}
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>
    </div>
  );
}

export default FileDropzone;

"use client";

import { useRef, useState, useCallback } from "react";
import { AxiosError } from "axios";
import { useUploadMutation } from "@/apis/tanstack/hooks/upload.tanstack";
import { FileDropzone, FileList } from "./components";


export type FileUploadStatus = "uploading" | "success" | "error";

export interface FileUploadState {
  file: File;
  progress: number;
  status: FileUploadStatus;
  error?: string;
  url?: string;
}

interface FileUploadProps {
  onUploadSuccess?: (url: string, file: File) => void;
  onUploadError?: (error: string, file: File) => void;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  accept = "image/*",
  maxSize = 1024 * 1024,
  multiple = false,
  disabled = false,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileUploadState[]>([]);

  const uploadMutation = useUploadMutation({
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setFiles((prev) =>
          prev.map((f) => (f.status === "uploading" ? { ...f, progress } : f))
        );
      }
    },
  });

  const uploadFile = useCallback(
    async (file: File) => {
      if (file.size > maxSize) {
        const errorMsg = `File quá lớn. Kích thước tối đa: ${Math.round(
          maxSize / 1024
        )}KB`;
        setFiles((prev) =>
          prev.map((f) =>
            f.file.name === file.name
              ? { ...f, status: "error" as const, error: errorMsg }
              : f
          )
        );
        onUploadError?.(errorMsg, file);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await uploadMutation.mutateAsync(formData);
        const url = response.data?.url;

        if (url) {
          setFiles((prev) =>
            prev.map((f) =>
              f.file.name === file.name
                ? { ...f, status: "success" as const, progress: 100, url }
                : f
            )
          );
          onUploadSuccess?.(url, file);
        } else {
          throw new Error("Không nhận được URL từ server");
        }
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data?.message ||
              error.message ||
              "Upload thất bại"
            : error instanceof Error
            ? error.message
            : "Upload thất bại";

        setFiles((prev) =>
          prev.map((f) =>
            f.file.name === file.name
              ? { ...f, status: "error" as const, error: errorMessage }
              : f
          )
        );
        onUploadError?.(errorMessage, file);
      }
    },
    [uploadMutation, maxSize, onUploadSuccess, onUploadError]
  );

  const handleFileSelect = (files: FileList | null) => {
    if (!files || disabled) return;

    const newFiles = Array.from(files);

    // If multiple is false, only keep the first file
    const filesToAdd = multiple ? newFiles : [newFiles[0]];

    // Add new files to state with initial uploading status
    const newFileStates: FileUploadState[] = filesToAdd.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
    }));

    setFiles((prev) => {
      // If not multiple, replace all files
      return multiple ? [...prev, ...newFileStates] : newFileStates;
    });

    // Start uploading each file
    filesToAdd.forEach((file) => {
      uploadFile(file);
    });
  };

  const handleBoxClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!disabled) {
      e.preventDefault();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!disabled) {
      e.preventDefault();
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (filename: string) => {
    setFiles((prev) => prev.filter((f) => f.file.name !== filename));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <FileDropzone
          fileInputRef={fileInputRef}
          handleBoxClick={handleBoxClick}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileSelect={handleFileSelect}
          accept={accept}
          maxSize={maxSize}
          disabled={disabled}
        />
        <FileList files={files} removeFile={removeFile} />
      </div>
    </div>
  );
}

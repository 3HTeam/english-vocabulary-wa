"use client";

import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  FileUpload as DiceUIFileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
  type FileUploadProps as DiceUIFileUploadProps,
} from "@/components/ui/file-upload";
import { useUploadMutation } from "@/apis/queries/upload";

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
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Map<string, number>>(
    new Map()
  );

  const uploadMutation = useUploadMutation({
    onUploadProgress: () => {},
  });

  const onUpload: NonNullable<DiceUIFileUploadProps["onUpload"]> = useCallback(
    async (files, { onProgress, onSuccess, onError }) => {
      try {
        const uploadPromises = files.map(async (file) => {
          try {
            // Check file size
            if (file.size > maxSize) {
              const errorMsg = `File quá lớn. Kích thước tối đa: ${Math.round(
                maxSize / 1024
              )}KB`;
              onError(file, new Error(errorMsg));
              onUploadError?.(errorMsg, file);
              return;
            }

            // Start upload
            onProgress(file, 10);
            setUploadProgress((prev) => new Map(prev).set(file.name, 10));

            const formData = new FormData();
            formData.append("file", file);

            // Simulate progress during upload
            const progressInterval = setInterval(() => {
              setUploadProgress((prev) => {
                const currentProgress = prev.get(file.name) || 10;
                if (currentProgress < 90) {
                  const newProgress = currentProgress + 10;
                  onProgress(file, newProgress);
                  return new Map(prev).set(file.name, newProgress);
                }
                return prev;
              });
            }, 200);

            try {
              const response = await uploadMutation.mutateAsync(formData);
              const url = response.data?.url;

              clearInterval(progressInterval);

              if (url) {
                onProgress(file, 100);
                setUploadProgress((prev) => new Map(prev).set(file.name, 100));
                onSuccess(file);
                onUploadSuccess?.(url, file);
              } else {
                throw new Error("Không nhận được URL từ server");
              }
            } catch (error) {
              clearInterval(progressInterval);
              throw error;
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

            onError(file, new Error(errorMessage));
            onUploadError?.(errorMessage, file);
          }
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Unexpected error during upload:", error);
      }
    },
    [maxSize, onUploadSuccess, onUploadError, uploadMutation]
  );

  const onFileReject = useCallback((file: File, message: string) => {
    toast.error(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" đã bị từ chối`,
    });
  }, []);

  return (
    <DiceUIFileUpload
      value={files}
      onValueChange={setFiles}
      onUpload={onUpload}
      onFileReject={onFileReject}
      maxFiles={multiple ? 10 : 1}
      maxSize={maxSize}
      accept={accept}
      className="w-full"
      multiple={multiple}
      disabled={disabled}
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Kéo & thả file tại đây</p>
          <p className="text-muted-foreground text-xs">
            Hoặc click để chọn file (
            {maxSize >= 1024 * 1024
              ? `tối đa ${Math.round(maxSize / (1024 * 1024))}MB`
              : `tối đa ${Math.round(maxSize / 1024)}KB`}
            )
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Chọn file
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file} className="flex-col">
            <div className="flex w-full items-center gap-2">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X />
                </Button>
              </FileUploadItemDelete>
            </div>
            <FileUploadItemProgress />
          </FileUploadItem>
        ))}
      </FileUploadList>
    </DiceUIFileUpload>
  );
}

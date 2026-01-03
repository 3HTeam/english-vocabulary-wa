import { cn } from "@/lib/utils";
import type { FileUploadState } from "../../index";
import UploadedFileItem from "../file-item";

interface FileListProps {
  files: FileUploadState[];
  removeFile: (filename: string) => void;
}

const FileList = ({ files, removeFile }: FileListProps) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className={cn("px-6 pb-4 space-y-3 mt-4")}>
      {files.map((fileState, index) => (
        <UploadedFileItem
          key={fileState.file.name + index}
          file={fileState.file}
          progress={fileState.progress}
          status={fileState.status}
          error={fileState.error}
          onRemove={removeFile}
        />
      ))}
    </div>
  );
}

export default FileList;

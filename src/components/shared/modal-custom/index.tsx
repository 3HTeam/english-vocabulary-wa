"use client";

import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EMPTY } from "@/constants/common";
import { cn } from "@/utils/shadcn";

interface ModalCustomProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
  className?: string;
}

export function ModalCustom({
  open,
  onOpenChange,
  title,
  description = EMPTY.str,
  children,
  footer = null,
  isLoading = false,
  className = EMPTY.str,
}: ModalCustomProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 flex flex-col p-0 sm:max-w-[650px] max-h-[80vh]",
          className,
        )}
      >
        {/* Fixed Header */}
        <DialogHeader className="p-4 border-b bg-background">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="relative flex-1 overflow-y-auto px-4 modal-scrollbar">
          {isLoading && (
            <div className="absolute inset-0 bg-background/40 flex items-center justify-center z-10">
              <LoadingSpinner />
            </div>
          )}
          {children}
        </div>

        {/* Fixed Footer */}
        {footer && (
          <div className="p-4 border-t bg-background">{footer}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ModalCustom;

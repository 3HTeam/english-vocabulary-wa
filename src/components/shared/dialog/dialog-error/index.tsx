"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "@/hooks";

interface DialogErrorProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  onClose?: () => void;
}

const DialogError = ({
  open,
  onOpenChange,
  title,
  onClose,
}: DialogErrorProps) => {
  const t = useTranslations();

  const handleClose = () => {
    onClose?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-8 text-center text-destructive">
          {t("common.error.loading")}
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={handleClose}
            className="cursor-pointer"
          >
            {t("common.actions.close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogError;

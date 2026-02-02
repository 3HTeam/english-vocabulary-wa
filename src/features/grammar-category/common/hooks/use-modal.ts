import { useCallback, useState } from "react";

import { MODES } from "@/constants/common";

export type ModalMode =
  | typeof MODES.add
  | typeof MODES.view
  | typeof MODES.edit;

interface UseModalReturn {
  isOpen: boolean;
  mode: ModalMode;
  selectedId: string | null;
  openModal: (mode: ModalMode, id?: string) => void;
  closeModal: () => void;
}

export const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>(MODES.view);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openModal = useCallback((newMode: ModalMode, id?: string) => {
    setMode(newMode);
    setSelectedId(id || null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedId(null);
    
    setTimeout(() => setMode(MODES.view), 200);
  }, []);

  return {
    isOpen,
    mode,
    selectedId,
    openModal,
    closeModal,
  };
};

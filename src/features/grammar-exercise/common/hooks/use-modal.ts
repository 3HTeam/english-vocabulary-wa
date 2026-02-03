import { useState } from "react";

import { ModalMode } from "../constants";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("view");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openModal = (newMode: ModalMode, id?: string) => {
    setMode(newMode);
    setSelectedId(id || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  return {
    isOpen,
    mode,
    selectedId,
    openModal,
    closeModal,
  };
};

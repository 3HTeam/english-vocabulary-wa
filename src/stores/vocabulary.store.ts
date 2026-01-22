import { create } from "zustand";
import { VocabularyFormValues } from "@/features/vocabulary/schemas";

interface VocabularyState {
  draft: Partial<VocabularyFormValues> | null;
  setDraft: (data: Partial<VocabularyFormValues>) => void;
  clearDraft: () => void;
}

export const useVocabularyStore = create<VocabularyState>((set) => ({
  draft: null,
  setDraft: (data) => set({ draft: data }),
  clearDraft: () => set({ draft: null }),
}));

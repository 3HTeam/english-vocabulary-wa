import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";

import { useTranslations } from "@/hooks";

import "./styles.css";

import { useMemo } from "react";

import { EMPTY } from "@/constants/common";
import { cn } from "@/utils/shadcn";

interface CharacterCountProps {
  editor: Editor;
  limit?: number | null;
  className?: string;
}

export const CharacterCount = ({
  editor,
  limit = null,
  className = EMPTY.str,
}: CharacterCountProps) => {
  const t = useTranslations();

  const { charactersCount, wordsCount } = useEditorState({
    editor,
    selector: (context) => {
      return {
        charactersCount: context.editor.storage.characterCount.characters(),
        wordsCount: context.editor.storage.characterCount.words(),
      };
    },
  });

  const percentage = useMemo(() => {
    if(!limit) return 0;
    return Math.round((100 / limit) * charactersCount);
  }, [limit, charactersCount]);

  if (!limit) return;

  return (
    <div
      className={cn(
        "character-count !border-t !border-border p-3",
        charactersCount === limit && "character-count--warning",
        className,
      )}
    >
      <svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>
      {t("text_editor.character_count", { count: charactersCount, limit })}
      <br />
      {t("text_editor.words_count", { count: wordsCount })}
    </div>
  );
};

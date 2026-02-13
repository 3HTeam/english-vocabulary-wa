"use client";

import { useCallback, useEffect, useMemo } from "react";

import { useEditor } from "@tiptap/react";

import { EMPTY } from "@/constants/common";
import { useDebounce, useTranslations } from "@/hooks";

import { createExtensions, type ExtensionConfig } from "../configs/extensions";
import type { TextEditorProps } from "../types";

export const useTextEditor = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  maxLength = null,
  onImageUpload,
  onVideoUpload,
  onEditorReady,
  onBlur,
  onFocus,
}: Pick<
  TextEditorProps,
  | "value"
  | "onChange"
  | "placeholder"
  | "disabled"
  | "maxLength"
  | "onImageUpload"
  | "onVideoUpload"
  | "onEditorReady"
  | "onBlur"
  | "onFocus"
>) => {
  const t = useTranslations();

  const onValueChange = useDebounce((newValue: string) => {
    onChange(newValue);
  }, 300);

  // Memoize extension config
  const extensionConfig: ExtensionConfig = useMemo(
    () => ({
      placeholder: placeholder,
      characterLimit: maxLength,
      imageUpload: onImageUpload,
      videoUpload: onVideoUpload,
    }),
    [placeholder, maxLength, onImageUpload, onVideoUpload, t],
  );

  // Memoize extensions
  const extensions = useMemo(
    () => createExtensions(extensionConfig),
    [extensionConfig],
  );

  const editor = useEditor({
    extensions,
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onValueChange(html);
    },
    onBlur: () => {
      onBlur?.();
    },
    onFocus: () => {
      onFocus?.();
    },
  });

  // Call onEditorReady when editor is ready
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  // Update editable state
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [editor, disabled]);

  // Expose editor methods
  const getHTML = useCallback(() => {
    return editor?.getHTML() || EMPTY.str;
  }, [editor]);

  const getText = useCallback(() => {
    return editor?.getText() || EMPTY.str;
  }, [editor]);

  const setContent = useCallback(
    (content: string) => {
      editor?.commands.setContent(content);
    },
    [editor],
  );

  const clear = useCallback(() => {
    editor?.commands.clearContent();
  }, [editor]);

  const focus = useCallback(() => {
    editor?.commands.focus();
  }, [editor]);

  const blur = useCallback(() => {
    editor?.commands.blur();
  }, [editor]);

  return {
    editor,
    getHTML,
    getText,
    setContent,
    clear,
    focus,
    blur,
  };
};

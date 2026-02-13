"use client";

import { forwardRef, useEffect, useImperativeHandle } from "react";

import { EditorContent } from "@tiptap/react";
import { useLocale } from "next-intl";
import { RichTextProvider } from "reactjs-tiptap-editor";
import { localeActions } from "reactjs-tiptap-editor/locale-bundle";

import { cn } from "@/utils/shadcn";

// Styles
import "@excalidraw/excalidraw/index.css";
import "easydrawer/styles.css";
import "katex/dist/katex.min.css";
import "prism-code-editor-lightweight/layout.css";
import "prism-code-editor-lightweight/themes/github-dark.css";
import "reactjs-tiptap-editor/style.css";
import "katex/contrib/mhchem";

import { EMPTY } from "@/constants/common";

// Components
import { CharacterCount, EditorFeatures, Toolbar } from "./components";
// Hooks & Config
import { useTextEditor } from "./hooks";
import type { TextEditorProps, TextEditorRef } from "./types";

export const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(
  (
    {
      value,
      onChange,
      placeholder = EMPTY.str,
      disabled = false,
      className = EMPTY.str,
      toolbarItems,
      toolbarClassName = EMPTY.str,
      maxLength = null,
      characterCountClassName = EMPTY.str,
      features,
      onImageUpload,
      onVideoUpload,
      onEditorReady,
      onBlur,
      onFocus,
    },
    ref,
  ) => {
    const locale = useLocale();
    const { editor, getHTML, getText, setContent, clear, focus, blur } =
      useTextEditor({
        value,
        onChange,
        placeholder,
        disabled,
        maxLength,
        onImageUpload,
        onVideoUpload,
        onEditorReady,
        onBlur,
        onFocus,
      });

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      editor,
      getHTML,
      getText,
      setContent,
      clear,
      focus,
      blur,
    }));

    useEffect(() => {
      localeActions.setLang(locale);
    }, [locale]);

    if (!editor) {
      return null;
    }

    return (
      <div
        className={cn(
          "w-full rounded-[0.5rem] border border-border bg-background",
          className,
        )}
      >
        <RichTextProvider editor={editor}>
          <Toolbar items={toolbarItems} className={toolbarClassName} />

          <EditorContent editor={editor} />

          <EditorFeatures {...features} />

          <CharacterCount
            editor={editor}
            limit={maxLength}
            className={characterCountClassName}
          />
        </RichTextProvider>
      </div>
    );
  },
);

TextEditor.displayName = "TextEditor";

export {
  TOOLBAR_ITEM_KEYS,
  TOOLBAR_PRESETS,
  TOOLBAR_GROUPS,
} from "./components";

export { TextEditorRef };

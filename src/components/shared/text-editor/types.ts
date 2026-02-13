import type { Editor } from "@tiptap/react";

import type {
  EditorFeaturesProps as EditorFeatures,
  ToolbarItemKey,
} from "./components";

export interface TextEditorProps {
  // Content
  value: string;
  onChange: (value: string) => void;

  // Basic config
  placeholder?: string;
  disabled?: boolean;
  className?: string;

  // Toolbar config
  toolbarItems?: ToolbarItemKey[];
  toolbarClassName?: string;

  // Character count
  maxLength?: number | null;
  characterCountClassName?: string;

  // Features configuration
  features?: EditorFeatures;

  // Upload handlers
  onImageUpload?: (file: File) => Promise<string>;
  onVideoUpload?: (file: File) => Promise<string>;

  // Editor callbacks
  onEditorReady?: (editor: Editor) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export interface TextEditorRef {
  editor: Editor | null;
  getHTML: () => string;
  getText: () => string;
  setContent: (content: string) => void;
  clear: () => void;
  focus: () => void;
  blur: () => void;
}

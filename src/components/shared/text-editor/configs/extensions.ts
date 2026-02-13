import { Document } from "@tiptap/extension-document";
import { HardBreak } from "@tiptap/extension-hard-break";
import { ListItem } from "@tiptap/extension-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  CharacterCount,
  Dropcursor,
  Gapcursor,
  Placeholder,
  TrailingNode,
} from "@tiptap/extensions";
import { Blockquote } from "reactjs-tiptap-editor/blockquote";
import { Bold } from "reactjs-tiptap-editor/bold";
import { BulletList } from "reactjs-tiptap-editor/bulletlist";
import { Callout } from "reactjs-tiptap-editor/callout";
import { Clear } from "reactjs-tiptap-editor/clear";
import { CodeBlock } from "reactjs-tiptap-editor/codeblock";
import { CodeView } from "reactjs-tiptap-editor/codeview";
import { Color } from "reactjs-tiptap-editor/color";
import {
  Column,
  ColumnNode,
  MultipleColumnNode,
} from "reactjs-tiptap-editor/column";
import { Emoji } from "reactjs-tiptap-editor/emoji";
import { ExportPdf } from "reactjs-tiptap-editor/exportpdf";
import { ExportWord } from "reactjs-tiptap-editor/exportword";
import { FontFamily } from "reactjs-tiptap-editor/fontfamily";
import { FontSize } from "reactjs-tiptap-editor/fontsize";
import { Heading } from "reactjs-tiptap-editor/heading";
import { Highlight } from "reactjs-tiptap-editor/highlight";
import { History } from "reactjs-tiptap-editor/history";
import { HorizontalRule } from "reactjs-tiptap-editor/horizontalrule";
import { Iframe } from "reactjs-tiptap-editor/iframe";
import { Image } from "reactjs-tiptap-editor/image";
import { ImportWord } from "reactjs-tiptap-editor/importword";
import { Indent } from "reactjs-tiptap-editor/indent";
import { Italic } from "reactjs-tiptap-editor/italic";
import { LineHeight } from "reactjs-tiptap-editor/lineheight";
import { Link } from "reactjs-tiptap-editor/link";
import { Mention } from "reactjs-tiptap-editor/mention";
import { MoreMark } from "reactjs-tiptap-editor/moremark";
import { OrderedList } from "reactjs-tiptap-editor/orderedlist";
import { SearchAndReplace } from "reactjs-tiptap-editor/searchandreplace";
import { SlashCommand } from "reactjs-tiptap-editor/slashcommand";
import { Strike } from "reactjs-tiptap-editor/strike";
import { Table } from "reactjs-tiptap-editor/table";
import { TaskList } from "reactjs-tiptap-editor/tasklist";
import { TextAlign } from "reactjs-tiptap-editor/textalign";
import { TextDirection } from "reactjs-tiptap-editor/textdirection";
import { TextUnderline } from "reactjs-tiptap-editor/textunderline";
import { Video } from "reactjs-tiptap-editor/video";

import { EMPTY } from "@/constants/common";

// Custom document to support columns
const DocumentColumn = Document.extend({
  content: "(block|columns)+",
});

export interface ExtensionConfig {
  placeholder?: string;
  characterLimit?: number | null;
  imageUpload?: (file: File) => Promise<string>;
  videoUpload?: (file: File) => Promise<string>;
  emojiList?: Array<{ name: string; emoji: string }>;
  mentionSuggestions?: Array<{ id: string; label: string }>;
}

export const createExtensions = (config: ExtensionConfig = {}) => {
  const {
    placeholder = EMPTY.str,
    characterLimit = null,
    imageUpload,
    videoUpload,
    emojiList = EMPTY.arr,
    mentionSuggestions = EMPTY.arr,
  } = config;

  return [
    // Base extensions
    DocumentColumn,
    Text,
    Dropcursor.configure({
      class: "reactjs-tiptap-editor-theme",
      color: "hsl(var(--primary))",
      width: 2,
    }),
    Gapcursor,
    HardBreak,
    Paragraph,
    TrailingNode,
    ListItem,
    TextStyle,
    Placeholder.configure({ placeholder }),
    CharacterCount.configure({ limit: characterLimit }),

    // Editing extensions
    History,
    SearchAndReplace,
    Clear,

    // Formatting extensions
    FontFamily,
    Heading,
    FontSize,
    Bold,
    Italic,
    TextUnderline,
    Strike,
    MoreMark,
    Color,
    Highlight,

    // List extensions
    BulletList,
    OrderedList,
    TaskList,

    // Alignment & spacing
    TextAlign,
    Indent,
    LineHeight,
    TextDirection,

    // Link & media
    Link,
    Image.configure({
      upload: imageUpload || ((_file: File) => Promise.resolve(EMPTY.str)),
    }),
    Video.configure({
      upload: videoUpload || ((_file: File) => Promise.resolve(EMPTY.str)),
    }),

    // Special content
    Blockquote,
    HorizontalRule,
    CodeBlock,
    Table,
    Iframe,
    Callout,

    // Layout
    Column,
    ColumnNode,
    MultipleColumnNode,

    // Advanced features
    Emoji.configure({
      suggestion: {
        items: async ({ query }: any) => {
          const lowerCaseQuery = query?.toLowerCase() || EMPTY.str;
          return emojiList.filter(({ name }) =>
            name.toLowerCase().includes(lowerCaseQuery),
          );
        },
      },
    }),
    Mention.configure({
      suggestions: [
        {
          char: "@",
          items: async ({ query }: any) => {
            const lowerCaseQuery = query?.toLowerCase() || EMPTY.str;
            return mentionSuggestions.filter((item) =>
              item.label.toLowerCase().includes(lowerCaseQuery),
            );
          },
        },
      ],
    }),

    // Import/Export
    ExportPdf,
    ImportWord,
    ExportWord,

    // Utilities
    SlashCommand,
    CodeView,
  ];
};

// Default extensions for quick use
export const defaultExtensions = createExtensions();

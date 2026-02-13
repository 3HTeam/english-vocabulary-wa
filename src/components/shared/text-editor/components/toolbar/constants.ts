import { RichTextBlockquote } from "reactjs-tiptap-editor/blockquote";
import { RichTextBold } from "reactjs-tiptap-editor/bold";
import { RichTextBulletList } from "reactjs-tiptap-editor/bulletlist";
import { RichTextClear } from "reactjs-tiptap-editor/clear";
import { RichTextCodeBlock } from "reactjs-tiptap-editor/codeblock";
import { RichTextCodeView } from "reactjs-tiptap-editor/codeview";
import { RichTextColor } from "reactjs-tiptap-editor/color";
import { RichTextColumn } from "reactjs-tiptap-editor/column";
import { RichTextEmoji } from "reactjs-tiptap-editor/emoji";
import { RichTextExportPdf } from "reactjs-tiptap-editor/exportpdf";
import { RichTextExportWord } from "reactjs-tiptap-editor/exportword";
import { RichTextFontFamily } from "reactjs-tiptap-editor/fontfamily";
import { RichTextFontSize } from "reactjs-tiptap-editor/fontsize";
import { RichTextHeading } from "reactjs-tiptap-editor/heading";
import { RichTextHighlight } from "reactjs-tiptap-editor/highlight";
import { RichTextRedo, RichTextUndo } from "reactjs-tiptap-editor/history";
import { RichTextHorizontalRule } from "reactjs-tiptap-editor/horizontalrule";
import { RichTextIframe } from "reactjs-tiptap-editor/iframe";
import { RichTextImage } from "reactjs-tiptap-editor/image";
import { RichTextImportWord } from "reactjs-tiptap-editor/importword";
import { RichTextIndent } from "reactjs-tiptap-editor/indent";
import { RichTextItalic } from "reactjs-tiptap-editor/italic";
import { RichTextLineHeight } from "reactjs-tiptap-editor/lineheight";
import { RichTextLink } from "reactjs-tiptap-editor/link";
import { RichTextMoreMark } from "reactjs-tiptap-editor/moremark";
import { RichTextOrderedList } from "reactjs-tiptap-editor/orderedlist";
import { RichTextSearchAndReplace } from "reactjs-tiptap-editor/searchandreplace";
import { RichTextStrike } from "reactjs-tiptap-editor/strike";
import { RichTextTable } from "reactjs-tiptap-editor/table";
import { RichTextTaskList } from "reactjs-tiptap-editor/tasklist";
import { RichTextAlign } from "reactjs-tiptap-editor/textalign";
import { RichTextTextDirection } from "reactjs-tiptap-editor/textdirection";
import { RichTextUnderline } from "reactjs-tiptap-editor/textunderline";
import { RichTextVideo } from "reactjs-tiptap-editor/video";

export const TOOLBAR_ITEM_KEYS = {
  // History
  undo: "Undo",
  redo: "Redo",

  // Search & Clear
  searchAndReplace: "SearchAndReplace",
  clear: "Clear",

  // Text Style
  fontFamily: "FontFamily",
  fontSize: "FontSize",
  heading: "Heading",

  // Text Formatting
  bold: "Bold",
  italic: "Italic",
  underline: "Underline",
  strike: "Strike",
  moreMark: "MoreMark",

  // Color & Highlight
  color: "Color",
  highlight: "Highlight",

  // Special Characters
  emoji: "Emoji",

  // Lists
  bulletList: "BulletList",
  orderedList: "OrderedList",
  taskList: "TaskList",

  // Alignment & Spacing
  align: "Align",
  indent: "Indent",
  lineHeight: "LineHeight",

  // Insert
  link: "Link",
  image: "Image",
  video: "Video",
  blockquote: "Blockquote",
  horizontalRule: "HorizontalRule",
  codeBlock: "CodeBlock",
  table: "Table",
  iframe: "Iframe",

  // Layout
  column: "Column",

  // Advanced
  exportPdf: "ExportPdf",
  importWord: "ImportWord",
  exportWord: "ExportWord",
  textDirection: "TextDirection",
  codeView: "CodeView",
} as const;

export type ToolbarItemKey = keyof typeof ToolbarItems;

export const ToolbarItems = {
  [TOOLBAR_ITEM_KEYS.undo]: RichTextUndo,
  [TOOLBAR_ITEM_KEYS.redo]: RichTextRedo,
  [TOOLBAR_ITEM_KEYS.searchAndReplace]: RichTextSearchAndReplace,
  [TOOLBAR_ITEM_KEYS.clear]: RichTextClear,
  [TOOLBAR_ITEM_KEYS.fontFamily]: RichTextFontFamily,
  [TOOLBAR_ITEM_KEYS.heading]: RichTextHeading,
  [TOOLBAR_ITEM_KEYS.fontSize]: RichTextFontSize,
  [TOOLBAR_ITEM_KEYS.bold]: RichTextBold,
  [TOOLBAR_ITEM_KEYS.italic]: RichTextItalic,
  [TOOLBAR_ITEM_KEYS.underline]: RichTextUnderline,
  [TOOLBAR_ITEM_KEYS.strike]: RichTextStrike,
  [TOOLBAR_ITEM_KEYS.moreMark]: RichTextMoreMark,
  [TOOLBAR_ITEM_KEYS.emoji]: RichTextEmoji,
  [TOOLBAR_ITEM_KEYS.color]: RichTextColor,
  [TOOLBAR_ITEM_KEYS.highlight]: RichTextHighlight,
  [TOOLBAR_ITEM_KEYS.bulletList]: RichTextBulletList,
  [TOOLBAR_ITEM_KEYS.orderedList]: RichTextOrderedList,
  [TOOLBAR_ITEM_KEYS.align]: RichTextAlign,
  [TOOLBAR_ITEM_KEYS.indent]: RichTextIndent,
  [TOOLBAR_ITEM_KEYS.lineHeight]: RichTextLineHeight,
  [TOOLBAR_ITEM_KEYS.taskList]: RichTextTaskList,
  [TOOLBAR_ITEM_KEYS.link]: RichTextLink,
  [TOOLBAR_ITEM_KEYS.image]: RichTextImage,
  [TOOLBAR_ITEM_KEYS.video]: RichTextVideo,
  [TOOLBAR_ITEM_KEYS.blockquote]: RichTextBlockquote,
  [TOOLBAR_ITEM_KEYS.horizontalRule]: RichTextHorizontalRule,
  [TOOLBAR_ITEM_KEYS.codeBlock]: RichTextCodeBlock,
  [TOOLBAR_ITEM_KEYS.column]: RichTextColumn,
  [TOOLBAR_ITEM_KEYS.table]: RichTextTable,
  [TOOLBAR_ITEM_KEYS.iframe]: RichTextIframe,
  [TOOLBAR_ITEM_KEYS.exportPdf]: RichTextExportPdf,
  [TOOLBAR_ITEM_KEYS.importWord]: RichTextImportWord,
  [TOOLBAR_ITEM_KEYS.exportWord]: RichTextExportWord,
  [TOOLBAR_ITEM_KEYS.textDirection]: RichTextTextDirection,
  [TOOLBAR_ITEM_KEYS.codeView]: RichTextCodeView,
} as const;

export const TOOLBAR_PRESETS = {
  // Minimal toolbar for simple text editing
  minimal: [
    TOOLBAR_ITEM_KEYS.bold,
    TOOLBAR_ITEM_KEYS.italic,
    TOOLBAR_ITEM_KEYS.underline,
    TOOLBAR_ITEM_KEYS.link,
  ] as ToolbarItemKey[],

  // Basic toolbar for common editing
  basic: [
    TOOLBAR_ITEM_KEYS.undo,
    TOOLBAR_ITEM_KEYS.redo,
    TOOLBAR_ITEM_KEYS.bold,
    TOOLBAR_ITEM_KEYS.italic,
    TOOLBAR_ITEM_KEYS.underline,
    TOOLBAR_ITEM_KEYS.strike,
    TOOLBAR_ITEM_KEYS.link,
    TOOLBAR_ITEM_KEYS.bulletList,
    TOOLBAR_ITEM_KEYS.orderedList,
  ] as ToolbarItemKey[],

  // Standard toolbar with formatting options
  standard: [
    TOOLBAR_ITEM_KEYS.undo,
    TOOLBAR_ITEM_KEYS.redo,
    TOOLBAR_ITEM_KEYS.fontFamily,
    TOOLBAR_ITEM_KEYS.fontSize,
    TOOLBAR_ITEM_KEYS.bold,
    TOOLBAR_ITEM_KEYS.italic,
    TOOLBAR_ITEM_KEYS.underline,
    TOOLBAR_ITEM_KEYS.strike,
    TOOLBAR_ITEM_KEYS.color,
    TOOLBAR_ITEM_KEYS.highlight,
    TOOLBAR_ITEM_KEYS.link,
    TOOLBAR_ITEM_KEYS.bulletList,
    TOOLBAR_ITEM_KEYS.orderedList,
    TOOLBAR_ITEM_KEYS.align,
  ] as ToolbarItemKey[],

  // Advanced toolbar with media and layout
  advanced: [
    TOOLBAR_ITEM_KEYS.undo,
    TOOLBAR_ITEM_KEYS.redo,
    TOOLBAR_ITEM_KEYS.searchAndReplace,
    TOOLBAR_ITEM_KEYS.clear,
    TOOLBAR_ITEM_KEYS.fontFamily,
    TOOLBAR_ITEM_KEYS.heading,
    TOOLBAR_ITEM_KEYS.fontSize,
    TOOLBAR_ITEM_KEYS.bold,
    TOOLBAR_ITEM_KEYS.italic,
    TOOLBAR_ITEM_KEYS.underline,
    TOOLBAR_ITEM_KEYS.strike,
    TOOLBAR_ITEM_KEYS.moreMark,
    TOOLBAR_ITEM_KEYS.color,
    TOOLBAR_ITEM_KEYS.highlight,
    TOOLBAR_ITEM_KEYS.bulletList,
    TOOLBAR_ITEM_KEYS.orderedList,
    TOOLBAR_ITEM_KEYS.taskList,
    TOOLBAR_ITEM_KEYS.align,
    TOOLBAR_ITEM_KEYS.indent,
    TOOLBAR_ITEM_KEYS.lineHeight,
    TOOLBAR_ITEM_KEYS.link,
    TOOLBAR_ITEM_KEYS.image,
    TOOLBAR_ITEM_KEYS.video,
    TOOLBAR_ITEM_KEYS.table,
    TOOLBAR_ITEM_KEYS.blockquote,
    TOOLBAR_ITEM_KEYS.horizontalRule,
    TOOLBAR_ITEM_KEYS.codeBlock,
  ] as ToolbarItemKey[],

  // Full toolbar with all features
  full: [
    TOOLBAR_ITEM_KEYS.undo,
    TOOLBAR_ITEM_KEYS.redo,
    TOOLBAR_ITEM_KEYS.searchAndReplace,
    TOOLBAR_ITEM_KEYS.clear,
    TOOLBAR_ITEM_KEYS.fontFamily,
    TOOLBAR_ITEM_KEYS.heading,
    TOOLBAR_ITEM_KEYS.fontSize,
    TOOLBAR_ITEM_KEYS.bold,
    TOOLBAR_ITEM_KEYS.italic,
    TOOLBAR_ITEM_KEYS.underline,
    TOOLBAR_ITEM_KEYS.strike,
    TOOLBAR_ITEM_KEYS.moreMark,
    TOOLBAR_ITEM_KEYS.emoji,
    TOOLBAR_ITEM_KEYS.color,
    TOOLBAR_ITEM_KEYS.highlight,
    TOOLBAR_ITEM_KEYS.bulletList,
    TOOLBAR_ITEM_KEYS.orderedList,
    TOOLBAR_ITEM_KEYS.taskList,
    TOOLBAR_ITEM_KEYS.align,
    TOOLBAR_ITEM_KEYS.indent,
    TOOLBAR_ITEM_KEYS.lineHeight,
    TOOLBAR_ITEM_KEYS.link,
    TOOLBAR_ITEM_KEYS.image,
    TOOLBAR_ITEM_KEYS.video,
    TOOLBAR_ITEM_KEYS.blockquote,
    TOOLBAR_ITEM_KEYS.horizontalRule,
    TOOLBAR_ITEM_KEYS.codeBlock,
    TOOLBAR_ITEM_KEYS.column,
    TOOLBAR_ITEM_KEYS.table,
    TOOLBAR_ITEM_KEYS.iframe,
    TOOLBAR_ITEM_KEYS.exportPdf,
    TOOLBAR_ITEM_KEYS.importWord,
    TOOLBAR_ITEM_KEYS.exportWord,
    TOOLBAR_ITEM_KEYS.textDirection,
    TOOLBAR_ITEM_KEYS.codeView,
  ] as ToolbarItemKey[],

  // Content writing focused
  content: [
    TOOLBAR_ITEM_KEYS.undo,
    TOOLBAR_ITEM_KEYS.redo,
    TOOLBAR_ITEM_KEYS.heading,
    TOOLBAR_ITEM_KEYS.bold,
    TOOLBAR_ITEM_KEYS.italic,
    TOOLBAR_ITEM_KEYS.link,
    TOOLBAR_ITEM_KEYS.image,
    TOOLBAR_ITEM_KEYS.bulletList,
    TOOLBAR_ITEM_KEYS.orderedList,
    TOOLBAR_ITEM_KEYS.blockquote,
    TOOLBAR_ITEM_KEYS.codeBlock,
  ] as ToolbarItemKey[],

  // Comment/Note focused
  comment: [
    TOOLBAR_ITEM_KEYS.bold,
    TOOLBAR_ITEM_KEYS.italic,
    TOOLBAR_ITEM_KEYS.link,
    TOOLBAR_ITEM_KEYS.bulletList,
    TOOLBAR_ITEM_KEYS.orderedList,
  ] as ToolbarItemKey[],
};

/**
 * Toolbar item groups for easier organization
 */
export const TOOLBAR_GROUPS = {
  history: [TOOLBAR_ITEM_KEYS.undo, TOOLBAR_ITEM_KEYS.redo],

  textStyle: [
    TOOLBAR_ITEM_KEYS.fontFamily,
    TOOLBAR_ITEM_KEYS.fontSize,
    TOOLBAR_ITEM_KEYS.heading,
  ],

  textFormat: [
    TOOLBAR_ITEM_KEYS.bold,
    TOOLBAR_ITEM_KEYS.italic,
    TOOLBAR_ITEM_KEYS.underline,
    TOOLBAR_ITEM_KEYS.strike,
  ],

  color: [TOOLBAR_ITEM_KEYS.color, TOOLBAR_ITEM_KEYS.highlight],

  lists: [
    TOOLBAR_ITEM_KEYS.bulletList,
    TOOLBAR_ITEM_KEYS.orderedList,
    TOOLBAR_ITEM_KEYS.taskList,
  ],

  alignment: [
    TOOLBAR_ITEM_KEYS.align,
    TOOLBAR_ITEM_KEYS.indent,
    TOOLBAR_ITEM_KEYS.lineHeight,
  ],

  insert: [
    TOOLBAR_ITEM_KEYS.link,
    TOOLBAR_ITEM_KEYS.image,
    TOOLBAR_ITEM_KEYS.video,
    TOOLBAR_ITEM_KEYS.table,
  ],

  blocks: [
    TOOLBAR_ITEM_KEYS.blockquote,
    TOOLBAR_ITEM_KEYS.codeBlock,
    TOOLBAR_ITEM_KEYS.horizontalRule,
  ],

  advanced: [
    TOOLBAR_ITEM_KEYS.exportPdf,
    TOOLBAR_ITEM_KEYS.importWord,
    TOOLBAR_ITEM_KEYS.exportWord,
  ],
} as const;


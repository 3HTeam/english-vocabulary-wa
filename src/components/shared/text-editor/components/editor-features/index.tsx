import {
  RichTextBubbleCallout,
  RichTextBubbleColumns,
  RichTextBubbleDrawer,
  RichTextBubbleExcalidraw,
  RichTextBubbleIframe,
  RichTextBubbleImage,
  RichTextBubbleImageGif,
  RichTextBubbleKatex,
  RichTextBubbleLink,
  RichTextBubbleMenuDragHandle,
  RichTextBubbleMermaid,
  RichTextBubbleTable,
  RichTextBubbleText,
  RichTextBubbleTwitter,
  RichTextBubbleVideo,
} from "reactjs-tiptap-editor/bubble";
import { SlashCommandList } from "reactjs-tiptap-editor/slashcommand";

import { DEFAULT_FEATURES } from "./constants";
import type { EditorFeaturesProps } from "./types";

export const EditorFeatures = ({
  bubbleText,
  bubbleLink,
  bubbleImage,
  bubbleTable,
  bubbleVideo,
  bubbleCallout,
  bubbleColumns,
  bubbleDrawer,
  bubbleExcalidraw,
  bubbleIframe,
  bubbleKatex,
  bubbleImageGif,
  bubbleMermaid,
  bubbleTwitter,
  slashCommand,
  dragHandle,
}: EditorFeaturesProps = DEFAULT_FEATURES) => {
  return (
    <>
      {/* Essential Bubble Menus */}
      {bubbleText && <RichTextBubbleText />}
      {bubbleLink && <RichTextBubbleLink />}
      {bubbleImage && <RichTextBubbleImage />}
      {bubbleTable && <RichTextBubbleTable />}

      {/* Optional Bubble Menus */}
      {bubbleVideo && <RichTextBubbleVideo />}
      {bubbleCallout && <RichTextBubbleCallout />}
      {bubbleColumns && <RichTextBubbleColumns />}

      {/* Advanced Bubble Menus */}
      {bubbleDrawer && <RichTextBubbleDrawer />}
      {bubbleExcalidraw && <RichTextBubbleExcalidraw />}
      {bubbleIframe && <RichTextBubbleIframe />}
      {bubbleKatex && <RichTextBubbleKatex />}
      {bubbleImageGif && <RichTextBubbleImageGif />}
      {bubbleMermaid && <RichTextBubbleMermaid />}
      {bubbleTwitter && <RichTextBubbleTwitter />}

      {/* Slash Command & Drag Handle */}
      {slashCommand && <SlashCommandList />}
      {dragHandle && <RichTextBubbleMenuDragHandle />}
    </>
  );
};
export type { EditorFeaturesProps } from "./types";

import type { EditorFeaturesProps } from "./types";

export const DEFAULT_FEATURES: EditorFeaturesProps = {
  // Essential features (always useful)
  bubbleLink: false,
  bubbleImage: false,
  bubbleTable: false,
  bubbleText: false,
  dragHandle: false,

  // Optional but useful
  bubbleVideo: false,
  slashCommand: false,
  bubbleCallout: false,

  // Advanced features (disabled by default)
  bubbleColumns: false,
  bubbleDrawer: false,
  bubbleExcalidraw: false,
  bubbleKatex: false,
  bubbleMermaid: false,
  bubbleTwitter: false,
  bubbleIframe: false,
  bubbleImageGif: false,
};

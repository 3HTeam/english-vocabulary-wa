export interface EditorFeaturesProps {
  // Essential Bubble Menus
  bubbleLink?: boolean; // Link editing bubble (recommended: true)
  bubbleImage?: boolean; // Image editing bubble (recommended: true)
  bubbleVideo?: boolean; // Video editing bubble
  bubbleTable?: boolean; // Table editing bubble (recommended: true)
  bubbleText?: boolean; // Text formatting bubble (recommended: true)

  // Optional Bubble Menus
  bubbleColumns?: boolean; // Column layout bubble
  bubbleCallout?: boolean; // Callout/alert bubble

  // Advanced Features
  slashCommand?: boolean; // Slash command menu (/)
  dragHandle?: boolean; // Drag handle for blocks (recommended: true)

  // Complex Features (usually not needed)
  bubbleDrawer?: boolean; // Drawing feature
  bubbleExcalidraw?: boolean; // Excalidraw integration
  bubbleKatex?: boolean; // Math equations (KaTeX)
  bubbleMermaid?: boolean; // Mermaid diagrams
  bubbleTwitter?: boolean; // Twitter embed
  bubbleIframe?: boolean; // Iframe embed
  bubbleImageGif?: boolean; // GIF picker
}

import { useRef, useState } from "react";

import {
  TextEditor,
  TOOLBAR_GROUPS,
  TOOLBAR_ITEM_KEYS,
  TOOLBAR_PRESETS,
  type TextEditorRef,
} from "@/components/shared/text-editor";
import { useTranslations } from "@/hooks";

// Example 1: Basic Usage
export function BasicExample() {
  const [content, setContent] = useState("");
  const t = useTranslations();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Editor</h3>
      <TextEditor
        value={content}
        onChange={setContent}
        features={{
          dragHandle: true,
          slashCommand: true,
        }}
        placeholder={t("text_editor.placeholder")}
      />
    </div>
  );
}

// Example 2: With Preset
export function PresetExample() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Standard Preset</h3>
      <TextEditor
        value={content}
        onChange={setContent}
        toolbarItems={TOOLBAR_PRESETS.standard}
      />
    </div>
  );
}

// Example 3: Minimal Editor
export function MinimalExample() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Minimal Editor (Comments)</h3>
      <TextEditor
        value={content}
        onChange={setContent}
        toolbarItems={TOOLBAR_PRESETS.standard}
        maxLength={500}
        placeholder="Write a comment..."
      />
    </div>
  );
}

// Example 4: Content Writing
export function ContentExample() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Content Writing</h3>
      <TextEditor
        value={content}
        onChange={setContent}
        toolbarItems={TOOLBAR_PRESETS.content}
        maxLength={700}
        placeholder="Start writing your article..."
      />
    </div>
  );
}

// Example 5: With Ref API
export function RefExample() {
  const [content, setContent] = useState("");
  const editorRef = useRef<TextEditorRef>(null);

  const handleClear = () => {
    editorRef.current?.clear();
  };

  const handleGetContent = () => {
    const html = editorRef.current?.getHTML();
    const text = editorRef.current?.getText();
    alert(`HTML length: ${html?.length}\nText length: ${text?.length}`);
  };

  const handleSetContent = () => {
    editorRef.current?.setContent("<p><strong>Hello World!</strong></p>");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Editor with Ref API</h3>

      <div className="flex gap-2">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-destructive text-destructive-foreground rounded"
        >
          Clear
        </button>
        <button
          onClick={handleGetContent}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Get Content
        </button>
        <button
          onClick={handleSetContent}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
        >
          Set Content
        </button>
      </div>

      <TextEditor
        ref={editorRef}
        value={content}
        onChange={setContent}
        toolbarItems={TOOLBAR_PRESETS.basic}
      />
    </div>
  );
}

// Example 6: Custom Toolbar
export function CustomToolbarExample() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Toolbar Items</h3>
      <TextEditor
        value={content}
        onChange={setContent}
        toolbarItems={[
          ...TOOLBAR_GROUPS.history,
          TOOLBAR_ITEM_KEYS.bold,
          TOOLBAR_ITEM_KEYS.italic,
          TOOLBAR_ITEM_KEYS.underline,
          TOOLBAR_ITEM_KEYS.color,
          TOOLBAR_ITEM_KEYS.highlight,
          TOOLBAR_ITEM_KEYS.link,
          TOOLBAR_ITEM_KEYS.image,
          TOOLBAR_ITEM_KEYS.bulletList,
          TOOLBAR_ITEM_KEYS.orderedList,
        ]}
      />
    </div>
  );
}

// Example 7: Read-Only
export function ReadOnlyExample() {
  const content = `
    <h2>Read-Only Content</h2>
    <p>This editor is <strong>disabled</strong> and shows content in read-only mode.</p>
    <ul>
      <li>No editing allowed</li>
      <li>Toolbar is hidden</li>
      <li>Perfect for displaying formatted content</li>
    </ul>
  `;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Read-Only Viewer</h3>
      <TextEditor value={content} onChange={() => {}} disabled />
    </div>
  );
}

// Example 8: With Upload Handlers
export function UploadExample() {
  const [content, setContent] = useState("");

  const handleImageUpload = async (file: File): Promise<string> => {
    // Simulate upload
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        resolve(url);
      }, 1000);
    });
  };

  const handleVideoUpload = async (file: File): Promise<string> => {
    // Simulate upload
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        resolve(url);
      }, 1000);
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">With Upload Handlers</h3>
      <p className="text-sm text-muted-foreground">
        Try uploading images and videos
      </p>
      <TextEditor
        value={content}
        onChange={setContent}
        onImageUpload={handleImageUpload}
        onVideoUpload={handleVideoUpload}
        toolbarItems={TOOLBAR_PRESETS.advanced}
      />
    </div>
  );
}

// Example 9: All Presets Comparison
export function PresetsComparisonExample() {
  const [minimal, setMinimal] = useState("");
  const [basic, setBasic] = useState("");
  const [standard, setStandard] = useState("");

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Toolbar Presets Comparison</h3>

      <div className="space-y-2">
        <h4 className="font-medium">Minimal</h4>
        <TextEditor
          value={minimal}
          onChange={setMinimal}
          toolbarItems={TOOLBAR_PRESETS.minimal}
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Basic</h4>
        <TextEditor
          value={basic}
          onChange={setBasic}
          toolbarItems={TOOLBAR_PRESETS.basic}
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Standard</h4>
        <TextEditor
          value={standard}
          onChange={setStandard}
          toolbarItems={TOOLBAR_PRESETS.standard}
        />
      </div>
    </div>
  );
}

// Example 10: Form Integration
export function FormExample() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.title) {
      newErrors.title = "Title is required";
    }

    if (!formData.content || formData.content === "<p></p>") {
      newErrors.content = "Content is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Form submitted successfully!");
    console.log(formData);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Form Integration</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
          {errors.title && (
            <p className="text-sm text-destructive mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <TextEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            toolbarItems={TOOLBAR_PRESETS.content}
            maxLength={700}
          />
          {errors.content && (
            <p className="text-sm text-destructive mt-1">{errors.content}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// Example 11: Minimal Features (Clean UI)
export function MinimalFeaturesExample() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Minimal Features</h3>
      <p className="text-sm text-muted-foreground">
        Only essential features: text formatting, links, and images
      </p>
      <TextEditor
        value={content}
        onChange={setContent}
        toolbarItems={TOOLBAR_PRESETS.basic}
        placeholder="Clean and simple editor..."
      />
    </div>
  );
}

export function CustomFeaturesExample() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-4">
      <TextEditor
        value={content}
        onChange={setContent}
        toolbarItems={TOOLBAR_PRESETS.standard}
        features={{
          // Essential
          bubbleLink: true,
          bubbleImage: true,
          bubbleTable: true,
          bubbleText: true,
          dragHandle: true,

          // Optional but useful
          bubbleVideo: true,
          slashCommand: true,
          bubbleCallout: true,

          // Advanced features (disabled by default)
          bubbleColumns: true,
          bubbleDrawer: true,
          bubbleExcalidraw: true,
          bubbleKatex: true,
          bubbleMermaid: true,
          bubbleTwitter: true,
          bubbleIframe: true,
          bubbleImageGif: true,
        }}
        placeholder="Editor with custom features..."
      />
    </div>
  );
}

// Example 14: Comment Editor (Ultra Minimal)
export function CommentEditorExample() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-4">
      <TextEditor
        value={content}
        onChange={setContent}
        features={{
          bubbleText: true,
          bubbleLink: true,
          // Disable everything else
          bubbleImage: false,
          bubbleVideo: false,
          bubbleTable: false,
          slashCommand: false,
          dragHandle: false,
        }}
        maxLength={500}
        placeholder="Write a comment..."
      />
    </div>
  );
}

// Example 15: Using Toolbar Constants and Groups
export function ToolbarConstantsExample() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-4">
      <TextEditor
        value={content}
        onChange={setContent}
        toolbarItems={[
          TOOLBAR_ITEM_KEYS.undo,
          TOOLBAR_ITEM_KEYS.redo,
          ...TOOLBAR_GROUPS.textStyle,
        ]}
        placeholder="Type-safe toolbar configuration..."
      />
    </div>
  );
}

"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  BasicExample,
  CommentEditorExample,
  ContentExample,
  CustomFeaturesExample,
  CustomToolbarExample,
  FormExample,
  MinimalExample,
  MinimalFeaturesExample,
  PresetExample,
  PresetsComparisonExample,
  ReadOnlyExample,
  RefExample,
  ToolbarConstantsExample,
  UploadExample,
} from "./examples";

export default function TextEditorPage() {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="container mx-auto p-6 space-y-6">

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="minimal">Minimal</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="ref">Ref API</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          <TabsTrigger value="constants">Constants</TabsTrigger>
          <TabsTrigger value="readonly">Read-Only</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="comparison">Compare</TabsTrigger>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        {/* Basic Example */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
              <CardDescription>
                The simplest way to use the text editor with default settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BasicExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { TextEditor } from "@/components/shared/text-editor";
import { useState } from "react";

function MyComponent() {
  const [content, setContent] = useState("");

  return (
    <TextEditor 
      value={content} 
      onChange={setContent} 
    />
  );
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preset Example */}
        <TabsContent value="presets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Toolbar Presets</CardTitle>
              <CardDescription>
                Choose from pre-configured toolbar layouts for different use
                cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PresetExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Badge>minimal</Badge>
                  <p className="text-sm text-muted-foreground">
                    Bold, Italic, Underline, Link
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge>basic</Badge>
                  <p className="text-sm text-muted-foreground">
                    + Undo/Redo, Lists
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge>standard</Badge>
                  <p className="text-sm text-muted-foreground">
                    + Formatting, Colors
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge>advanced</Badge>
                  <p className="text-sm text-muted-foreground">
                    + Media, Tables, Layout
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge>content</Badge>
                  <p className="text-sm text-muted-foreground">
                    Content writing focused
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge>comment</Badge>
                  <p className="text-sm text-muted-foreground">
                    Comment/Note focused
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { TextEditor, TOOLBAR_PRESETS } from "@/components/shared/text-editor";

<TextEditor
  value={content}
  onChange={setContent}
  toolbarItems={TOOLBAR_PRESETS.standard}
/>`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Minimal Example */}
        <TabsContent value="minimal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Minimal Editor</CardTitle>
              <CardDescription>
                Perfect for comments, notes, or simple text input with character
                limit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MinimalExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<TextEditor
  value={content}
  onChange={setContent}
  toolbarItems={TOOLBAR_PRESETS.minimal}
  maxLength={500}
  placeholder="Write a comment..."
/>`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Example */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Writing</CardTitle>
              <CardDescription>
                Optimized for blog posts, articles, and long-form content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Headings (H1-H6)</li>
                <li>Bold, Italic formatting</li>
                <li>Links and Images</li>
                <li>Lists (bullet, ordered)</li>
                <li>Blockquotes and Code blocks</li>
                <li>Character count with limit</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ref API Example */}
        <TabsContent value="ref" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ref API</CardTitle>
              <CardDescription>
                Access editor methods imperatively using React refs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RefExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    getHTML()
                  </code>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get editor content as HTML string
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    getText()
                  </code>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get editor content as plain text
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    setContent(html)
                  </code>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set editor content programmatically
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    clear()
                  </code>
                  <p className="text-sm text-muted-foreground mt-1">
                    Clear all editor content
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    focus()
                  </code>
                  <p className="text-sm text-muted-foreground mt-1">
                    Focus the editor
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    blur()
                  </code>
                  <p className="text-sm text-muted-foreground mt-1">
                    Blur the editor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Custom Toolbar Example */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Toolbar</CardTitle>
              <CardDescription>
                Build your own toolbar by selecting specific items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomToolbarExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { TOOLBAR_ITEM_KEYS as K } from "@/components/shared/text-editor";

<TextEditor
  toolbarItems={[
    K.undo,
    K.redo,
    K.bold,
    K.italic,
    K.underline,
    K.color,
    K.highlight,
    K.link,
    K.image,
    K.bulletList,
    K.orderedList,
  ]}
/>`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Toolbar Constants Example */}
        <TabsContent value="constants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Toolbar Constants</CardTitle>
              <CardDescription>
                Use TOOLBAR_ITEM_KEYS constants for type-safe toolbar
                configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ToolbarConstantsExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Use Constants?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">✅ Type Safety</h4>
                  <p className="text-sm text-muted-foreground">
                    TypeScript will catch typos at compile time
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💡 Autocomplete</h4>
                  <p className="text-sm text-muted-foreground">
                    Your IDE will suggest available toolbar items
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔄 Refactoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Easy to rename items across the codebase
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📖 Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    Clear list of all available toolbar items
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Using Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { TOOLBAR_GROUPS } from '@/components/shared/text-editor';

<TextEditor
  toolbarItems={[
    ...TOOLBAR_GROUPS.history,      // undo, redo
    ...TOOLBAR_GROUPS.textFormat,   // bold, italic, underline, strike
    ...TOOLBAR_GROUPS.lists,        // bulletList, orderedList, taskList
  ]}
/>`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Read-Only Example */}
        <TabsContent value="readonly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Read-Only Mode</CardTitle>
              <CardDescription>
                Display formatted content without editing capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReadOnlyExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Display blog posts or articles</li>
                <li>Show formatted documentation</li>
                <li>Preview mode in editors</li>
                <li>Email or message viewers</li>
                <li>Content approval workflows</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Example */}
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Handlers</CardTitle>
              <CardDescription>
                Handle image and video uploads with custom logic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const handleImageUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  
  const { url } = await response.json();
  return url;
};

<TextEditor
  onImageUpload={handleImageUpload}
  onVideoUpload={handleVideoUpload}
/>`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Example */}
        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Presets Comparison</CardTitle>
              <CardDescription>
                Compare different toolbar presets side by side
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PresetsComparisonExample />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Form Example */}
        <TabsContent value="form" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Form Integration</CardTitle>
              <CardDescription>
                Integrate the editor with forms and validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Validate content length using getText() method</li>
                <li>Check for empty content (not just empty HTML tags)</li>
                <li>Debounce validation to avoid performance issues</li>
                <li>Show clear error messages to users</li>
                <li>Consider using form libraries like react-hook-form</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Configuration */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Features Configuration</CardTitle>
              <CardDescription>
                Control which bubble menus and advanced features are enabled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Minimal Features</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Only essential features for a clean, simple editor
                  </p>
                  <MinimalFeaturesExample />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Custom Features</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pick and choose exactly which features you need
                  </p>
                  <CustomFeaturesExample />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Comment Editor</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ultra minimal for comments - no images or complex features
                  </p>
                  <CommentEditorExample />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Essential Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <Badge variant="default">bubbleText</Badge> - Text
                      formatting
                    </li>
                    <li>
                      <Badge variant="default">bubbleLink</Badge> - Link editing
                    </li>
                    <li>
                      <Badge variant="default">bubbleImage</Badge> - Image
                      editing
                    </li>
                    <li>
                      <Badge variant="default">bubbleTable</Badge> - Table
                      editing
                    </li>
                    <li>
                      <Badge variant="default">dragHandle</Badge> - Drag blocks
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Optional Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <Badge variant="secondary">bubbleVideo</Badge> - Video
                      editing
                    </li>
                    <li>
                      <Badge variant="secondary">bubbleCallout</Badge> -
                      Callout/alerts
                    </li>
                    <li>
                      <Badge variant="secondary">bubbleColumns</Badge> - Column
                      layout
                    </li>
                    <li>
                      <Badge variant="secondary">slashCommand</Badge> - Slash
                      menu (/)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Advanced Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <Badge variant="outline">bubbleKatex</Badge> - Math
                      equations
                    </li>
                    <li>
                      <Badge variant="outline">bubbleMermaid</Badge> - Diagrams
                    </li>
                    <li>
                      <Badge variant="outline">bubbleExcalidraw</Badge> -
                      Drawings
                    </li>
                    <li>
                      <Badge variant="outline">bubbleDrawer</Badge> - Drawing
                      tool
                    </li>
                    <li>
                      <Badge variant="outline">bubbleTwitter</Badge> - Twitter
                      embeds
                    </li>
                    <li>
                      <Badge variant="outline">bubbleIframe</Badge> - Iframe
                      embeds
                    </li>
                    <li>
                      <Badge variant="outline">bubbleImageGif</Badge> - GIF
                      picker
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<TextEditor 
  features={{
    // Essential
    bubbleText: true,
    bubbleLink: true,
    bubbleImage: true,
    
    // Optional
    bubbleVideo: true,
    slashCommand: true,
    
    // Disable advanced
    bubbleKatex: false,
    bubbleMermaid: false,
  }}
/>`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

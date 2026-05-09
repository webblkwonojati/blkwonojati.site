"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, Quote, Heading1, Heading2, Heading3,
  Link as LinkIcon, Image as ImageIcon, Undo, Redo,
  Type, AlignLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuButton = ({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  children,
  title
}: { 
  onClick: () => void; 
  isActive?: boolean; 
  disabled?: boolean; 
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      "w-9 h-9 flex items-center justify-center rounded-lg transition-all",
      isActive 
        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}
  >
    {children}
  </button>
);

export default function TiptapEditor({ content, onChange, placeholder = "Mulai menulis..." }: TiptapEditorProps) {
  const extensions = useMemo(() => [
    StarterKit.configure(),
    Underline.configure(),
    Link.configure({ openOnClick: false }),
    Image.configure(),
    Placeholder.configure({
      placeholder: placeholder || "Mulai menulis...",
    }),
  ], []);

  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none focus:outline-none min-h-[400px] p-6 lg:p-8 text-slate-700 leading-relaxed font-sans",
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL Gambar:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt("URL Link:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="w-full border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm transition-all focus-within:border-primary/20 focus-within:ring-4 focus-within:ring-primary/5">
      {/* Premium Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50/50 border-b border-slate-100 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-1 pr-2 mr-2 border-r border-slate-200">
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 pr-2 mr-2 border-r border-slate-200">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 pr-2 mr-2 border-r border-slate-200">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Ordered List"
          >
            <ListOrdered className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 pr-2 mr-2 border-r border-slate-200">
          <MenuButton onClick={setLink} isActive={editor.isActive("link")} title="Link">
            <LinkIcon className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={addImage} title="Image">
            <ImageIcon className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
            <Undo className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
            <Redo className="w-4 h-4" />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="relative">
        <EditorContent editor={editor} />
        
        {/* Helper Styling for Tiptap specific classes */}
        <style dangerouslySetInnerHTML={{ __html: `
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #cbd5e1;
            pointer-events: none;
            height: 0;
          }
          .ProseMirror blockquote {
            border-left: 4px solid #5ca25a;
            padding-left: 1rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #64748b;
          }
          .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; }
          .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; }
          .ProseMirror img { border-radius: 1rem; max-width: 100%; height: auto; margin: 1rem 0; }
          .ProseMirror a { color: #5ca25a; text-decoration: underline; cursor: pointer; }
        ` }} />
      </div>
    </div>
  );
}

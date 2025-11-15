'use client';

import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmojiPicker from 'emoji-picker-react';
import styles from './editor.module.css';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image', 'video'],
    ['emoji'],
    ['clean']
  ],
};

const formats = [
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'header', 'list',
  'color', 'background',
  'link', 'image', 'video'
];

export default function EditorComponent() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef<any>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current?.getEditor();
    if (!editor) return;

    const handleBeforeChange = (delta: any, oldDelta: any, source: string) => {
      if (source !== 'user') return;

      // Check for :: pattern for emoji trigger
      const text = editor.getText();
      const selection = editor.getSelection();
      if (selection && selection.index >= 2) {
        const lastChars = text.substring(selection.index - 2, selection.index);
        if (lastChars === '::') {
          // Show emoji picker
          const bounds = editor.getBounds(selection.index);
          setEmojiPickerPosition({
            top: bounds.bottom + 10,
            left: bounds.left,
          });
          setShowEmojiPicker(true);
        }
      }
    };

    const quill = editor;
    quill.on('text-change', handleBeforeChange);

    return () => {
      quill.off('text-change', handleBeforeChange);
    };
  }, []);

  const handleEmojiClick = (emojiObject: any) => {
    const editor = editorRef.current?.getEditor();
    if (editor) {
      const selection = editor.getSelection();
      if (selection) {
        // Remove the '::' that triggered the emoji picker
        editor.deleteText(selection.index - 2, 2);
        editor.insertText(selection.index - 2, emojiObject.emoji);
      }
    }
    setShowEmojiPicker(false);
  };

  const handleImageResize = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Show loading state
      const uploadingText = 'Uploading image...';
      const editor = editorRef.current?.getEditor();
      if (editor) {
        const selection = editor.getSelection();
        editor.insertText(selection?.index || 0, uploadingText);
      }

      // Upload to server
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Upload failed: ${error.error || 'Unknown error'}`);
        // Remove loading text
        if (editor) {
          const index = editor.getSelection()?.index || 0;
          editor.deleteText(Math.max(0, index - uploadingText.length), uploadingText.length);
        }
        return;
      }

      const { url } = await response.json();

      if (editor) {
        const selection = editor.getSelection();
        const index = selection?.index || 0;
        // Remove loading text
        editor.deleteText(Math.max(0, index - uploadingText.length), uploadingText.length);
        // Insert image
        editor.insertEmbed(index - uploadingText.length, 'image', url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    try {
      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          excerpt: content.substring(0, 200),
          author: 'Admin',
        }),
      });

      if (response.ok) {
        alert('Blog published successfully!');
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Error publishing:', error);
    }
  };

  return (
    <div className={styles.editor}>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.titleInput}
      />

      <div className={styles.toolbarExtras}>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={styles.emojiBtn}
          title="Add emoji (or type :: in editor)"
        >
          😊
        </button>
        <label className={styles.imageLabel}>
          🖼️ Insert Image
          <input type="file" accept="image/*" onChange={handleImageResize} hidden />
        </label>
      </div>

      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className={styles.emojiPickerContainer}
          style={{
            position: 'absolute',
            top: `${emojiPickerPosition.top}px`,
            left: `${emojiPickerPosition.left}px`,
            zIndex: 1000,
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <ReactQuill
        ref={editorRef}
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Start writing your blog post... (Type :: to insert emoji)"
        className={styles.quill}
      />

      <div className={styles.actions}>
        <button onClick={handlePublish} className={styles.publishBtn}>
          Publish Blog
        </button>
      </div>
    </div>
  );
}

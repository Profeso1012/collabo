'use client';

import { useState, useRef } from 'react';
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
  const editorRef = useRef<any>(null);

  const handleEmojiClick = (emojiObject: any) => {
    const editor = editorRef.current?.getEditor();
    if (editor) {
      const selection = editor.getSelection();
      editor.insertText(selection?.index || 0, emojiObject.emoji);
    }
    setShowEmojiPicker(false);
  };

  const handleImageResize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Store image with metadata for resizing
          const editor = editorRef.current?.getEditor();
          if (editor) {
            const selection = editor.getSelection();
            editor.insertEmbed(selection?.index || 0, 'image', reader.result as string);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
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
          title="Add emoji"
        >
          😊
        </button>
        <label className={styles.imageLabel}>
          🖼️ Insert Image
          <input type="file" accept="image/*" onChange={handleImageResize} hidden />
        </label>
      </div>

      {showEmojiPicker && (
        <div className={styles.emojiPickerContainer}>
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
        placeholder="Start writing your blog post..."
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

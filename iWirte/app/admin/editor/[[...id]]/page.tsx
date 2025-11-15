'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditorPage({ params }: { params: { id?: string[] } }) {
  const router = useRouter();
  const blogId = params.id?.[0];
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`);
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setFeaturedImage(data.featured_image || '');
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        setFeaturedImage(url);
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!blogId) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async (publish: boolean) => {
    if (!title || !content || !excerpt) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const publishDate = publish ? new Date().toISOString() : null;
      
      const response = await fetch('/api/admin/blogs', {
        method: blogId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blogId,
          title,
          slug,
          excerpt,
          content,
          featured_image: featuredImage || null,
          published_at: publishDate,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Only notify subscribers if publishing for the first time
        if (publish && publishDate) {
          await fetch('/api/admin/notify-subscribers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              blogTitle: title,
              blogSlug: slug,
            }),
          });
        }

        alert(publish ? 'Blog post published successfully!' : 'Draft saved successfully!');
        router.push('/admin');
      } else {
        const errorData = await response.json();
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to save blog:', error);
      alert('Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const container = editor.root;
      
      let resizer: HTMLDivElement | null = null;
      let currentImg: HTMLImageElement | null = null;
      
      const createResizer = (img: HTMLImageElement) => {
        if (resizer) resizer.remove();
        
        resizer = document.createElement('div');
        resizer.className = 'image-resizer';
        resizer.style.cssText = `
          position: absolute;
          border: 2px solid #800020;
          pointer-events: none;
        `;
        
        const handles = ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'];
        handles.forEach(pos => {
          const handle = document.createElement('div');
          handle.className = `resize-handle resize-${pos}`;
          handle.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: #800020;
            border: 2px solid white;
            pointer-events: all;
            cursor: ${pos.includes('n') || pos.includes('s') ? 'ns' : pos.includes('e') || pos.includes('w') ? 'ew' : 'nwse'}-resize;
          `;
          
          if (pos.includes('n')) handle.style.top = '-5px';
          if (pos.includes('s')) handle.style.bottom = '-5px';
          if (pos.includes('e')) handle.style.right = '-5px';
          if (pos.includes('w')) handle.style.left = '-5px';
          if (!pos.includes('n') && !pos.includes('s')) handle.style.top = '50%';
          if (!pos.includes('e') && !pos.includes('w')) handle.style.left = '50%';
          
          handle.addEventListener('mousedown', (e) => startResize(e, img, pos));
          resizer!.appendChild(handle);
        });
        
        container.appendChild(resizer);
        updateResizerPosition(img);
      };
      
      const updateResizerPosition = (img: HTMLImageElement) => {
        if (!resizer) return;
        const rect = img.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        resizer.style.left = `${rect.left - containerRect.left + container.scrollLeft}px`;
        resizer.style.top = `${rect.top - containerRect.top + container.scrollTop}px`;
        resizer.style.width = `${rect.width}px`;
        resizer.style.height = `${rect.height}px`;
      };
      
      const startResize = (e: MouseEvent, img: HTMLImageElement, handle: string) => {
        e.preventDefault();
        e.stopPropagation();
        
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = img.offsetWidth;
        const startHeight = img.offsetHeight;
        const aspectRatio = startWidth / startHeight;
        
        const doResize = (e: MouseEvent) => {
          let newWidth = startWidth;
          let newHeight = startHeight;
          
          if (handle.includes('e')) newWidth = startWidth + (e.clientX - startX);
          if (handle.includes('w')) newWidth = startWidth - (e.clientX - startX);
          if (handle.includes('s')) newHeight = startHeight + (e.clientY - startY);
          if (handle.includes('n')) newHeight = startHeight - (e.clientY - startY);
          
          if (handle.length === 1) {
            if (handle === 'e' || handle === 'w') {
              newHeight = newWidth / aspectRatio;
            } else {
              newWidth = newHeight * aspectRatio;
            }
          }
          
          img.style.width = `${Math.max(50, newWidth)}px`;
          img.style.height = 'auto';
          updateResizerPosition(img);
        };
        
        const stopResize = () => {
          document.removeEventListener('mousemove', doResize);
          document.removeEventListener('mouseup', stopResize);
        };
        
        document.addEventListener('mousemove', doResize);
        document.addEventListener('mouseup', stopResize);
      };
      
      container.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG') {
          currentImg = target as HTMLImageElement;
          createResizer(currentImg);
        } else if (!target.closest('.image-resizer')) {
          if (resizer) resizer.remove();
          currentImg = null;
        }
      });
    }
  }, [quillRef.current]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#FAF3EA' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: '#B88E2F' }}>
            {blogId ? 'Edit Post' : 'Create New Post'}
          </h1>
          <button
            onClick={() => router.push('/admin')}
            className="hover:opacity-80 transition-all font-semibold"
            style={{ color: '#B88E2F' }}
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#B88E2F' }}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
              placeholder="Enter post title..."
              style={{ '--tw-ring-color': '#B88E2F' } as React.CSSProperties}
              onFocus={(e) => e.currentTarget.style.borderColor = '#B88E2F'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#B88E2F' }}>
              Slug (URL)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
              placeholder="post-url-slug"
              onFocus={(e) => e.currentTarget.style.borderColor = '#B88E2F'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#B88E2F' }}>
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none resize-none"
              placeholder="Brief description of the post..."
              onFocus={(e) => e.currentTarget.style.borderColor = '#B88E2F'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 px-4 py-3 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-all">
                <span className="text-gray-600">
                  {uploadingImage ? 'Uploading...' : 'Choose Image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
              {featuredImage && (
                <div className="flex-1">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="max-h-32 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
            {featuredImage && (
              <p className="text-xs text-gray-500 mt-2">Image uploaded successfully</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <div className="rich-text-editor border border-gray-300 rounded-lg relative">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                placeholder="Write your blog post content here..."
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              💡 Tip: Click on an image to select it, then drag the corner to resize
            </p>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex-1 bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex-1 bg-maroon text-white px-8 py-4 rounded-lg font-semibold hover:bg-maroon-light transition-all disabled:opacity-50"
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

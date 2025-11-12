'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminLogout from '@/components/AdminLogout';
import styles from './admin.module.css';

type Blog = {
  id: string;
  title: string;
  slug: string;
  published_at: string;
  likes: number;
  loves: number;
  dislikes: number;
};

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <div className={styles.actions}>
            <Link href="/admin/editor" className={styles.createButton}>
              ✎ Create New Post
            </Link>
            <AdminLogout />
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading blog posts...</div>
        ) : blogs.length === 0 ? (
          <div className={styles.noBlogsMessage}>
            <p>No blog posts yet. Create your first post to get started!</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Published</th>
                <th>Engagement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <Link href={`/blog/${blog.slug}`} className={styles.blogTitle}>
                      {blog.title}
                    </Link>
                  </td>
                  <td className={styles.publishDate}>
                    {format(new Date(blog.published_at), 'MMM dd, yyyy')}
                  </td>
                  <td>
                    <div className={styles.engagement}>
                      <span>👍 {blog.likes}</span>
                      <span>❤ {blog.loves}</span>
                      <span>👎 {blog.dislikes}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Link href={`/admin/editor/${blog.id}`} className={styles.editButton}>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
}

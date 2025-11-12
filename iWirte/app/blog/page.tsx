'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogSearch from '@/components/BlogSearch';
import { createClient } from '@/lib/supabase';
import styles from './blog.module.css';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
  author: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, created_at, author')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
        setFilteredPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (query: string, dateFilter?: string) => {
    let filtered = posts;

    if (query) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((post) =>
        post.created_at.startsWith(dateFilter)
      );
    }

    setFilteredPosts(filtered);
  };

  return (
    <>
      <Navbar />
      <main className={styles.blogPage}>
        <section className={styles.blogHeader}>
          <div className={styles.container}>
            <h1>Blog</h1>
            <p>Insights, experiences, and knowledge from our writing journey</p>
          </div>
        </section>

        <div className={styles.container}>
          <BlogSearch onSearch={handleSearch} />

          {loading ? (
            <div className={styles.loading}>Loading posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div className={styles.noPosts}>No blog posts found</div>
          ) : (
            <div className={styles.postsList}>
              {filteredPosts.map((post) => (
                <article key={post.id} className={styles.postCard}>
                  <Link href={`/blog/${post.slug}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <p className={styles.meta}>
                    {new Date(post.created_at).toLocaleDateString()} • By {post.author}
                  </p>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read More →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

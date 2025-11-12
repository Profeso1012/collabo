'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BlogSearch from '@/components/BlogSearch';
import { supabase } from '@/lib/supabase';
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
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, created_at, author');

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
      // ... (Your existing query filtering logic)
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (dateFilter) {
      const now = new Date();
      let cutoffDate = new Date(now);

      // Calculate the cutoff date based on the filter string
      if (dateFilter === 'week') {
        cutoffDate.setDate(now.getDate() - 7);
      } else if (dateFilter === 'month') {
        cutoffDate.setMonth(now.getMonth() - 1);
      } else if (dateFilter === 'year') {
        cutoffDate.setFullYear(now.getFullYear() - 1);
      }

      // Filter posts created AFTER the cutoff date
      filtered = filtered.filter((post) => {
        const postDate = new Date(post.created_at);
        return postDate >= cutoffDate; // Only keep posts newer than the cutoff
      });
    }

    setFilteredPosts(filtered);
  };

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setEmail('');
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <>
      {/*<Navbar />*/}
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

        {/* Newsletter Section */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <h2>Never Miss a Post</h2>
            <p>Subscribe to get new articles delivered to your inbox</p>
            {subscribed && (
              <div className={styles.successMessage}>
                ✓ Successfully subscribed! Check your email for confirmation.
              </div>
            )}
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSignup}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={subscribed}
              />
              <button type="submit" className={styles.subscribeBtn} disabled={subscribed}>
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </section>
      </main>
      {/*<Footer />*/}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import BlogNavbar from "@/components/BlogNavbar";
import BlogFooter from "@/components/BlogFooter";
import styles from './blog.module.css';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  created_at: string;
}

type ViewMode = 'grid' | 'list';
type TimeFilter = 'all' | 'week' | 'month' | 'year';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, slug, excerpt, featured_image, created_at')
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

  useEffect(() => {
    filterPosts();
  }, [searchQuery, timeFilter, posts]);

  const filterPosts = () => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (timeFilter) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(post => new Date(post.created_at) >= cutoffDate);
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 1) return [1];
    
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage === 1) {
        pages.push(1, 2, 3);
      } else if (currentPage === totalPages) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage, currentPage + 1, currentPage + 2 <= totalPages ? currentPage + 2 : totalPages);
      }
    }
    
    return pages;
  };

  const handleReaction = async (postId: string, reaction: 'like' | 'love') => {
    try {
      const response = await fetch('/api/blog/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId: postId, reactionType: reaction }),
      });
      
      if (response.ok) {
        console.log(`${reaction} registered`);
      }
    } catch (error) {
      console.error('Reaction error:', error);
    }
  };

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/blog/${slug}`;
    if (navigator.share) {
      navigator.share({
        title: 'Check out this blog post',
        url: url,
      }).catch(() => {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <BlogNavbar />
      
      <main className={styles.blogPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/9e49dcaf5e4e4432d24340132ccef5037868fd5b?width=2880" 
            alt="Blog Hero"
            className={styles.heroImage}
          />
          <div className={styles.heroContent}>
            <h1>Blogs</h1>
            <div className={styles.breadcrumb}>
              <Link href="/blog-home">Home</Link>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black"/>
              </svg>
              <span>iWrite</span>
            </div>
          </div>
        </section>

        {/* Controls Bar */}
        <section className={styles.controlsBar}>
          <div className={styles.viewToggles}>
            <button 
              className={viewMode === 'grid' ? styles.active : ''}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M18.6668 22.1666C17.7386 22.1666 16.8483 21.7978 16.192 21.1415C15.5356 20.4851 15.1668 19.5948 15.1668 18.6666C15.1668 17.7383 15.5356 16.8481 16.192 16.1917C16.8483 15.5353 17.7386 15.1666 18.6668 15.1666C19.5951 15.1666 20.4853 15.5353 21.1417 16.1917C21.7981 16.8481 22.1668 17.7383 22.1668 18.6666C22.1668 19.5948 21.7981 20.4851 21.1417 21.1415C20.4853 21.7978 19.5951 22.1666 18.6668 22.1666ZM9.3335 22.1666C8.40524 22.1666 7.515 21.7978 6.85862 21.1415C6.20225 20.4851 5.8335 19.5948 5.8335 18.6666C5.8335 17.7383 6.20225 16.8481 6.85862 16.1917C7.515 15.5353 8.40524 15.1666 9.3335 15.1666C10.2618 15.1666 11.152 15.5353 11.8084 16.1917C12.4647 16.8481 12.8335 17.7383 12.8335 18.6666C12.8335 19.5948 12.4647 20.4851 11.8084 21.1415C11.152 21.7978 10.2618 22.1666 9.3335 22.1666ZM18.6668 12.8333C17.7386 12.8333 16.8483 12.4645 16.192 11.8081C15.5356 11.1517 15.1668 10.2615 15.1668 9.33325C15.1668 8.40499 15.5356 7.51476 16.192 6.85838C16.8483 6.202 17.7386 5.83325 18.6668 5.83325C19.5951 5.83325 20.4853 6.202 21.1417 6.85838C21.7981 7.51476 22.1668 8.40499 22.1668 9.33325C22.1668 10.2615 21.7981 11.1517 21.1417 11.8081C20.4853 12.4645 19.5951 12.8333 18.6668 12.8333ZM9.3335 12.8333C8.40524 12.8333 7.515 12.4645 6.85862 11.8081C6.20225 11.1517 5.8335 10.2615 5.8335 9.33325C5.8335 8.40499 6.20225 7.51476 6.85862 6.85838C7.515 6.202 8.40524 5.83325 9.3335 5.83325C10.2618 5.83325 11.152 6.202 11.8084 6.85838C12.4647 7.51476 12.8335 8.40499 12.8335 9.33325C12.8335 10.2615 12.4647 11.1517 11.8084 11.8081C11.152 12.4645 10.2618 12.8333 9.3335 12.8333Z" fill="black"/>
              </svg>
            </button>
            <button 
              className={viewMode === 'list' ? styles.active : ''}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4.5 6.75H19.5C20.2956 6.75 21.0587 7.06607 21.6213 7.62868C22.1839 8.19129 22.5 8.95435 22.5 9.75V14.25C22.5 15.0456 22.1839 15.8087 21.6213 16.3713C21.0587 16.9339 20.2956 17.25 19.5 17.25H4.5C3.70435 17.25 2.94129 16.9339 2.37868 16.3713C1.81607 15.8087 1.5 15.0456 1.5 14.25V9.75C1.5 8.95435 1.81607 8.19129 2.37868 7.62868C2.94129 7.06607 3.70435 6.75 4.5 6.75V6.75ZM4.5 8.25C4.10218 8.25 3.72064 8.40804 3.43934 8.68934C3.15804 8.97064 3 9.35218 3 9.75V14.25C3 14.6478 3.15804 15.0294 3.43934 15.3107C3.72064 15.592 4.10218 15.75 4.5 15.75H19.5C19.8978 15.75 20.2794 15.592 20.5607 15.3107C20.842 15.0294 21 14.6478 21 14.25V9.75C21 9.35218 20.842 8.97064 20.5607 8.68934C20.2794 8.40804 19.8978 8.25 19.5 8.25H4.5ZM1.5 3C1.5 2.80109 1.57902 2.61032 1.71967 2.46967C1.86032 2.32902 2.05109 2.25 2.25 2.25H21.75C21.9489 2.25 22.1397 2.32902 22.2803 2.46967C22.421 2.61032 22.5 2.80109 22.5 3C22.5 3.19891 22.421 3.38968 22.2803 3.53033C22.1397 3.67098 21.9489 3.75 21.75 3.75H2.25C2.05109 3.75 1.86032 3.67098 1.71967 3.53033C1.57902 3.38968 1.5 3.19891 1.5 3V3ZM1.5 21C1.5 20.8011 1.57902 20.6103 1.71967 20.4697C1.86032 20.329 2.05109 20.25 2.25 20.25H21.75C21.9489 20.25 22.1397 20.329 22.2803 20.4697C22.421 20.6103 22.5 20.8011 22.5 21C22.5 21.1989 22.421 21.3897 22.2803 21.5303C22.1397 21.671 21.9489 21.75 21.75 21.75H2.25C2.05109 21.75 1.86032 21.671 1.71967 21.5303C1.57902 21.3897 1.5 21.1989 1.5 21V21Z" fill="black"/>
              </svg>
            </button>
          </div>

          <div className={styles.searchInput}>
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.showControl}>
            <span>Show</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => setItemsPerPage(Math.min(9, Number(e.target.value)))}
            >
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
            </select>
          </div>

          <div className={styles.sortControl}>
            <span>Short by</span>
            <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}>
              <option value="all">All time</option>
              <option value="week">Past week</option>
              <option value="month">Past month</option>
              <option value="year">Past year</option>
            </select>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className={styles.postsSection}>
          {loading ? (
            <div className={styles.loading}>Loading posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div className={styles.noPosts}>No blog posts found</div>
          ) : (
            <div className={`${styles.postsGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
              {currentPosts.map((post, index) => {
                const postNumber = filteredPosts.length - (startIndex + index);
                const isHovered = hoveredPostId === post.id;
                
                return (
                  <article 
                    key={post.id} 
                    className={styles.postCard}
                    onMouseEnter={() => setHoveredPostId(post.id)}
                    onMouseLeave={() => setHoveredPostId(null)}
                  >
                    <div className={styles.postImage}>
                      <img 
                        src={post.featured_image || 'https://api.builder.io/api/v1/image/assets/TEMP/242d08d68f1c43f0f6a534efb9335fa0199c7e3f?width=760'} 
                        alt={post.title}
                      />
                      <div className={styles.postNumber}>{postNumber}</div>
                      
                      {isHovered && (
                        <div className={styles.hoverOverlay}>
                          <Link href={`/blog/${post.slug}`} className={styles.readBlogBtn}>
                            Read Blog
                          </Link>
                          <div className={styles.actions}>
                            <button onClick={() => handleShare(post.slug)}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12 10.6666C11.4747 10.6666 11 10.8733 10.644 11.2046L5.94 8.46658C5.97333 8.31325 6 8.15992 6 7.99992C6 7.83992 5.97333 7.68658 5.94 7.53325L10.64 4.79325C11 5.12659 11.4733 5.33325 12 5.33325C13.1067 5.33325 14 4.43992 14 3.33325C14 2.22659 13.1067 1.33325 12 1.33325C10.8933 1.33325 10 2.22659 10 3.33325C10 3.49325 10.0267 3.64658 10.06 3.79992L5.36 6.53992C5 6.20659 4.52667 5.99992 4 5.99992C2.89333 5.99992 2 6.89325 2 7.99992C2 9.10659 2.89333 9.99992 4 9.99992C4.52667 9.99992 5 9.79325 5.36 9.45992L10.0587 12.2053C10.0211 12.3562 10.0014 12.511 10 12.6666C10 13.0621 10.1173 13.4488 10.3371 13.7777C10.5568 14.1066 10.8692 14.363 11.2346 14.5143C11.6001 14.6657 12.0022 14.7053 12.3902 14.6282C12.7781 14.551 13.1345 14.3605 13.4142 14.0808C13.6939 13.8011 13.8844 13.4447 13.9616 13.0568C14.0387 12.6688 13.9991 12.2667 13.8478 11.9012C13.6964 11.5358 13.44 11.2234 13.1111 11.0036C12.7822 10.7839 12.3956 10.6666 12 10.6666Z" fill="white"/>
                              </svg>
                              <span>Share</span>
                            </button>
                            <button onClick={() => handleReaction(post.id, 'like')}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M10.0799 7L11.0799 8L14.5199 4.55L10.9999 1L9.99992 2L11.7999 3.8H1.99992V5.2H11.8199L10.0799 7ZM5.85992 9L4.85992 8L1.41992 11.5L4.90992 15L5.90992 14L4.09992 12.2H13.9999V10.8H4.09992L5.85992 9Z" fill="white"/>
                              </svg>
                              <span>Like</span>
                            </button>
                            <button onClick={() => handleReaction(post.id, 'love')}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.99949 14.0361C-5.33358 6.66669 3.99975 -1.33331 7.99949 3.72539C11.9998 -1.33331 21.3331 6.66669 7.99949 14.0361Z" stroke="white" strokeWidth="1.8"/>
                              </svg>
                              <span>Love</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.postInfo}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                      <p className={styles.postDate}>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 0 && (
          <section className={styles.pagination}>
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                className={`${styles.pageBtn} ${currentPage === pageNum ? styles.active : ''}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                className={styles.nextBtn}
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-label="Next page"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </section>
        )}

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.feature}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M49.3547 3.51562C48.0744 3.51562 46.8741 3.86121 45.839 4.46156V1.75781C45.839 0.787031 45.052 0 44.0812 0H15.9562C14.9853 0 14.1983 0.787031 14.1983 1.75781V4.48301C13.155 3.8693 11.941 3.51562 10.6455 3.51562C6.76848 3.51562 3.61426 6.66984 3.61426 10.5469C3.61426 13.5041 4.49059 16.3615 6.14844 18.8102C8.97078 22.9789 12.4511 24.0607 15.331 25.2127C16.9916 29.348 20.3496 32.6252 24.5384 34.1769L23.2422 42.4219H22.9875C20.0797 42.4219 17.714 44.7875 17.714 47.6953V56.4844H15.9562C14.9854 56.4844 14.1984 57.2714 14.1984 58.2422C14.1984 59.213 14.9854 60 15.9562 60H44.0812C45.052 60 45.839 59.213 45.839 58.2422C45.839 57.2714 45.052 56.4844 44.0812 56.4844H42.3234V47.6953C42.3234 44.7875 39.9577 42.4219 37.05 42.4219H36.7952L35.4991 34.177C39.6941 32.623 43.0558 29.3386 44.7139 25.1948C47.4344 24.1066 51.0005 23.0217 53.8518 18.8102C55.5097 16.3615 56.386 13.504 56.386 10.5469C56.3859 6.66984 53.2317 3.51562 49.3547 3.51562ZM14.1853 20.968C9.89926 19.2536 7.12988 15.1631 7.12988 10.5469C7.12988 8.60836 8.70699 7.03125 10.6455 7.03125C12.584 7.03125 14.1611 8.60836 14.1611 10.5469C14.1611 10.6705 14.1741 10.791 14.1984 10.9073V19.3359C14.1984 19.9009 14.2288 20.4588 14.2869 21.0087L14.1853 20.968ZM38.8078 56.4844H21.2296V52.9688H38.8078V56.4844ZM37.05 45.9375C38.0192 45.9375 38.8078 46.7261 38.8078 47.6953V49.4531H21.2296V47.6953C21.2296 46.7261 22.0182 45.9375 22.9875 45.9375C23.9411 45.9375 34.8134 45.9375 37.05 45.9375ZM26.801 42.4219L27.9642 35.023C28.6368 35.1107 29.3225 35.1562 30.0187 35.1562C30.7149 35.1562 31.4006 35.1105 32.0732 35.023L33.2364 42.4219H26.801ZM42.3234 19.3359C42.3234 26.1207 36.8035 31.6406 30.0187 31.6406C23.2339 31.6406 17.714 26.1207 17.714 19.3359V10.5469H42.3234V19.3359ZM42.3234 7.03125H17.714V3.51562H42.3234V7.03125ZM45.8148 20.968L45.7523 20.993C45.8093 20.4483 45.8389 19.8955 45.8389 19.3359V10.5469C45.839 8.60836 47.4161 7.03125 49.3547 7.03125C51.2932 7.03125 52.8703 8.60836 52.8703 10.5469C52.8703 15.1631 50.1009 19.2537 45.8148 20.968Z" fill="#242424"/>
            </svg>
            <div>
              <h3>Top Memes</h3>
              <p>Internets's finest</p>
            </div>
          </div>

          <div className={styles.feature}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <g clipPath="url(#clip0_11_315)">
                <path d="M56.786 21.2611C55.9943 18.8096 56.3318 15.1295 54.274 12.2881C52.2 9.42425 48.5929 8.61027 46.556 7.12058C44.5406 5.6466 42.6656 2.43906 39.2755 1.33281C35.981 0.25773 32.6121 1.7166 30 1.7166C27.3882 1.7166 24.0196 0.257378 20.7245 1.33269C17.335 2.43871 15.4584 5.64695 13.4443 7.12023C11.4097 8.60816 7.79988 9.42437 5.72625 12.2877C3.6702 15.1268 4.0043 18.8153 3.21398 21.261C2.46188 23.5887 0 26.3823 0 30.0002C0 33.6202 2.45906 36.403 3.21398 38.7392C4.0057 41.1907 3.6682 44.8708 5.72602 47.7122C7.79988 50.5762 11.4069 51.39 13.444 52.8798C15.459 54.3536 17.3344 57.5614 20.7245 58.6675C24.0168 59.7419 27.3909 58.2837 30 58.2837C32.6054 58.2837 35.9875 59.7403 39.2755 58.6676C42.6652 57.5616 44.5405 54.3541 46.5557 52.8801C48.5903 51.3921 52.2001 50.5759 54.2737 47.7126C56.3299 44.8734 55.9956 41.1852 56.786 38.7393C57.5381 36.4115 60 33.6178 60 30.0002C60 26.3803 57.5415 23.5983 56.786 21.2611V21.2611ZM52.3257 37.2979C51.4029 40.1543 51.6446 43.3511 50.4775 44.9629C49.2946 46.5961 46.1869 47.3421 43.7889 49.0962C41.4171 50.8307 39.7548 53.5803 37.8214 54.2111C35.9924 54.808 33.0116 53.596 30.0001 53.596C26.9666 53.596 24.0165 54.8106 22.1787 54.2111C20.2455 53.5803 18.5856 50.8326 16.2112 49.0961C13.8274 47.3527 10.702 46.5913 9.52254 44.9627C8.3591 43.3562 8.59172 40.1373 7.67449 37.298C6.77543 34.5161 4.6875 32.1073 4.6875 30.0002C4.6875 27.8909 6.77355 25.4904 7.67426 22.7024C8.59711 19.8461 8.35535 16.6491 9.52254 15.0374C10.7047 13.4052 13.8148 12.6568 16.2112 10.9041C18.5905 9.16398 20.2424 6.42097 22.1784 5.78921C24.006 5.19296 26.9965 6.40433 29.9999 6.40433C33.0389 6.40433 35.9816 5.18886 37.8213 5.78921C39.7542 6.41992 41.4156 9.16867 43.7889 10.9042C46.1723 12.6476 49.298 13.409 50.4775 15.0375C51.6411 16.6443 51.4072 19.8599 52.3255 22.7022V22.7023C53.2246 25.4842 55.3125 27.893 55.3125 30.0002C55.3125 32.1094 53.2264 34.5099 52.3257 37.2979V37.2979ZM40.798 22.4773C41.7134 23.3927 41.7134 24.8766 40.798 25.7918L29.0668 37.523C28.1515 38.4384 26.6674 38.4382 25.7522 37.523L19.2021 30.9729C18.2868 30.0576 18.2866 28.5736 19.202 27.6584C20.1173 26.7432 21.6015 26.743 22.5165 27.6584L27.4095 32.5512L37.4832 22.4774C38.3986 21.5621 39.8827 21.5621 40.798 22.4773V22.4773Z" fill="#242424"/>
              </g>
              <defs>
                <clipPath id="clip0_11_315">
                  <rect width="60" height="60" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <div>
              <h3>100% Originality</h3>
              <p>pure drafts</p>
            </div>
          </div>

          <div className={styles.feature}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M55.3479 31.102V3.77976C55.3479 2.80502 54.5577 2.01477 53.5829 2.01477H6.29511C5.32036 2.01477 4.53012 2.80502 4.53012 3.77976V33.2801C3.67869 33.4042 2.84632 33.7347 2.10997 34.2814C-0.211348 35.9274 -0.760378 39.6111 1.18405 41.8828L9.13392 51.5205C14.0549 57.2799 19.2825 57.9855 27.0539 57.9855C33.7228 57.9855 36.7044 58.015 42.5165 56.6906L48.176 55.337C49.0936 56.6185 50.5505 57.4486 52.1883 57.4486H54.9762C57.7463 57.4486 60 55.0745 60 52.1562V36.3785C60.0001 33.5921 57.9449 31.3032 55.3479 31.102ZM47.4147 34.7327L45.063 33.5383C41.1964 31.5866 36.7259 31.5143 32.7982 33.3404C31.7266 33.7619 29.3894 35.176 28.1771 35.1287H20.0167C17.3099 35.1287 15.1077 37.3308 15.1077 40.0377V41.3249C15.0925 41.3089 15.0766 41.2937 15.0617 41.2774L9.23429 34.9521C8.88164 34.5693 8.48546 34.249 8.06022 33.992V16.4811H22.5041V22.9511C22.5041 23.9258 23.2943 24.7161 24.2691 24.7161H35.4063C36.381 24.7161 37.1712 23.9258 37.1712 22.9511V16.4811H51.8181V31.1019C49.7559 31.2612 48.0363 32.7365 47.4147 34.7327V34.7327ZM26.0339 16.4811H33.6412V21.1861H26.0339V16.4811ZM51.818 12.9511H37.1712V5.54475H51.8181V12.9511H51.818ZM33.6413 5.54475V12.9512H26.034V5.54475H33.6413ZM22.504 5.54475V12.9512H8.0601V5.54475H22.504ZM41.6973 53.2569C36.3282 54.4866 33.0946 54.4368 27.1172 54.4368C19.8219 54.4368 16.297 54.3189 11.8572 49.2741L3.90731 39.6365C2.5245 37.8358 5.02914 35.7102 6.63811 37.3436L12.4655 43.6691C14.0056 45.2942 15.9437 46.1886 18.3325 46.2412H34.4889C35.4637 46.2412 36.2539 45.4509 36.2539 44.4762C36.2539 43.5014 35.4637 42.7112 34.4889 42.7112H18.6376V40.0375C18.6376 39.2771 19.2561 38.6584 20.0166 38.6584H28.177C30.0154 38.7901 32.6689 37.255 34.2863 36.5411C37.228 35.1734 40.5763 35.2275 43.4684 36.6873L47.1647 38.5648V51.949L41.6973 53.2569ZM56.4701 52.1561C56.4701 53.1279 55.8 53.9185 54.9763 53.9185H52.1884C51.3647 53.9185 50.6947 53.1279 50.6947 52.1561V36.3785C50.6947 35.4067 51.3648 34.616 52.1884 34.616H54.9763C55.8 34.616 56.4701 35.4066 56.4701 36.3785V52.1561Z" fill="#242424"/>
            </svg>
            <div>
              <h3>Shared Insights</h3>
              <p>real experiences</p>
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />
    </>
  );
}

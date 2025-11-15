'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import BlogNavbar from '@/components/BlogNavbar';
import BlogFooter from '@/components/BlogFooter';
import styles from './blog-home.module.css';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  created_at: string;
}

const PLACEHOLDER_POSTS = [
  {
    id: '1',
    title: 'Inner Peace',
    slug: 'inner-peace',
    excerpt: '',
    featured_image: 'https://api.builder.io/api/v1/image/assets/TEMP/0d531b182086ae2884767e4c254239bf334be327?width=808',
    created_at: '2025-11-01'
  },
  {
    id: '2',
    title: '',
    slug: 'post-2',
    excerpt: '',
    featured_image: 'https://api.builder.io/api/v1/image/assets/TEMP/eb372cc3522a0eaa7cf66b405615f661669ca5cc?width=744',
    created_at: 'No date'
  },
  {
    id: '3',
    title: '',
    slug: 'post-3',
    excerpt: '',
    featured_image: 'https://api.builder.io/api/v1/image/assets/TEMP/18982a8b83a3ac25f63a7e624af2d92ce7c750ff?width=744',
    created_at: 'No date'
  },
  {
    id: '4',
    title: '',
    slug: 'post-4',
    excerpt: '',
    featured_image: 'https://api.builder.io/api/v1/image/assets/TEMP/445c0e1093a71bc686ef2ea9b9c8db156272baad?width=754',
    created_at: 'No date'
  },
  {
    id: '5',
    title: '',
    slug: 'post-5',
    excerpt: '',
    featured_image: 'https://api.builder.io/api/v1/image/assets/TEMP/cbddb60b9f52f3a9129ab1861cf1cf10fdea37a9?width=754',
    created_at: 'No date'
  }
];

export default function BlogHomePage() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, slug, excerpt, featured_image, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        
        if (data && data.length >= 5) {
          setLatestPosts(data);
        } else {
          setLatestPosts(PLACEHOLDER_POSTS);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLatestPosts(PLACEHOLDER_POSTS);
      }
    };

    fetchLatestPosts();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % latestPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + latestPosts.length) % latestPosts.length);
  };

  return (
    <>
      <BlogNavbar />
      
      <main className={styles.blogHome}>
        <section className={styles.hero}>
          <div className={styles.heroImage}>
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/c27fbc899849064013e341710b529e9ad4039ac3?width=2880" 
              alt="Blog Hero Background"
            />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroCard}>
              <span className={styles.heroLabel}>My Blog</span>
              <h1 className={styles.heroTitle}>
                Insights & experiences from my writing journey
              </h1>
              <p className={styles.heroSubtitle}>
                Pieces from my keep notes—no rules, just genuine, informal takes on life, work, and everything in between.
              </p>
              <Link href="/blog" className={styles.heroButton}>
                READ NOW
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.characteristicsSection}>
          <div className={styles.characteristicsHeader}>
            <h2>Not Your Regular Blog</h2>
            <p>What you'll find woven into the fabric of every post</p>
          </div>
          <div className={styles.characteristicsGrid}>
            <div className={styles.characteristicItem}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/445c0e1093a71bc686ef2ea9b9c8db156272baad?width=754" 
                alt="Insightful"
              />
              <h3>Insightful</h3>
            </div>
            <div className={styles.characteristicItem}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/cbddb60b9f52f3a9129ab1861cf1cf10fdea37a9?width=754" 
                alt="Uncensored"
              />
              <h3>Uncensored</h3>
            </div>
            <div className={styles.characteristicItem}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/fe18b3f0174200483981dd01d4926900da13f9ce?width=754" 
                alt="Fun"
              />
              <h3>Fun</h3>
            </div>
          </div>
        </section>

        <section className={styles.latestPostsSection}>
          <div className={styles.latestPostsContent}>
            <div className={styles.latestPostsText}>
              <h2>New Reads: What's Been on My Mind Lately</h2>
              <p>Freshly written thoughts, musings, and lessons learned from the chaos of life. Find your next scroll-stopper here</p>
              <Link href="/blog" className={styles.viewMoreBtn}>
                View More
              </Link>
            </div>

            <div className={styles.carouselContainer}>
              <div className={styles.carousel} style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}>
                {latestPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className={`${styles.carouselItem} ${index === currentSlide ? styles.active : ''}`}
                  >
                    <Link href={post.slug !== 'inner-peace' && post.title ? `/blog/${post.slug}` : '#'}>
                      <img 
                        src={post.featured_image || 'https://picsum.photos/400/600'} 
                        alt={post.title || 'Blog post'}
                      />
                      {index === currentSlide && post.title && (
                        <div className={styles.carouselOverlay}>
                          <div className={styles.carouselMeta}>
                            <span>01</span>
                            <div className={styles.metaDivider}></div>
                            <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                          </div>
                          <h3>{post.title}</h3>
                          {post.slug !== 'inner-peace' && (
                            <div className={styles.carouselArrow}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20.3906 12H2.91284M20.3906 12L14.5647 6M20.3906 12L14.5647 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
              </div>

              <div className={styles.carouselControls}>
                <button onClick={prevSlide} className={styles.carouselPrev} aria-label="Previous">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5L16 12L9 19" stroke="#B88E2F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className={styles.carouselIndicators}>
                  {latestPosts.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />
    </>
  );
}

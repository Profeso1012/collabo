'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        alert('Subscribed successfully!');
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        {/* Hero Section - Google Chrome Pattern */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Getting information doesn't have to be boring
            </h1>
            <p className={styles.heroSubtitle}>
              Professional writing services that make learning engaging. From thesis work to copywriting,
              we create content that informs, inspires, and captivates.
            </p>
            <div className={styles.ctaButtons}>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                Explore Services
              </button>
              <button className={`${styles.button} ${styles.buttonSecondary}`}>
                Learn More
              </button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imagePlaceholder} style={{ background: 'linear-gradient(135deg, #A8D8EA, #F5F5F0)' }}>
              <img src="https://picsum.photos/500/400?random=1" alt="iWrite Services" />
            </div>
          </div>
        </section>

        {/* Services Preview Section */}
        <section className={styles.servicesSection}>
          <div className="chr-grid-default-parent">
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <div className={styles.servicesGrid}>
              {/*
                { title: 'Thesis & Projects', desc: 'Expertly crafted academic writing' },
                { title: 'Copywriting', desc: 'Compelling marketing content' },
                { title: 'Synopsis Writing', desc: 'Concise topic summaries' },
                { title: 'Fiction Writing', desc: 'Original creative stories' }
              */}
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="chr-card-adaptive">
                    <div className={styles.serviceIcon} style={{ background: `hsl(${(i * 90) % 360}, 70%, 85%)` }} />
                    <div className="chr-card-adaptive__content-wrapper">
                      <h3 className={styles.serviceTitle}>Service Title</h3>
                      <p className="chr-copy">Service description goes here.</p>
                    </div>
                  </div>
                ))}
            </div>
            <Link href="/services" className={styles.viewAllLink}>
              View All Services →
            </Link>
          </div>
        </section>

        {/* Newsletter Section - Google Banner Pattern */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <h2>Stay Updated</h2>
            <p>Get notified when we publish new articles and insights</p>
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSignup}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.subscribeBtn}>
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

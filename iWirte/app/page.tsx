'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('subscribed') === 'true') {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
    }
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
      <Navbar />
      <main style={{ paddingTop: '0' }}>
        {/* Hero Section with Video Embed */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Getting information doesn't have to be boring
            </h1>
            <p className={styles.heroSubtitle}>
              At iWrite, we believe learning should be engaging, fun, and professionally crafted.
              From academic thesis to creative fiction, copywriting to compelling synopsis—we make
              every word count. Professional writing with a human touch.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/services" className={`${styles.button} ${styles.buttonPrimary}`}>
                Explore Services
              </Link>
              <Link href="/contact" className={`${styles.button} ${styles.buttonSecondary}`}>
                Get Started
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imagePlaceholder}>
              <iframe
                src="https://giphy.com/embed/26uf6EAcWDkNkyCVa"
                width="100%"
                height="100%"
                style={{ border: 'none', borderRadius: '12px' }}
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Why Choose iWrite Section */}
        <section className={styles.whySection}>
          <div className="chr-grid-default-parent">
            <h2 className={styles.sectionTitle}>Why Choose iWrite?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>✦</div>
                <h3>Professional Quality</h3>
                <p>Every piece is crafted by experienced writers who understand your needs</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>✓</div>
                <h3>Engaging Content</h3>
                <p>We make learning fun while maintaining professional and formal standards</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>◆</div>
                <h3>Timely Delivery</h3>
                <p>Your deadline is our priority. We deliver on time, every time</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>★</div>
                <h3>100% Original</h3>
                <p>Unique, plagiarism-free content tailored specifically to your requirements</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview Section */}
        <section className={styles.servicesSection}>
          <div className="chr-grid-default-parent">
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <p className={styles.sectionDescription}>
              Comprehensive writing solutions for every need
            </p>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon} style={{ background: 'linear-gradient(135deg, #A8D8EA 0%, #87CEEB 100%)' }} />
                <h3 className={styles.serviceTitle}>Academic Writing</h3>
                <p className={styles.serviceDesc}>Thesis, dissertations & research papers</p>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon} style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)' }} />
                <h3 className={styles.serviceTitle}>Copywriting</h3>
                <p className={styles.serviceDesc}>Marketing & web content that converts</p>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon} style={{ background: 'linear-gradient(135deg, #8B3A3A 0%, #A0002F 100%)' }} />
                <h3 className={styles.serviceTitle}>Synopsis Writing</h3>
                <p className={styles.serviceDesc}>Concise summaries for any topic</p>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon} style={{ background: 'linear-gradient(135deg, #F5F5F0 0%, #DAA520 100%)' }} />
                <h3 className={styles.serviceTitle}>Fiction Writing</h3>
                <p className={styles.serviceDesc}>Creative stories with compelling narratives</p>
              </div>
            </div>
            <div className={styles.viewAllLinkContainer}>
              <Link href="/services" className={styles.viewAllLink}>
                Explore All Services →
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section - Google Banner Pattern */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <h2>Stay in the Loop</h2>
            <p>Get insights, writing tips, and updates from the iWrite blog</p>
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
      <Footer />
    </>
  );
}

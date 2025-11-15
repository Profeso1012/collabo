'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './BlogFooter.module.css';

export default function BlogFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
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
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3 className={styles.brandName}>
            <span className={styles.brandI}>i</span>Write
          </h3>
        </div>

        <div className={styles.links}>
          <h4 className={styles.linksTitle}>Links</h4>
          <Link href="/blog-home" className={styles.link}>Home</Link>
          <Link href="/blog" className={styles.link}>Blogs</Link>
        </div>

        <div className={styles.newsletter}>
          <h4 className={styles.newsletterTitle}>Newsletter</h4>
          <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
              required
              disabled={subscribed}
            />
            <button 
              type="submit" 
              className={styles.subscribeBtn}
              disabled={subscribed}
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.copyright}>
        <p>2024 iWrite. All rights reserved</p>
      </div>
    </footer>
  );
}

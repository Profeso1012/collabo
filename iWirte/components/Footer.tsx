'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4>iWrite</h4>
          <p>Professional writing services for students and businesses</p>
        </div>

        <div className={styles.column}>
          <h5>Services</h5>
          <Link href="/services">View All</Link>
          <Link href="/services">Thesis & Projects</Link>
          <Link href="/services">Copywriting</Link>
        </div>

        <div className={styles.column}>
          <h5>Company</h5>
          <Link href="/">Home</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/careers">Careers</Link>
        </div>

        <div className={styles.column}>
          <h5>Blog</h5>
          <p>Personal insights and writing tips</p>
          <Link href="/blog" className={styles.blogLink}>
            Read the Blog →
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2024 iWrite. All rights reserved.</p>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './BlogNavbar.module.css';

export default function BlogNavbar() {
  const [activeLink, setActiveLink] = useState('');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/blog-home" className={styles.logo}>
          <Image 
            src="/image.png" 
            alt="iWrite Blog Logo" 
            width={205} 
            height={80}
            className={styles.logoImage}
          />
        </Link>
        
        <nav className={styles.nav}>
          <Link 
            href="/blog-home" 
            className={`${styles.navLink} ${activeLink === 'home' ? styles.active : ''}`}
            onMouseEnter={() => setActiveLink('home')}
            onMouseLeave={() => setActiveLink('')}
          >
            Home
          </Link>
          <Link 
            href="/blog" 
            className={`${styles.navLink} ${activeLink === 'blog' ? styles.active : ''}`}
            onMouseEnter={() => setActiveLink('blog')}
            onMouseLeave={() => setActiveLink('')}
          >
            Blog
          </Link>
        </nav>

        <div className={styles.headerIcons}>
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15.5832V8.2915H23.3333V17.0415H21M21 22.8748H23.3333V19.9582H21M9.33333 17.0415C12.4483 17.0415 18.6667 18.9957 18.6667 22.8748V27.2498H0V22.8748C0 18.9957 6.21833 17.0415 9.33333 17.0415ZM9.33333 3.9165C10.571 3.9165 11.758 4.53109 12.6332 5.62505C13.5083 6.71901 14 8.20274 14 9.74984C14 11.2969 13.5083 12.7807 12.6332 13.8746C11.758 14.9686 10.571 15.5832 9.33333 15.5832C8.09566 15.5832 6.90867 14.9686 6.0335 13.8746C5.15833 12.7807 4.66667 11.2969 4.66667 9.74984C4.66667 8.20274 5.15833 6.71901 6.0335 5.62505C6.90867 4.53109 8.09566 3.9165 9.33333 3.9165M9.33333 19.8123C5.86833 19.8123 2.21667 21.9415 2.21667 22.8748V24.479H16.45V22.8748C16.45 21.9415 12.7983 19.8123 9.33333 19.8123M9.33333 6.68734C8.68355 6.68734 8.06039 7.00999 7.60092 7.58432C7.14146 8.15865 6.88333 8.93761 6.88333 9.74984C6.88333 10.5621 7.14146 11.341 7.60092 11.9154C8.06039 12.4897 8.68355 12.8123 9.33333 12.8123C9.98311 12.8123 10.6063 12.4897 11.0657 11.9154C11.5252 11.341 11.7833 10.5621 11.7833 9.74984C11.7833 8.93761 11.5252 8.15865 11.0657 7.58432C10.6063 7.00999 9.98311 6.68734 9.33333 6.68734V6.68734Z" fill="black"/>
          </svg>
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M95.1667 28.7083L89.933 22.1546M92.8333 13.3958C92.8333 16.6834 91.7885 19.8363 89.9288 22.161C88.0691 24.4857 85.5467 25.7917 82.9167 25.7917C80.2866 25.7917 77.7643 24.4857 75.9045 22.161C74.0448 19.8363 73 16.6834 73 13.3958C73 10.1083 74.0448 6.95533 75.9045 4.63066C77.7643 2.30599 80.2866 1 82.9167 1C85.5467 1 88.0691 2.30599 89.9288 4.63066C91.7885 6.95533 92.8333 10.1083 92.8333 13.3958V13.3958Z" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M151.542 2.45825C148.436 2.45825 145.917 5.68992 145.917 9.677C145.917 12.8955 146.901 20.5343 156.591 28.2562C156.765 28.3931 156.964 28.4655 157.167 28.4655C157.37 28.4655 157.569 28.3931 157.743 28.2562C167.433 20.5343 168.417 12.8955 168.417 9.677C168.417 5.68992 165.898 2.45825 162.792 2.45825C159.686 2.45825 157.167 6.83325 157.167 6.83325C157.167 6.83325 154.648 2.45825 151.542 2.45825Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </header>
  );
}

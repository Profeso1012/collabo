'use client';

import { useState, useEffect } from 'react';
import styles from './WelcomeModal.module.css';

export default function WelcomeModal({ blogId }: { blogId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(`blog_modal_${blogId}`);
    if (!seen) {
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, [blogId]);

  const handleContinue = () => {
    localStorage.setItem(`blog_modal_${blogId}`, 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div 
        className={styles.backdrop}
        onClick={handleContinue}
      />
      
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.iconWrapper}>
            <svg className={styles.waveIcon} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4C17.088 4 5 16.088 5 31C5 45.912 17.088 58 32 58C46.912 58 59 45.912 59 31C59 16.088 46.912 4 32 4ZM42.5 24.5C42.5 23.672 43.172 23 44 23C44.828 23 45.5 23.672 45.5 24.5V30.5C45.5 31.328 44.828 32 44 32C43.172 32 42.5 31.328 42.5 30.5V24.5ZM38 27.5C38 26.672 38.672 26 39.5 26C40.328 26 41 26.672 41 27.5V33.5C41 34.328 40.328 35 39.5 35C38.672 35 38 34.328 38 33.5V27.5ZM33.5 30C33.5 29.172 34.172 28.5 35 28.5C35.828 28.5 36.5 29.172 36.5 30V36C36.5 36.828 35.828 37.5 35 37.5C34.172 37.5 33.5 36.828 33.5 36V30ZM29 32.5C29 31.672 29.672 31 30.5 31C31.328 31 32 31.672 32 32.5V38.5C32 39.328 31.328 40 30.5 40C29.672 40 29 39.328 29 38.5V32.5ZM24.5 35C24.5 34.172 25.172 33.5 26 33.5C26.828 33.5 27.5 34.172 27.5 35V41C27.5 41.828 26.828 42.5 26 42.5C25.172 42.5 24.5 41.828 24.5 41V35Z" fill="#B88E2F"/>
            </svg>
          </div>
          
          <h2 className={styles.modalTitle}>
            Thanks for stopping by!
          </h2>
          
          <p className={styles.modalText}>
            Do leave a <span className={styles.heartIcon}>❤️</span> like and drop a <span className={styles.commentIcon}>💬</span> comment if you enjoy the read
          </p>
          
          <div className={styles.newsletterPrompt}>
            <p>
              You can also subscribe to the newsletter <span className={styles.mailIcon}>📩</span> so you never miss new posts and updates.
            </p>
          </div>
          
          <button
            onClick={handleContinue}
            className={styles.continueButton}
          >
            Continue Reading
          </button>
          
          <button
            onClick={handleContinue}
            className={styles.dismissButton}
          >
            Don't show this again
          </button>
        </div>
      </div>
    </div>
  );
}

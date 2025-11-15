'use client';

import { useState, useEffect } from 'react';
import styles from './BlogReactions.module.css';

type Props = {
  blogId: string;
  initialLikes: number;
  initialLoves: number;
  initialDislikes: number;
};

export default function BlogReactions({ blogId, initialLikes, initialLoves, initialDislikes }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [loves, setLoves] = useState(initialLoves);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userReaction, setUserReaction] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`blog_reaction_${blogId}`);
    if (stored) {
      setUserReaction(stored);
    }
  }, [blogId]);

  const handleReaction = async (type: 'like' | 'love' | 'dislike') => {
    const previousReaction = userReaction;

    if (previousReaction === type) {
      try {
        const response = await fetch('/api/blog/react', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ blogId, type, action: 'remove' }),
        });

        if (response.ok) {
          if (type === 'like') setLikes(prev => Math.max(0, prev - 1));
          if (type === 'love') setLoves(prev => Math.max(0, prev - 1));
          if (type === 'dislike') setDislikes(prev => Math.max(0, prev - 1));
          setUserReaction(null);
          localStorage.removeItem(`blog_reaction_${blogId}`);
        }
      } catch (error) {
        console.error('Failed to remove reaction:', error);
      }
      return;
    }

    try {
      const response = await fetch('/api/blog/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          blogId, 
          type, 
          previousReaction,
          action: previousReaction ? 'change' : 'add'
        }),
      });

      if (response.ok) {
        if (previousReaction === 'like') setLikes(prev => Math.max(0, prev - 1));
        if (previousReaction === 'love') setLoves(prev => Math.max(0, prev - 1));
        if (previousReaction === 'dislike') setDislikes(prev => Math.max(0, prev - 1));

        if (type === 'like') setLikes(prev => prev + 1);
        if (type === 'love') setLoves(prev => prev + 1);
        if (type === 'dislike') setDislikes(prev => prev + 1);

        setUserReaction(type);
        localStorage.setItem(`blog_reaction_${blogId}`, type);
      }
    } catch (error) {
      console.error('Failed to react:', error);
    }
  };

  return (
    <div className={styles.reactionsContainer}>
      <button
        onClick={() => handleReaction('like')}
        className={`${styles.reactionButton} ${userReaction === 'like' ? styles.active : styles.inactive}`}
      >
        <svg className={styles.reactionIcon} fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        <span className={styles.reactionCount}>{likes}</span>
      </button>

      <button
        onClick={() => handleReaction('love')}
        className={`${styles.reactionButton} ${userReaction === 'love' ? styles.active : styles.inactive}`}
      >
        <svg className={styles.reactionIcon} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        <span className={styles.reactionCount}>{loves}</span>
      </button>

      <button
        onClick={() => handleReaction('dislike')}
        className={`${styles.reactionButton} ${userReaction === 'dislike' ? styles.activeDislike : styles.inactive}`}
      >
        <svg className={styles.reactionIcon} fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
        </svg>
        <span className={styles.reactionCount}>{dislikes}</span>
      </button>
    </div>
  );
}

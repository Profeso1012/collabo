'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './careers.module.css';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    portfolio: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', expertise: '', portfolio: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.header}>
          <div className={styles.container}>
            <h1 className={styles.headerTitle}>Join Our Team</h1>
            <p className={styles.headerSubtitle}>
              We're always looking for talented writers to join our growing collective of passionate content creators.
            </p>
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.lookingForSection}>
              <h2 className={styles.sectionTitle}>What We're Looking For</h2>
              <div className={styles.lookingForGrid}>
                <div className={styles.lookingForCard}>
                  <div className={styles.lookingForIcon}>📚</div>
                  <div className={styles.lookingForContent}>
                    <h3>Academic Writers</h3>
                    <p>Experience with thesis, dissertations, and research papers</p>
                  </div>
                </div>

                <div className={styles.lookingForCard}>
                  <div className={styles.lookingForIcon}>✍</div>
                  <div className={styles.lookingForContent}>
                    <h3>Copywriters</h3>
                    <p>Skilled in marketing copy, web content, and brand messaging</p>
                  </div>
                </div>

                <div className={styles.lookingForCard}>
                  <div className={styles.lookingForIcon}>📖</div>
                  <div className={styles.lookingForContent}>
                    <h3>Fiction Writers</h3>
                    <p>Creative storytellers with published work or strong portfolios</p>
                  </div>
                </div>

                <div className={styles.lookingForCard}>
                  <div className={styles.lookingForIcon}>⚡</div>
                  <div className={styles.lookingForContent}>
                    <h3>Technical Writers</h3>
                    <p>Ability to simplify complex topics and create clear documentation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.statusSection}>
              <h3 className={styles.statusTitle}>Current Status</h3>
              <div className={styles.statusContent}>
                <p>
                  While we don't have open positions at the moment, we're always interested in connecting with talented writers.
                  Submit your information below, and we'll reach out when opportunities arise.
                </p>
                <p>
                  We're a growing startup of passionate writers, and we're building something special. Join us on this journey!
                </p>
              </div>
            </div>

            <div className={styles.formSection}>
              {submitted && (
                <div className={styles.successMessage}>
                  ✓ Thank you for your interest! We'll be in touch soon.
                </div>
              )}

              <h2 className={styles.formTitle}>Express Your Interest</h2>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Writing Expertise</label>
                  <select
                    required
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    className={styles.select}
                  >
                    <option value="">Select your expertise</option>
                    <option value="academic">Academic Writing</option>
                    <option value="copywriting">Copywriting</option>
                    <option value="fiction">Fiction Writing</option>
                    <option value="technical">Technical Writing</option>
                    <option value="multiple">Multiple Areas</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Portfolio/Website (Optional)</label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    placeholder="https://"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tell Us About Yourself</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={styles.textarea}
                    placeholder="Share your experience, writing samples, and why you'd like to join iWrite..."
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

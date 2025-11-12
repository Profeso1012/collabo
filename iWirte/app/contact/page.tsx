'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.header}>
          <div className={styles.container}>
            <h1 className={styles.headerTitle}>Get In Touch</h1>
            <p className={styles.headerSubtitle}>
              Ready to start your project? We'd love to hear from you. Reach out and let's create something amazing together.
            </p>
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg, #A8D8EA 0%, #87CEEB 100%)' }}>
                  ✉
                </div>
                <h3>Email</h3>
                <p>hello@iwrite.com</p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)' }}>
                  ⏱
                </div>
                <h3>Response Time</h3>
                <p>Within 24 hours</p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg, #8B3A3A 0%, #A0002F 100%)' }}>
                  ✓
                </div>
                <h3>Support</h3>
                <p>Mon-Fri, 9AM-6PM</p>
              </div>
            </div>

            <div className={styles.formSection}>
              {submitted && (
                <div className={styles.successMessage}>
                  ✓ Thank you! We'll get back to you soon.
                </div>
              )}

              <h2 className={styles.formTitle}>Send us your project details</h2>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Your Name</label>
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
                  <label className={styles.label}>Service Interested In</label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={styles.select}
                  >
                    <option value="">Select a service</option>
                    <option value="thesis">Thesis & Dissertation</option>
                    <option value="project">Project Work</option>
                    <option value="copywriting">Copywriting</option>
                    <option value="synopsis">Synopsis Writing</option>
                    <option value="fiction">Fiction Writing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Project Details</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={styles.textarea}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  Send Message
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

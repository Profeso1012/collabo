'use client';

import { useState } from 'react';

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
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-maroon to-light-blue py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Join Our Team</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're always looking for talented writers to join our growing collective.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-maroon mb-6">What We're Looking For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-maroon mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Academic Writers</h3>
                  <p className="text-gray-600">Experience with thesis, dissertations, and research papers</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-maroon mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Copywriters</h3>
                  <p className="text-gray-600">Skilled in marketing copy, web content, and brand messaging</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-maroon mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Fiction Writers</h3>
                  <p className="text-gray-600">Creative storytellers with published work or strong portfolios</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-maroon mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Technical Writers</h3>
                  <p className="text-gray-600">Ability to simplify complex topics and create clear documentation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-light-blue/20 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-maroon mb-4">Current Status</h2>
            <p className="text-gray-700 mb-4">
              While we don't have open positions at the moment, we're always interested in connecting with talented writers. Submit your information below, and we'll reach out when opportunities arise.
            </p>
            <p className="text-gray-600 text-sm">
              We're a growing startup of passionate writers, and we're building something special. Join us on this journey!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                Thank you for your interest! We'll be in touch.
              </div>
            )}

            <h2 className="text-2xl font-bold text-maroon mb-6">Express Your Interest</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Writing Expertise
                </label>
                <select
                  required
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon"
                >
                  <option value="">Select your expertise</option>
                  <option value="academic">Academic Writing</option>
                  <option value="copywriting">Copywriting</option>
                  <option value="fiction">Fiction Writing</option>
                  <option value="technical">Technical Writing</option>
                  <option value="multiple">Multiple Areas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Portfolio/Website (Optional)
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  placeholder="https://"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tell Us About Yourself
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon resize-none"
                  placeholder="Share your experience, writing samples, and why you'd like to join iWrite..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-maroon text-white px-8 py-4 rounded-lg font-semibold hover:bg-maroon-light transition-all transform hover:scale-105"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

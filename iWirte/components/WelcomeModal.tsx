'use client';

import { useState, useEffect } from 'react';

export default function WelcomeModal({ blogId }: { blogId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen modal for this blog
    const seen = localStorage.getItem(`blog_modal_${blogId}`);
    if (!seen) {
      // Show modal after a short delay
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, [blogId]);

  const handleContinue = () => {
    localStorage.setItem(`blog_modal_${blogId}`, 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleContinue}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in-up">
        <div className="text-center">
          {/* Emoji/Icon */}
          <div className="text-6xl mb-4">👋</div>
          
          <h2 className="text-3xl font-bold text-maroon mb-4">
            Thanks for stopping by!
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Do leave a <span className="text-red-500">❤️</span> like and drop a <span className="text-blue-500">💬</span> comment if you enjoy the read
          </p>
          
          <div className="bg-light-blue/20 rounded-lg p-4 mb-6">
            <p className="text-gray-700">
              You can also subscribe to the newsletter <span className="text-maroon">📩</span> so you never miss new posts and updates.
            </p>
          </div>
          
          <button
            onClick={handleContinue}
            className="w-full bg-maroon text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-maroon-light transition-all transform hover:scale-105"
          >
            Continue Reading
          </button>
          
          <button
            onClick={handleContinue}
            className="mt-3 text-sm text-gray-500 hover:text-gray-700"
          >
            Don't show this again
          </button>
        </div>
      </div>
    </div>
  );
}

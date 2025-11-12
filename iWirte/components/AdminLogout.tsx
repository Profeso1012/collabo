'use client';

import { useRouter } from 'next/navigation';

export default function AdminLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-600 hover:text-maroon transition-colors"
    >
      Logout
    </button>
  );
}

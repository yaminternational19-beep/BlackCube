'use client';
import AdminLayout from '@/components/admin/AdminLayout';
import { ContentProvider } from '@/contexts/ContentContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (!token) {
      router.replace('/admin/login');
    }
  }, [router]);

  return (
    <ContentProvider>
      <AdminLayout active="dashboard" />
    </ContentProvider>
  );
}



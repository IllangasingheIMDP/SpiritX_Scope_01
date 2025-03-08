"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/user', {
          credentials: 'include', // Include cookies for authentication
        });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username);
        } else {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies for logout
      });
      router.push('/login');
    } catch (error) {
      console.error('Error logging out');
    }
  };

  if (!username) return null; // Or a loading spinner

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Hello, {username}!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 w-full rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
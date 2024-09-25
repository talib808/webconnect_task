'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleFollow = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to follow users.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}/follow`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to follow user');
      }

      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          MyApp
        </div>
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => handleFollow(2)} // Replace 2 with the ID of the user to follow
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </li>
          <li>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

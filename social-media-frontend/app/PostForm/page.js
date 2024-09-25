'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import PostForm from '../components/PostForm'; 

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts from the API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/posts');
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch posts. Please try again.');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to like posts.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to like post');
      }

      const updatedPost = await res.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handlePostCreated = (data) => {
    setPosts((prevPosts) => [...prevPosts, data]);
    console.log('Post created:', data);
  };

  return (
    <>
      <Navbar />
      <PostForm onPostCreated={handlePostCreated} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="mt-4">
          {posts.map((post) => (
            <div key={post.id} className="border p-4 mb-2 rounded shadow">
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt="Post image"
                  className="mt-2 max-w-full h-auto rounded"
                />
              )}
              <button
                onClick={() => handleLike(post.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded mt-2"
              >
                Like {post.likes ? `(${post.likes})` : ''}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Page;
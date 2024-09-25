'use client'

import { useState } from 'react';
import AuthForm from './components/AuthForm';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import Navbar from './components/Navbar';

const HomePage = () => {
  
  return (
    <div>
      <Navbar />
      <PostForm onPostCreated={(newPost) => console.log(newPost)} />
      <PostList />
    </div>
  );
};

export default HomePage;

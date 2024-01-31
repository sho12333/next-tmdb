'use client';

import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const isAuth = onAuthStateChanged(auth, setUser);
    return () => isAuth();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold mb-4'>プロフィールページ</h1>
      <p className='text-lg text-center'>プロフィールページです。</p>
      <p>メールアドレス: {user.email}</p>
      <p>表示名: {user.displayName}</p>
    </div>
  );
};

export default ProfilePage;

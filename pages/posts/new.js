import React from 'react';
import PostForm from '../../components/PostForm';
import { useAuth } from '../../utils/context/authContext';

export default function NewPost() {
  const { user } = useAuth();
  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <PostForm user={user} />
    </div>
  );
}

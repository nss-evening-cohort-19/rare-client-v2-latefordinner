import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PostForm from '../../../components/PostForm';
import { useAuth } from '../../../utils/context/authContext';
import { getPostById } from '../../../utils/postData';

function EditPost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  console.warn(editPost);
  useEffect(() => {
    getPostById(id).then(setEditPost);
  }, [id]);

  return (
    <div className="edit-form" style={{ height: '45rem', padding: '10%' }}>
      <PostForm user={user} postObj={editPost} />
    </div>
  );
}

export default EditPost;

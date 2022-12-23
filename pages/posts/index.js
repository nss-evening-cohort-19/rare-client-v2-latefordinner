import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PostCard from '../../components/PostCard';
import { useAuth } from '../../utils/context/authContext';
import { getPosts } from '../../utils/postData';

function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  console.warn(posts);

  useEffect(() => {
    getPosts(user.uid).then((setPosts));
  }, []);

  return (
    <article className="games">
      <h1>Posts</h1>
      <h2>
        <Button
          onClick={() => {
            router.push('/posts/new');
          }}
        >
          Create New Post
        </Button>
      </h2>
      {posts.map((post) => (
        <section key={`post--${post.id}`} className="post">
          <PostCard id={post.id} title={post.title} publicationDate={post.publication_date} content={post.content} imageUrl={post.image_url} onUpdate={getPosts} />
        </section>
      ))}
    </article>
  );
}

export default Home;

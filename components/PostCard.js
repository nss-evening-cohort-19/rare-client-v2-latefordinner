import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deletePost } from '../utils/postData';

function PostCard({
  title,
  content,
  publicationDate,
  onUpdate,
  id,
  imageUrl,
}) {
  // const user = useAuth();

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${title}?`)) {
      deletePost(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={imageUrl} alt={title} style={{ height: '300px' }} />
        <Card.Text>Content: {content}</Card.Text>
        <Card.Text>Date: {publicationDate}</Card.Text>
      </Card.Body>
      <Link href={`/posts/edit/${id}`} passHref>
        <Button variant="primary" className="m-2">Edit Post</Button>
      </Link>
      <Button className="delete" onClick={deleteThisPost}>
        DELETE
      </Button>
    </Card>
  );
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  publicationDate: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;

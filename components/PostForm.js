/* eslint-disable import/no-absolute-path */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPost, updatePost } from '../utils/postData';
// import { loginUser } from '../../utils/data/AuthManager';

const initialState = {
  id: null,
  publicationDate: '',
  title: ' ',
  imageUrl: ' ',
  content: ' ',
};

const PostForm = ({ user, postObj }) => {
  const [currentPost, setCurrentPost] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (postObj.id) {
      setCurrentPost(postObj);
    }
  }, [postObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.id) {
      updatePost(user, currentPost, postObj.id).then(() => router.push('/posts'));
    } else {
      createPost(user, currentPost).then(() => router.push('/posts'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentPost.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Publication Date</Form.Label>
          <Form.Control name="publicationDate" type="date" required value={currentPost.publicationDate} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <textarea className="form-control" rows="5" name="content" required value={currentPost.content} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control name="imageUrl" required value={currentPost.imageUrl} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

PostForm.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    publicationDate: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    createdOn: PropTypes.string,
    categoryId: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

PostForm.defaultProps = {
  postObj: initialState,
};

export default PostForm;

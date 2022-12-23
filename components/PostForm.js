/* eslint-disable import/no-absolute-path */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPost, getCategoryTypes, updatePost } from '../utils/postData';
// import { loginUser } from '../../utils/data/AuthManager';

const initialState = {
  id: null,
  publicationDate: '',
  title: ' ',
  imageUrl: ' ',
  content: ' ',
  category: ' ',
};

const PostForm = ({ user, postObj }) => {
  const [currentPost, setCurrentPost] = useState(initialState);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      publication_date: currentPost.publicationDate,
      title: currentPost.title,
      image_url: currentPost.imageUrl,
      content: currentPost.content,
      category: currentPost.category,
      user: user.uid,
    };
    if (postObj.id) {
      updatePost(post, postObj.id).then(() => router.push('/posts'));
    } else {
      createPost(post).then(() => router.push('/posts'));
    }
  };

  useEffect(() => {
    if (postObj.id) {
      const editPost = {
        publicationDate: postObj.publication_date,
        title: postObj.title,
        imageUrl: postObj.image_url,
        content: postObj.content,
        category: postObj.category.id,
      };
      setCurrentPost(editPost);
    }
    getCategoryTypes().then(setCategoryTypes);
  }, [postObj]);

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
          <Form.Select name="category" value={currentPost.category} onChange={handleChange} required>
            <option value="">Select a Category </option>
            {categoryTypes?.map((category) => (
              <option key={category.id} value={category.id} label={category.label} />
            ))};
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

PostForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  postObj: PropTypes.shape({
    id: PropTypes.number,
    publication_date: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    image_url: PropTypes.string,
    createdOn: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
};

PostForm.defaultProps = {
  postObj: initialState,
};

export default PostForm;

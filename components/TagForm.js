/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { addTag, getTags, updateTag } from '../utils/tagData';

const initialState = {
  label: '',
};

function TagForm({ obj }) {
  const [tagForm, setTagForm] = useState(initialState);
  const [tag, setTag] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getTags().then(setTag);
    if (obj.id) setTagForm(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTagForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.warn(tag);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateTag(tagForm)
        .then(() => router.push('/'));
    } else {
      const payload = { ...tagForm };
      addTag(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form className="form-floating" onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.id ? 'Update' : 'Create'} a Tag</h2>
      <FloatingLabel controlId="floatingInput" label="Enter New Tag" className="mb-3">
        <Form.Control type="text" placeholder="Label" name="label" value={tagForm.label} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Tag</Button>
    </Form>
  );
}

TagForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

TagForm.defaultProps = {
  obj: initialState,
};

export default Form;

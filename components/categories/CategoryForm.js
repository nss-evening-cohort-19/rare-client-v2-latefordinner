/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { getCategories, addCategory, updateCategory } from '../../utils/data/categoryData';

const initialState = {
  label: '',
};

function CategoryForm({ obj }) {
  const [categoryForm, setCategoryForm] = useState(initialState);
  const [category, setCategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategory);
    console.warn(category);
    if (obj.id) setCategoryForm(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateCategory(categoryForm)
        .then(() => router.push('/'));
    } else {
      const payload = { ...categoryForm };
      addCategory(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form className="form-floating" onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.id ? 'Update' : 'Create'} a Category</h2>
      <FloatingLabel controlId="floatingInput" label="Enter New Category" className="mb-3">
        <Form.Control type="text" placeholder="Label" name="label" value={categoryForm.label} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Category</Button>
    </Form>
  );
}

CategoryForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  obj: initialState,
};

export default CategoryForm;
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

const initialUserState = {
  firstName: '',
  lastName: '',
  bio: '',
  profileImageUrl: '',
  email: '',
  createdOn: '',
  active: '',
};

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState(initialUserState);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(user, formData).then(() => updateUser(user.uid));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">

        <Form.Control name="firstName" placeholder="First name" required value={formData.firstName} onChange={handleChange} />

        <Form.Control name="lastName" placeholder="Last name" required value={formData.lastName} onChange={handleChange} />

        <Form.Control name="bio" as="textarea" placeholder="Why are you like this?" required value={formData.bio} onChange={handleChange} />

        <Form.Control name="profileImageUrl" placeholder="What look like?" required value={formData.profileImageUrl} onChange={handleChange} />

        <Form.Control name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />

      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;

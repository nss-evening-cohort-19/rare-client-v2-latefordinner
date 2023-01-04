import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

export const getCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/categories/${id}`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/categories`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// export const getCategoriesById = (categoryId) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/categories/${categoryId}`).then((response) => response.json())
//     .then(resolve)
//     .catch(reject);
// });

export const addCategory = (category) => new Promise((resolve, reject) => {
  const categoryObj = {
    label: category.label,
  };
  fetch(`${dbUrl}/categories`, {
    method: 'POST',
    body: JSON.stringify(categoryObj),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((err) => reject(err));
});

export const updateCategory = (category, id) => new Promise((resolve, reject) => {
  const categoryObj = {
    label: category.label,
  };

  fetch(`${dbUrl}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryObj),
  })
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export const deleteCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/categories/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

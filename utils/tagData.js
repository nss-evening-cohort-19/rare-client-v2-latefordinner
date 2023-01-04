import { clientCredentials } from './client';

const getTags = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getTagById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createTag = (tag) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags`, {
    method: 'POST',
    body: JSON.stringify(tag),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateTag = (tag, id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteTag = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const addTag = (tag) => new Promise((resolve, reject) => {
  const tagObj = {
    label: tag.label,
  };
  fetch(`${clientCredentials.databaseURL}/tags`, {
    method: 'POST',
    body: JSON.stringify(tagObj),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((err) => reject(err));
});

// eslint-disable-next-line import/prefer-default-export
export {
  getTags, getTagById, createTag, updateTag, deleteTag, addTag,
};

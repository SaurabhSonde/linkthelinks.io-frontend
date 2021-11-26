const Api = 'http://localhost:5000/api';

export const deleteLink = (linkId, userId, token) => {
  return fetch(`${Api}/delete/link/${linkId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

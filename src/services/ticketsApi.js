import api from './api';

export async function getTicketsTypes(token) {
  const response = await api.post('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
}

// finalizar função post

export async function postTicketsTypes(token) {
  const response = await api.get('/enrollments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return response.data;
}
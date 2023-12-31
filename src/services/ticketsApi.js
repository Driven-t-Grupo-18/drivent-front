import api from './api';

export async function getTickets(token) {
  const response = await api.post('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
}

export async function getTicket(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
}


export async function postTicket(token,body) {
  const response = await api.post('/tickets', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
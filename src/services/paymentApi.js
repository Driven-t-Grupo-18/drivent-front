import api from './api';

export async function process(body, token) {
  console.log(body)
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
};
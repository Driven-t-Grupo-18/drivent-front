import { useContext } from 'react';
import api from '../services/api'

import UserContext from '../contexts/UserContext';

export default function useToken() {
  const { userData: user } = useContext(UserContext);

  return user.token;
}

export async function useTicket(token) {
  try {
    const ticket = await api.get(`/tickets`, { headers: { Authorization: `Bearer ${token}` } })

    return ticket.data
  }
  catch { console.error }
}

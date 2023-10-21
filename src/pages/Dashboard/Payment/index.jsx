import { useEffect, useState } from 'react';
import PaymentOptions from "../../../components/PaymentProcess";
import PaymentForm from '../../../components/PaymentForm';
import { useGetTicket } from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import axios from 'axios';

export default function Payment() {
  const token = useToken()
  const [status, setStatus] = useState("pending");
  const [ticket, setTicket] = useState(undefined);
  useEffect( () => {
    axios.get(`${import.meta.env.VITE_API_URL}/tickets`, {headers: {Authorization: `Bearer ${token}`}})
    .then( res => {
        setTicket(res.data.TicketType)
        setStatus('payment')
    })
    .catch(err => {
      if (err.response.status === 404) return setStatus('pending')
      console.error(err)
      setStatus('pending')
    })
      if (ticket && status !== "finished") setStatus("finished");
  }, [token]);
  
  return (
    <>
      {status === "pending" && <PaymentOptions setStatus={setStatus} setTicket={setTicket} /> }
      {status === "payment" && <PaymentForm ticket={ticket} /> }      
    </>   
  );
}

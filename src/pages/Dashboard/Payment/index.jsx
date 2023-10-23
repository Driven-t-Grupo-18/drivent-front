import { useEffect, useState } from 'react';
import PaymentOptions from "../../../components/PaymentProcess";
import PaymentForm from '../../../components/PaymentForm';
import useToken from '../../../hooks/useToken';
import axios from 'axios';

export default function Payment() {
  const token = useToken()
  const [status, setStatus] = useState("pending");
  const [ticketType, setTicketType] = useState(undefined);
  const [ticket, setTicket] = useState();
  const [paymentStatus, setPaymentStatus] = useState('pending')
  useEffect( () => {
    axios.get(`${import.meta.env.VITE_API_URL}/tickets`, {headers: {Authorization: `Bearer ${token}`}})
    .then( res => {
        setTicketType(res.data.TicketType)
        setStatus('payment')
        setTicket(res.data)
        if(res.data.status === 'PAID'){
          setPaymentStatus('succeed')
        }else{
          setPaymentStatus('pending')
        }


    })
    .catch(err => {
      if (err.response?.status === 404) return setStatus('pending')
      console.error(err)
      setStatus('pending')
    })
      if (ticketType && status !== "finished") setStatus("finished");
  }, [token]);
  
  return (
    <>
      {status === "pending" && <PaymentOptions setStatus={setStatus} setTicket={setTicket} setTicketType={setTicketType} /> }
      {status === "payment" && <PaymentForm paymentStatus={paymentStatus} setPaymentStatus={setPaymentStatus} ticket={ticket} ticketType={ticketType} /> }      
    </>   
  );
}

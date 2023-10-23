import { useEffect, useState } from 'react';
import PaymentOptions from "../../../components/PaymentProcess";
import PaymentForm from '../../../components/PaymentForm';
import { useGetTicket } from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import IncompleteRegistration from '../../../components/PaymentProcess/incompleteRegistration';

export default function Payment() {
  const token = useToken()
  const [status, setStatus] = useState("pending");
  const [ticketType, setTicketType] = useState(undefined);
  const [ticket, setTicket] = useState();
  useEffect( () => {

    axios.get(`${import.meta.env.VITE_API_URL}/enrollments`, {headers: {Authorization: `Bearer ${token}`}})
    .then( () => {
      axios.get(`${import.meta.env.VITE_API_URL}/tickets`, {headers: {Authorization: `Bearer ${token}`}})
      .then( res => {
          setTicketType(res.data.TicketType)
          setStatus('payment')
          setTicket(res.data)
      })
      .catch(err => {
        if (err.response?.status === 404) return setStatus('pending')
        console.error(err)
        setStatus('pending')
      })
        if (ticketType && status !== "finished") setStatus("finished");
    }
    )
    .catch(err => {
      console.error(err)
      setStatus('incomplete')
    })
  }, [token]);
  
  return (
    <>
      {status === "incomplete" && <IncompleteRegistration /> }
      {status === "pending" && <PaymentOptions setStatus={setStatus} setTicket={setTicketType} /> }
      {status === "payment" && <PaymentForm ticket={ticket} ticketType={ticketType} /> }      
    </>   
  );
}

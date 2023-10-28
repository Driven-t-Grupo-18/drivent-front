import { useEffect, useState } from 'react';
import PaymentOptions from "../../../components/PaymentProcess";
import PaymentForm from '../../../components/PaymentForm';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import IncompleteRegistration from '../../../components/PaymentProcess/incompleteRegistration';

export default function Payment() {
  const token = useToken()
  const [status, setStatus] = useState("incomplete");
  const [ticketType, setTicketType] = useState(undefined);
  const [ticket, setTicket] = useState();
  const [paymentStatus, setPaymentStatus] = useState('pending')
  useEffect(() => {

    axios.get(`${import.meta.env.VITE_API_URL}/enrollments`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        axios.get(`${import.meta.env.VITE_API_URL}/tickets`, { headers: { Authorization: `Bearer ${token}` } })
          .then(res => {
            setTicketType(res.data.TicketType)
            setTicket(res.data)
            setStatus('payment')
            if (res.data.status === "PAID") {
              setPaymentStatus('succeed')
            }
          })
          .catch(err => {
            if (err.response?.status === 404) return setStatus('pending')
            console.error(err)
            setStatus('pending')

          })
      })
      .catch(err => {
        console.error(err)
        setStatus('incomplete')

      })
  }, [token]);
  return (
    <>
      {status === "incomplete" && <IncompleteRegistration />}
      {status === "pending" && <PaymentOptions setStatus={setStatus} setTicketType={setTicketType} setTicket={setTicket} />}
      {status === "payment" && <PaymentForm ticket={ticket} paymentStatus={paymentStatus} setPaymentStatus={setPaymentStatus} ticketType={ticketType} />}
    </>
  );
}

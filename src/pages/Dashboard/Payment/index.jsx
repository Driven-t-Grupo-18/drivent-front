import { useEffect, useState } from 'react';
import PaymentOptions from "../../../components/PaymentProcess";
import PaymentForm from '../../../components/PaymentForm';
import { useGetTicket } from '../../../hooks/api/useTicket';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import axios from 'axios';

export default function Payment() {
  const token = useToken()
  const [status, setStatus] = useState("pending");
  const [ticket, setTicket] = useState(undefined);
  const { getTicket } = useGetTicket();
console.log(ticket)
  useEffect( () => {
    axios.get(`${import.meta.env.VITE_API_URL}/tickets`, {headers: {Authorization: `Bearer ${token}`}})
    .then( res => {
        console.log(res.data)
        setTicket(res.data.TicketType)
        setStatus('payment')
    })
    .catch(err => {
      console.error(err)
      setStatus('pending')
    })
      if (ticket && status !== "finished") setStatus("finished");
  }, [token]);
  
  return (
    <>
      {status === "pending" && <PaymentOptions setStatus={setStatus} setTicket={setTicket} /> }
      {status === "payment" && <PaymentForm ticket={ticket} /> }      
      {status === "finished" && 
      <Finish>
        <h1>Pagamento concluído.</h1>
      </Finish>}      
    </>   
  );
}

const Finish = styled.div`
  text-align: center;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color:"#8E8E8E";
  }
`;

import { useEffect, useState } from 'react';
import PaymentOptions from "../../../components/PaymentProcess";
import PaymentForm from '../../../components/PaymentForm';
import { useGetTicket } from '../../../hooks/api/useTicket';
import styled from 'styled-components';

export default function Payment() {
  const [status, setStatus] = useState("pending");
  const [ticket, setTicket] = useState(undefined);
  const { getTicket } = useGetTicket();

  useEffect( () => {
    const data = async () => {
      const ticket = await getTicket();
      if (ticket && status !== "finished") setStatus("finished");
    }

    data();

  }, [status]);
  
  return (
    <>
      {status === "pending" && <PaymentOptions setStatus={setStatus} setTicketType={setTicket} /> }
      {status === "payment" && <PaymentForm ticketType={ticket} /> }      
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
    color="#8E8E8E"
  }
`;

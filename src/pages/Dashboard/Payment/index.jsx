import { useState } from 'react';
import PaymentOptions from "../../../components/PaymentProcess";
import PaymentForm from '../../../components/PaymentForm';

export default function Payment() {
  const [status, setStatus] = useState("pending");
  const [ticket, setTicket] = useState(undefined);
  
  return (
    <>
      
        <PaymentForm />
      
    </>   
  );
}

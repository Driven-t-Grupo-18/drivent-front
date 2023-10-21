import { useState } from 'react';
import PaymentOptions from "../../../components/PaymentProcess";
import PaymentForm from '../../../components/PaymentForm';

export default function Payment() {
  const [status, setStatus] = useState("pending");

  const myObject = {
    id: 3,
    includesHotel: true,
    isRemote: false,
    price: 10
  };

  const [ticket, setTicket] = useState(myObject);
  
  return (
    <>
      
        <PaymentForm ticket={ticket} />
      
    </>   
  );
}

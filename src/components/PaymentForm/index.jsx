import styled from "styled-components";
import { SubText } from "../SubText/SubText";
import { Text } from "../Text/Text";
import CreditCard from "../../components/PaymentForm/CreditCard";
import CheckIcon from "../../assets/images/check.svg";
import { useEffect, useState } from "react";
import usePayment from "../../hooks/api/usePayment";
import { useForm } from "../../hooks/useForm";
import FormValidations from "./FormValidations";
import { Card } from "./Card";
import { toast } from 'react-toastify';
import creditCardType from "credit-card-type";



export default function PaymentForm({ ticketType, ticket, paymentStatus, setPaymentStatus }) {
  useEffect(() => {
    if (!ticketType) return;
  }, []);

  const { paymentProcess } = usePayment();
  const {
    handleSubmit,
    handleChange,
    data,
    setData,
    errors,
  } = useForm({

    validations: FormValidations,

    onSubmit: async (data) => {


      const newData = {
        ticketId: ticket.id,
        cardData: {
          issuer: creditCardType(data.number)[0]?.niceType,
          number: data.number,
          name: data.name,
          expirationDate: data.expirationDate,
          cvc: data.cvc,
        }
      };
      try {
        await paymentProcess(newData);
        setPaymentStatus('succeed');
        toast('Pagamento efetuado com sucesso!');
      } catch (err) {
        console.log(err)
        toast('Não foi possível realizar o pagamento!');
      }
    },

    initialValues: {
      number: '',
      name: '',
      expirationDate: '',
      cvc: '',
    },
  });

  return (
    <>
      <Text title="Ingresso e Pagamento" />
      <SubText title="Ingresso escolhido" />
      <Card disabled={true} reserved={'reservado'} name={ticketType?.name} price={ticketType?.price} />
      <SubText title="Pagamento" />
      <Payment>
        {paymentStatus === 'pending' && <CreditCard setData={setData} data={data} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} />}
        {paymentStatus === 'succeed' &&
          <FinishedPayment>
            <img src={CheckIcon} />
            <div>
              <h2>Pagamento confirmado!</h2>
              <h3>Prossiga para escolha de hospedagem e atividades</h3>
            </div>
          </FinishedPayment>
        }

      </Payment>
    </>
  );
}

const Payment = styled.div`
  display: flex;
  width: 100%;

  img {
    width: 300px;
    height: 200px;
    margin-left: -15px;
  }

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FinishedPayment = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 20px;
    > div {
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 16px;
      font-weight: 700;
      color: #454545;
    }

    h3 {
      font-size: 16px;
      font-weight: 400;
      color: #454545;
    }

    }

    img {
    width: 60px;
    height: 60px;
    }

    
`;
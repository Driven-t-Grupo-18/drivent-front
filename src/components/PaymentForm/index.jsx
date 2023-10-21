import styled from "styled-components";
import { Card } from "../Card/Card";
import { SubText } from "../SubText/SubText";
import { Text } from "../Text/Text";
import CreditCard from "../../assets/images/creditCard.png";
import CheckIcon from "../../assets/images/check.svg";
import { useEffect, useState } from "react";
import usePayment from "../../hooks/api/usePayment";
import { useForm } from "../../hooks/useForm";
import FormValidations from "./FormValidations";
import { Button, Input } from "@mui/material";

export default function PaymentForm({ticket}) {
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const { payment } = usePayment();

    const { 
        handleSubmit,
        handleChange,
        data,
        errors,
    } = useForm({

        validations: FormValidations,

        onSubmit: async (data) => {
          const issuerIdentification = data.number.slice(0, 4);
          const firstDigit = parseInt(issuerIdentification[0], 10);
          const twoDigits = parseInt(issuerIdentification[0] + issuerIdentification[1], 10);
          const allDigits = parseInt(issuerIdentification, 10);
    
          let issuer = null;
          if (firstDigit === 4) issuer = 'VISA';
          else if ((twoDigits >= 51 && twoDigits <= 55) || (allDigits >= 2221 && allDigits <= 2720)) issuer = 'MASTERCARD';
    
          if (issuer === null) {
            toast('Cartão Inválido!');
            return;
          }
    
          //ticketID

          const newData = {
            cardData: {
              issuer,
              number: data.number,
              name: data.name,
              expirationDate: data.expirationDate,
              cvv: data.cvv,
            }
          };
    
          try {
            await payment(newData);
            setPaymentStatus('succeed');
            toast('Pagamento efetuado com sucesso!');
          } catch (err) {
            console.log(err.response.data.message)
            toast('Não foi possível realizar o pagamento!');
          }
        },
    
        initialValues: {
          number: '',
          name: '',
          expirationDate: '',
          cvv: '',
        },
      });

      useEffect( () => {
        if (!ticket) return;
      }, []);
   
    return(
        <>
            <Text title="Ingresso e Pagamento" />
            <SubText title="Ingresso escolhido" />
            <Card disabled={true} reserved={'reservado'} name={ticket.name} price={ticket.price}/>
            <SubText title="Pagamento" />
            <Payment>
                {paymentStatus === 'pending' &&
                    <>
                        <img src={CreditCard} alt="creditCard"/>
                        <CardForm onSubmit={handleSubmit}>
                            <InputContainer>
                                <Input 
                                    label = "Card Number"
                                    name = "number"
                                    size = "small"
                                    value = {data.number}
                                    mask = "9999 9999 9999 9999"
                                    onChange={handleChange('number')}
                                />
                            </InputContainer>

                            <InputContainer>
                                <div>
                                    <Input
                                        label="Valid Thru"
                                        name="expirationDate"
                                        type="text"
                                        mask="99/99"
                                        size="small"
                                        value={data.expirationDate}
                                        onChange={handleChange('expirationDate')}
                                    />
                                    <Input
                                        label="CVC"
                                        name="cvv"
                                        mask="999"
                                        size="small"
                                        value={data.cvv}
                                        onChange={handleChange('cvv')}
                                    />
                                </div>                            
                            </InputContainer>

                            <SubmitContainer>
                                <Button type="submit">
                                    Finalizar Pedido
                                </Button>
                            </SubmitContainer>                            
                        </CardForm>
                    </>
                }
                {paymentStatus === 'succeed' &&
                    <FinishedPayment>
                        <img src={CheckIcon} />
                        <div>
                            
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
    width: 325px;
    height: 200px;
  }

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CardForm = styled.form`
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
> div {
  width: 100%;
  display: flex;
  gap: 25px;
  min-width: 225px;
}
`;

const SubmitContainer = styled.div`
  margin-top: 20px!important;
  width: 100%!important;

  @media (max-width: 750px) {
    display: flex;
    justify-content: center;
  }
`;

const FinishedPayment = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 20px;
    > div {
    display: flex;
    flex-direction: column;
    }

    img {
    width: 60px;
    height: 60px;
    }
`;
import styled from "styled-components";
import { SubText } from "../SubText/SubText";
import { Text } from "../Text/Text";
import CreditCard from "../../assets/images/creditCard.png";
import CheckIcon from "../../assets/images/check.svg";
import { useEffect, useState } from "react";
import usePayment from "../../hooks/api/usePayment";
import { useForm } from "../../hooks/useForm";
import FormValidations from "./FormValidations";
import MuiButton from "@mui/material/Button";
import { Card } from "./Card";
import { useCreateTicket } from "../../hooks/api/useTicket";
import { toast } from 'react-toastify';
import Input from './Input';

export default function PaymentForm({ticket}) {
    useEffect( () => {
      if (!ticket) return;
    }, []);

    function ticketType() {
  
      let type = '';
      if (ticket.isRemote) {
        type += 'Online';
        return type;
      }
  
      if (!ticket.includesHotel) type += 'Presencial';
      else type += 'Presencial + Hotel';
      return type;
    }
  
    const type = ticketType();

    const [paymentStatus, setPaymentStatus] = useState('pending');
    const { paymentProcess } = usePayment();
    const { createTicket } = useCreateTicket();
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
    
          let newTicket = null;

          try {
            newTicket = await createTicket({"ticketTypeId": ticket.id});
          } catch (err) {
            console.log(err);            
            toast('Não foi possível realizar o pagamento!');
            return;
          }

          const newData = {
            ticketId: newTicket.id,
            cardData: {
              issuer,
              number: data.number,
              name: data.name,
              expirationDate: data.expirationDate,
              cvv: data.cvv,
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
          cvv: '',
        },
      });
   
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
                                {errors.number && <Error>{errors.number}</Error>}
                                <h5>E.g.: 49..., 51..., 55..., 22...</h5>                                
                            </InputContainer>

                            <InputContainer>
                              <Input 
                                label="Name"
                                name="name"
                                size="small"
                                value={data.name}
                                onChange={handleChange('name')}
                              />
                              {errors.name && <Error>{errors.name}</Error>}
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
                                {errors.expirationDate && <Error>{errors.expirationDate}</Error>}                            
                                {errors.cvv && <Error>{errors.cvv}</Error>}
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

const CardForm = styled.form`
    margin: 20px 10px;
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
> div {
  width: 100%;
  display: flex;
  gap:15px;
  min-width: 225px;
}

h5 {
  font-size: 13px;
  margin: 5px 0px 5px 3px;
  color: #8E8E8E;
}
`;

const Error = styled.p`
  font: Roboto;
  color: red;
  margin: 5px;
`

const SubmitContainer = styled.div`
  margin-top: 20px!important;
  margin-left: -290px;
  width: 100%!important;

  @media (max-width: 750px) {
    display: flex;
    justify-content: center;
  }
`;

const Button = styled(MuiButton)`
  margin-top: 40px !important;
  background-color: #E0E0E0 !important;
  color: #000 !important;
  box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px !important;

  height: 40px;
`

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
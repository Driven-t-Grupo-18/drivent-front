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
import { useCreateTicket } from "../../hooks/api/useTicket";
import { toast } from 'react-toastify';
import creditCardType from "credit-card-type";


export default function PaymentForm({ticketType, ticket}) {
    useEffect( () => {
      if (!ticketType) return;
    }, []);

    const [paymentStatus, setPaymentStatus] = useState('pending');
    const { paymentProcess } = usePayment();
    const { createTicket } = useCreateTicket();
    const { 
        handleSubmit,
        handleChange,
        data,
        errors,
    } = useForm({

        //validations: FormValidations,

        onSubmit: async (data) => {

          console.log(data)

          //CARTÃO INVÁLIDO?

          const newData = {
            ticketId: ticket.id,
            cardData: {
              issuer: creditCardType(data.number)[0]?.niceType,
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
            <Card disabled={true} reserved={'reservado'} name={ticketType?.name} price={ticketType?.price}/>
            <SubText title="Pagamento" />
            <Payment>
                {/*paymentStatus === 'pending' &&
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
                                        label="CVV"
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
    */}
    <CreditCard data={data} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit}/>
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
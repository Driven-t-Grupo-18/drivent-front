import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import creditCardType from 'credit-card-type';
import MuiButton from "@mui/material/Button";
import { styled } from 'styled-components';
import Input from '../Form/Input';

const CreditCard = (props) => {
  const { errors, handleSubmit, setData } = props
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
    setData((prev) => ({ ...prev, [name === 'expiry' ? 'expirationDate' : name]: value }))

  }
  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }
  return (
    <Payment>
      <div>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <SubmitContainer>
          <Button form="cartao" type="submit">
            Finalizar Pedido
          </Button>
        </SubmitContainer>
      </div>
      <SCForm id='cartao' onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="number"
            name="number"
            mask='9999 9999 9999 9999'
            maskChar='_'
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            
          />
          {errors.number && <Error>{errors.number}</Error>}

          <h5>E.g.: 49..., 51..., 55..., 22...</h5>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {errors.name && <Error>{errors.name}</Error>}

        </InputContainer>

        <InputContainer>
          <div>
            <Input
              type="number"
              name="expiry"
              placeholder="Valid thru"
              value={state.expiry}
              mask='99/99'
              maskChar='_'
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <Input
              type="number"
              name="cvc"
              placeholder="CVC"
              mask={creditCardType(state.number)[0]?.niceType === 'American Express' ? '9999' : '999'}
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div>
          {errors.expirationDate && <Error>{errors.expirationDate}</Error>}                            
          {errors.cvc && <Error $cvc={'cvc'}>{errors.cvc}</Error>}
          </div>
        </InputContainer>

      </SCForm>
    </Payment>
  );
}
const SubmitContainer = styled.div`
  margin-top: 40px;
  width: 290px;
  display: flex;
  justify-content: start;
  align-items: center;
  @media (max-width: 750px) {
    position: static;
    width: 100%!important;
    margin-bottom: 40px;
    margin-top: 40px !important;
    justify-content: center;
    margin-left: 0px;
  }
`;

const Error = styled.p`
  font-family: 'Roboto', sans-serif;
  color: red;
  margin: 5px;
  margin-left: ${props => props.$cvc === 'cvc' ? '35px' : ''};

`

const Button = styled(MuiButton)`
  background-color: #E0E0E0 !important;
  border-radius: 4px;
  height: 37px;
  width: 182px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  color: #000 !important;
  box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px !important;
  height: 40px;
  
`
const Payment = styled.div`
  display: flex;
  width: 100%;
  height: 270px;
  display: flex;
  align-items: start;
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
    padding-bottom: 500px;
  }
`;
const SCForm = styled.form`
    margin-left: 20px;
    margin-top: -7px;
    @media (max-width: 750px) {
    margin-top: 10px;
    flex-direction: column;
    align-items: center;

  }
`

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

export default CreditCard;
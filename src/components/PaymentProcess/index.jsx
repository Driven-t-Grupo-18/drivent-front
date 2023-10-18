
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { FormWrapper } from '../PersonalInformationForm/FormWrapper';
import { useState } from 'react';


dayjs.extend(CustomParseFormat);

export default function PaymentOptions() {

const [selected, setSelected] = useState(false)

function selectOption(){
    if(selected === false){
        setSelected(true)
    } else{
        setSelected(false)
    }
}

    return (
        <>
            <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
            <StyledSubText>Primeiro, escolha sua modalidade de ingresso</StyledSubText>
            <LocalizationProvider>
                <FormWrapper >
                    <SelectOption onClick={selectOption}> 
                            <h1>Presencial</h1>
                            <h2>R$250</h2>
                    </SelectOption> 
                    <SelectOption onClick={selectOption}> 
                            <h1>Online</h1>
                            <h2>R$100</h2>
                    </SelectOption> 
                </FormWrapper>
            </LocalizationProvider>
            <StyledSubText>Ótimo! Agora escolha sua modalidade de hospedagem</StyledSubText>
            <LocalizationProvider>
                <FormWrapper >
                    <SelectOption onClick={selectOption}> 
                            <h1>Sem Hotel</h1>
                            <h2>+R$0</h2>
                    </SelectOption> 
                    <SelectOption onClick={selectOption}> 
                            <h1>Com Hotel</h1>
                            <h2>+R$350</h2>
                    </SelectOption> 
                </FormWrapper>
            </LocalizationProvider>
            <StyledSubText>Fechado! O total ficou em <span>R$ 600</span>. Agora é só confirmar:</StyledSubText>
            <ReserveButton>
                <h1>RESERVAR INGRESSO</h1>
            </ReserveButton>
        </>
    );
}

const StyledTypography = styled(Typography)`
    margin-bottom: 20px!important;
`;

const StyledSubText = styled.h2`
    margin-top: 35px;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #8E8E8E;
    margin-bottom: 20px;
    span{
        font-weight: 600;
    }
`

const SelectOption = styled.button`
    background-color: ${(props) => (props.selected === true ? "#ffcb86" : "#FFFFFF")};
    width: 145px;
    height: 145px;
    top: 323px;
    left: 510px;
    border-radius: 20px;
    border: 1px;
    border: 1px solid #CECECE;
    margin-right: 20px;
    cursor: pointer;
    &:hover{
        background-color: #eaeaea;
        transition: 0.5s;
        opacity: 0.7;
    }
    h1{
        color: #454545; 
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: center;
    }
    h2{
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: center;
        color: #898989;
    }
`

const ReserveButton = styled.button`
    width: 162px;
    height: 37px;
    border-radius: 4px;
    text-decoration: none;
    box-shadow: 0px 0px 12px 3px #95949440, 0px 2px 6px 2px rgba(0, 0, 0, 0.2);
    border:none!important;
    background-color: #dedede!important;
    cursor: pointer;
    &:hover{
        color: #000000;
        transition: 0.5s;
        opacity: 0.7;
    }
    h1{
        color: #000000;
        font-size: 13px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: center;
    }
`

/* const FormWrapper = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  > div {
    width: calc(50% - 20px);
    margin: 0 10px 0 0;
  }

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`; */



import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { LocalizationProvider } from '@mui/x-date-pickers'
import {FormWrapper} from '../../../components/PersonalInformationForm/FormWrapper'
import { useState } from 'react';
import SelectOption from '../../../components/OptionsBox';


dayjs.extend(CustomParseFormat);

export default function Hotel() {

const [selected, setSelected] = useState(false)

function selectOption(e){
  e.preventDefault()
    if(selected === false){
        setSelected(true)
    } else{
        setSelected(false)
    }
}

    return (
        <>
            <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
            <StyledSubText>Primeiro, escolha seu hotel</StyledSubText>
            <LocalizationProvider>
                <FormWrapper >
                    <SelectOption onClick={selectOption} selected={selected} /> 

                </FormWrapper>
            </LocalizationProvider>
            <StyledSubText >Ótima pedida! Agora escolha seu quarto:</StyledSubText>
            <LocalizationProvider>
                <FormWrapper >

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
import { SignIn, XCircle } from "@phosphor-icons/react";
import React from "react";
import styled from "styled-components"
import Button from "../../../components/Form/Button";
import { SubText } from "../../../components/SubText/SubText";
import { Text } from "../../../components/Text/Text";

const objButton = [
  { text: "Sexta, 22/10" },
  { text: "Sábado, 23/10" },
  { text: "Domingo, 24/10" }
]
export default function Activities() {
  return (
    <>
      <Text title="Escolha de atividades" />
      <SubText title="Primeiro, filtre pelo dia do evento:" />
      <StyledContainer >
        {objButton.map((item, index) =>
          <StyledButton
            size="large" key={index}>{item.text}</StyledButton>
        )}
      </StyledContainer>
      <StyledArea>
        <table>
          <tr>
            <th>Auditório Principal</th>
            <th>Auditório Lateral</th>
            <th>Sala de Workshop</th>
          </tr>
          <tr>
            <td>
              <StyledActivity>
                <StyledInfo>
                  <h1>Minecraft: montando o PC ideal</h1>
                  <p>09:00 - 10:00</p>
                </StyledInfo>
                <StyledIcon>
                  <ion-icon name="log-in-outline"></ion-icon>
                  <p>27 vagas</p>
                </StyledIcon>
              </StyledActivity>
              <StyledActivity>
                <StyledInfo>
                  <h1>Palestra x</h1>
                  <p>10:00 - 11:00</p>
                </StyledInfo>
                <StyledIcon>
                  <ion-icon name="close-circle-outline"></ion-icon>
                  <p>Esgotado</p>
                </StyledIcon>
              </StyledActivity>
            </td>
            <td><StyledActivity>
              <StyledInfo>
                <h1>Palestra y</h1>
                <p>10:00 - 11:00</p>
              </StyledInfo>
              <StyledIcon>
                <ion-icon name="close-circle-outline"></ion-icon>
                <p>Esgotado</p>
              </StyledIcon>
            </StyledActivity></td>
            <td><StyledActivity>
              <StyledInfo>
                <h1>Palestra z</h1>
                <p>9:00 - 10:00</p>
              </StyledInfo>
              <StyledIcon>
                <ion-icon name="close-circle-outline"></ion-icon>
                <p>Esgotado</p>
              </StyledIcon>
            </StyledActivity></td>
          </tr>
        </table>
      </StyledArea>
    </>
  )
}


const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const StyledButton = styled(Button)`
  background-color: #E0E0E0 !important;
  color: #000000 !important;

  &:hover {
    background-color: #FFD37D !important;
  }
`;


const StyledArea = styled.div`
  margin-top: 30px;
  width: 864px;
  table {
    width: 864px;
  }
  td{
    border: 1px solid #D7D7D7;
    height: 330px;
    width: 288px;
  }
  th{
    color: #7B7B7B;
    font-size: 17px;
    font-weight: 400;
    padding-bottom: 10px;
  }
`;

const StyledActivity = styled.div`
  background-color: #F1F1F1;
  width: 265px;
  height: 79px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 5px;
  display: flex;
  h1{
    color: #343434;
    font-size: 12px;
    font-weight: 700;
  }
  p{
    color: #343434;
    font-size: 12px;
    font-weight: 400;
  }
`;

const StyledInfo = styled.div`
  width: 200px;
  margin: 10px;
`;

const StyledIcon = styled.div`
  width: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #CFCFCF;
  ion-icon {
    width: 20px;
    color: #078632;
    top: 15px;
    left: 18px;
  }
  ion-icon {
    width: 20px;
    color: #078632;
    top: 15px;
    left: 18px;
  }
  p{
    color: #078632;
    font-size: 9px;
  }
`;
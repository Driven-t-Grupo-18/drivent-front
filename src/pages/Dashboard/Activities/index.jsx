import React from 'react';
import styled from 'styled-components';
// import useTicket from '../../../hooks/api/useTicket';
import Button from '../../../components/Form/Button';
import { SubText } from '../../../components/SubText/SubText';
import { Text } from '../../../components/Text/Text';
import { useContext, useEffect, useState } from 'react';
import api from '../../../services/api';

export default function Activities() {
  // const { ticket } = useTicket();
  // const { eventInfo } = useContext(EventInfoContext);
  const [activities, setActivities] = useState([]);

  // const days = new Date(eventInfo.startsAt);

  // const activitiesDays = [];
  // for (let i = 1; i < 4; i++) {
  //   const currentDate = new Date(days.getTime() + i * 24 * 60 * 60 * 1000);
  //   const activityDay = {
  //     weekDay: currentDate.toLocaleDateString('pt-BR', { weekday: 'long' }),
  //     date: currentDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
  //   };
  //   activitiesDays.push(activityDay);
  // }
  const activitiesDays = [
    { weekDay: 'Segunda-feira', date: '10/05' },
    { weekDay: 'Terça-feira', date: '11/05' },
    { weekDay: 'Quarta-feira', date: '12/05' },
  ];

  return (
    <>
      <Text title="Escolha de atividades" />
      <SubText title="Primeiro, filtre pelo dia do evento:" />
      <StyledContainer>
        {activitiesDays.map((day) => (
          <StyledButton size="large" key={day} weekDay={day.weekDay} date={day.date} setActivities={setActivities} />
        ))}
      </StyledContainer>
      <StyledArea>
        <table>
          <thead>
            <tr>
              <th>Auditório Principal</th>
              <th>Auditório Lateral</th>
              <th>Sala de Workshop</th>
            </tr>
          </thead>
          <tbody>
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
            <td>
              <StyledActivity>
                <StyledInfo>
                  <h1>Palestra y</h1>
                  <p>10:00 - 11:00</p>
                </StyledInfo>
                <StyledIcon>
                  <ion-icon name="close-circle-outline"></ion-icon>
                  <p>Esgotado</p>
                </StyledIcon>
              </StyledActivity>
            </td>
            <td>
              <StyledActivity>
                <StyledInfo>
                  <h1>Palestra z</h1>
                  <p>9:00 - 10:00</p>
                </StyledInfo>
                <StyledIcon>
                  <ion-icon name="close-circle-outline"></ion-icon>
                  <p>Esgotado</p>
                </StyledIcon>
              </StyledActivity>
            </td>
          </tbody>
        </table>
      </StyledArea>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const StyledButton = styled(Button)`
  background-color: #e0e0e0 !important;
  color: #000000 !important;

  &:hover {
    background-color: #ffd37d !important;
  }
`;

const StyledArea = styled.div`
  margin-top: 30px;
  width: 864px;
  table {
    width: 864px;
  }
  td {
    border: 1px solid #d7d7d7;
    height: 330px;
    width: 288px;
  }
  th {
    color: #7b7b7b;
    font-size: 17px;
    font-weight: 400;
    padding-bottom: 10px;
  }
`;

const StyledActivity = styled.div`
  background-color: #f1f1f1;
  width: 265px;
  height: 79px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 5px;
  display: flex;
  h1 {
    color: #343434;
    font-size: 12px;
    font-weight: 700;
  }
  p {
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
  border-left: 1px solid #cfcfcf;
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
  p {
    color: #078632;
    font-size: 9px;
  }
`;

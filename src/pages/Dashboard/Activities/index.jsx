import React from 'react';
import styled from 'styled-components';
// import useTicket from '../../../hooks/api/useTicket';
import Button from '../../../components/Form/ActivitiesButton';
import { SubText } from '../../../components/SubText/SubText';
import { Text } from '../../../components/Text/Text';
import { useContext, useEffect, useState } from 'react';
import ActivityBox from '../../../components/Activities/ActivityBox';
import axios from 'axios';
import api from '../../../services/api';

import useToken, { useTicket } from '../../../hooks/useToken';
import { toast } from 'react-toastify';

function translateWeekdays(number) {
  const objRef = {
    0: 'Domingo',
    1: 'Segunda-feira',
    2: 'Terça-feira',
    3: 'Quarta-feira',
    4: 'Quinta-feira',
    5: 'Sexta-feira',
    6: 'Sábado'
  }

  return objRef[number]
}

export default function Activities() {
  const token = useToken()
  const [activities, setActivities] = useState([]);
  const [selectedDay, setSelectedDay] = useState()
  const [activitiesDays, setActivitiesDays] = useState([])
  const [selectedActivities, setSelectedActivities] = useState([])
  const [userActivities, setUserActivities] = useState([])
  const [notPaid, setNotPaid] = useState(false)
  const [isRemote, setIsRemote] = useState(false)


  useEffect(() => {

    async function defineDaysOfActivities() {
      try {
        const ticket = await useTicket(token)
        if (!ticket || ticket?.status === 'RESERVED') return setNotPaid(true)
        if (ticket.TicketType.isRemote) return setIsRemote(true)
        const response = await api.get('activities', { headers: { Authorization: `Bearer ${token}` } })
        setActivitiesDays(response.data.map(activitiesDay => {
          const activityDate = new Date(activitiesDay.startsAt)
          const weekDay = (translateWeekdays(activityDate.getDay()))
          const date = ((activityDate.getDay().toString()).padStart(2, '0') + '/' + (activityDate.getMonth().toString()).padStart(2, '0'))
          activitiesDay.weekDay = weekDay
          activitiesDay.date = date
          return activitiesDay
        }))
      }
      catch (err) {
        console.log(err)
      }
    }
    defineDaysOfActivities()
  }, [token])
  async function filterActivities(id) {
    setSelectedActivities([])

    try {
      const activitiesFilter = await api.get(`/activities/Day/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserActivities(activitiesFilter.data.userActivitiesIds);
      const response = activitiesFilter.data.activitiesFromDayWithOccupation
      const newArray = response.map(activity => {
        if (activitiesFilter.data.userActivitiesIds?.indexOf(activity.id) >= 0) {
          selectedActivities.push(activity)
          return { ...activity, userRegistered: true }
        } else {
          return { ...activity, userRegistered: false }
        }
      })

      const filteredBySchedule = selectedActivities.length === 0 ? newArray : newArray.map(activity => {
        if (activity.userRegistered) return activity

        const permitted = selectedActivities.find((elemento, index) => {
          if (elemento.activityDayId === activity.activityDayId) {
            if (index === 0 && elemento.startsAt > activity.endsAt) return true

            if (index === selectedActivities.length - 1 && elemento.endsAt < activity.startsAt) return true

            if (elemento.startsAt > activity.endsAt && selectedActivities[index - 1].endsAt < activity.startsAt) return true
            if (index === 0 || index === selectedActivities.length - 1) return false
            console.log(activity.endsAt > selectedActivities[index - 1]?.endsAt)

          }
        })
        if (permitted) return activity
      })

      console.log(filteredBySchedule.filter(elemento => {
        if (elemento?.id) return true
      }))
      setActivities(filteredBySchedule.filter(elemento => {
        if (elemento?.id) return true
      }));
    }
    catch (err) {
      console.error(err)
      toast('Não foi possível carregar as atividades. Tente novamente')
    }
  }

  return (
    <>
      <Text title="Escolha de atividades" />
      {notPaid ? <AccessDeniedMessage>Você precisa ter confirmado pagamento antes <br /> de fazer a escolha de atividades</AccessDeniedMessage> :
        isRemote ? <AccessDeniedMessage>Sua modalidade de ingresso não necessita escolher <br/> atividade. Você terá acesso a todas as atividades.</AccessDeniedMessage> :
          <>
            <SubText title="Primeiro, filtre pelo dia do evento:" />
            <StyledContainer>
              {activitiesDays.map((day, index) => (
                <StyledButton filterActivities={filterActivities} size="large" key={index} id={day.id} setSelectedDay={setSelectedDay} selectedDay={selectedDay} weekDay={day.weekDay} date={day.date} />
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
                  <tr>
                    <td>
                      {activities.map((activity) => {
                        if (activity.location === 'Auditório Principal') {
                          return <ActivityBox filterActivities={filterActivities} selectedActivities={selectedActivities} key={activity.id} activity={activity} />
                        }
                      })}
                    </td>
                    <td>
                      {activities.map((activity) => {
                        if (activity.location === 'Auditório Lateral') {
                          return <ActivityBox filterActivities={filterActivities} selectedActivities={selectedActivities} key={activity.id} activity={activity} />
                        }
                      })}
                    </td>
                    <td>
                      {activities.map((activity) => {
                        if (activity.location === 'Workshop') {
                          return <ActivityBox filterActivities={filterActivities} selectedActivities={selectedActivities} key={activity.id} activity={activity} />
                        }
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledArea>
          </>
      }
    </>
  );
}

const AccessDeniedMessage = styled.h2`
  width: 100%;
  height: 85%;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color: #8E8E8E;
  display: flex;
  align-items:center;
  justify-content: center;
`

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
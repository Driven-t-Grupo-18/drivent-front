import styled from "styled-components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api"
import useToken from "../../hooks/useToken";
export default function ActivityBox(props) {
  const { id, name, capacity, userRegistered, startsAt, endsAt, occupied, activityDayId } = props.activity
  const { filterActivities } = props
  const token = useToken()
  const [full, setFull] = useState(false)
  const [selected, setSelected] = useState(false)
  async function handleClick() {

    if (selected) {
      toast('Você já está inscrito nessa atividade!')
    } else if (full) {
      toast('Não há mais vagas para esta atividade!')
    } else {
      try{
        await api.post(`/activities/record`, {activityDayId, activityId: id }, {
        headers: {Authorization: `Bearer ${token}`}
        })

        setSelected(true)
        toast('Inscrição realizada com sucesso!')
        filterActivities(activityDayId)

      }
      catch (err){
        console.error(err)
        setSelected(false)
        toast('Desculpe, não foi possível registrar a sua inscrição em "' + name + '"')
      }
    }
  }
  useEffect(() => {
    if(userRegistered){
      setSelected(true)
    }
    if (capacity - occupied > 0) {
      setFull(false)
    } else {
      setFull(true)
    }


  }, [])

  return (
    <StyledActivity $selected={selected} >
      <StyledInfo>
        <h1>{name}</h1>
        <p>{startsAt} - {endsAt}</p>
      </StyledInfo>

      {selected ?
        <StyledIcon $status={'selecionada'} onClick={handleClick}>
          <ion-icon name="checkmark-circle-outline"></ion-icon>
          <p>Inscrito</p>
        </StyledIcon>
        : capacity - occupied > 0 ?
          <StyledIcon onClick={handleClick}>
            <ion-icon name="log-in-outline"></ion-icon>
            <p>{capacity - occupied} vagas</p>
          </StyledIcon>
          :
          <StyledIcon $status='lotada' onClick={handleClick}>
            <ion-icon name="close-circle-outline"></ion-icon>
            <p>Esgotado</p>
          </StyledIcon>
      }
    </StyledActivity>)

}
const StyledActivity = styled.div`
  background-color: ${props => props.$selected ? '#D0FFDB' : '#f1f1f1'};
  width: 265px;
  height: 79px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 5px;
  display: flex;
  font-family: 'Roboto', sans-serif;
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
  border-radius: 5px;

  
  &:hover {
  background-color: ${props => !props.$status ? '#D0FFDB' : ''};
  cursor: ${props => props.$status ? 'normal' : 'pointer'};
  
  }

  &:active{
    background-color:${props => !props.$status ? '#078632' : '#f1f1f1'};
  }
  ion-icon {
    width: 20px;
    color: ${props => props.$status === 'lotada' ? '#CC6666' : '#078632'};
    top: 15px;
    left: 18px;
  }
  p {
    color: ${props => props.$status === 'lotada' ? '#CC6666' : '#078632'};
    font-size: 9px;

  }
`;

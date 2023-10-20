
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import HotelsBtn from '../../../components/HotelsBtn';
import RoomsBtn from '../../../components/RoomsBtn';


dayjs.extend(CustomParseFormat);

export default function Hotel() {
  const token = useToken()
  const [hotels, setHotels] = useState([])
  const [chosenHotel, setChosenHotel] = useState()
  const [chosenRoom, setChosenRoom] = useState()
  const [roomOptions, setRoomOptions] = useState([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/booking/all`, { headers: { Authorization: `Bearer ${token}` } })
      .then(ans => {
        const resposta = ans.data
        setHotels(resposta)
      })
      .catch(console.error)
  }, [token])


  console.log(chosenRoom)
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <StyledSubText>Primeiro, escolha seu hotel</StyledSubText>
      <LocalizationProvider>
        <FormHotel >
          {hotels.map(x => {
            return <HotelsBtn setChosenRoom={setChosenRoom} chosenHotel={chosenHotel} setChosenHotel={setChosenHotel} setRoomOptions={setRoomOptions} key={x.id} id={x.id} rooms={x.Rooms} image={x.image} name={x.name} typesOfRooms={'single, double e triple'} hotelAvailability={109} />
          })
          }
        </FormHotel>
      </LocalizationProvider>
      {chosenHotel ? <StyledSubText>Ótima pedida! Agora escolha seu quarto:</StyledSubText> : ''}
      <LocalizationProvider>
        <FormHotel >
        {roomOptions.map(x => {

        return <RoomsBtn key= {x.id} id={x.id} capacity={x.capacity} booked={x.Booking.length || 0} chosenRoom={chosenRoom} setChosenRoom={setChosenRoom} name={x.name} />
        })}
        </FormHotel>
      </LocalizationProvider>
      {chosenHotel && chosenRoom ? 
      <ReserveButton>
        <h1>RESERVAR INGRESSO</h1>
      </ReserveButton>
      :""
      }
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
    margin-top: 46px; 
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
export const FormHotel = styled.form` // Criei pra ajustar responsividade
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
    }
  }
`;

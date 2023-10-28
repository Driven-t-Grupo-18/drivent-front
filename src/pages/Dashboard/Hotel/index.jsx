
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
import { RoomVacancy, typeOfRoom } from '../../../components/HotelsUtilitiesFunctions';
import { toast } from 'react-toastify';


dayjs.extend(CustomParseFormat);

export default function Hotel() {
  const token = useToken()
  const [hotels, setHotels] = useState([])
  const [chosenHotel, setChosenHotel] = useState()
  const [chosenRoom, setChosenRoom] = useState()
  const [firstChosenRoom, setFirstChosenRoom] = useState()
  const [roomOptions, setRoomOptions] = useState([])
  const [reserved, setReserved] = useState(false)
  const [bookingId, setBookingId] = useState(0)
  const [bookedAlready, setBookedAlready] = useState(false)
  const [booked, setBooked] = useState()
  const [ticket, setTicket] = useState()
  const [notPaid, setNotPaid] = useState(true)
  const [noHotelModality, setNoHotelModality] = useState(true)
  const [refreshHotels, setRefreshHotels] = useState(false)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/tickets`, { headers: { Authorization: `Bearer ${token}` } })
      .then(ans => {
        if (ans.data.status === 'PAID') {
          setNotPaid(false)
        }
        if (!ans.data.TicketType.isRemote && ans.data.TicketType.includesHotel) {
          setNoHotelModality(false)
        }
        setTicket(ans.data)
        axios.get(`${import.meta.env.VITE_API_URL}/booking`, { headers: { Authorization: `Bearer ${token}` } })
          .then(ans => {
            setFirstChosenRoom(ans.data.Room)
            setChosenRoom(ans.data.Room)
            setBookedAlready(true)
            setBookingId(ans.data.id)

            axios.get(`${import.meta.env.VITE_API_URL}/hotels/${ans.data.Room.hotelId}`, { headers: { Authorization: `Bearer ${token}` } })
              .then(ans => {
                setChosenHotel(ans.data)
                setReserved(true)
              })
              .catch(console.err)

          })
          .catch(err => {
            if (err.response?.status === 404) {
              setReserved(false)
              setBookedAlready(false)
            }
          })
          .finally(() => {
            setRefreshHotels(true)
          })

      })
      .catch(console.err)

  }, [token])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/booking/all`, { headers: { Authorization: `Bearer ${token}` } })
      .then(ans => {
        const resposta = ans.data
        setHotels(resposta)

      })
      .catch(err => console.error(err))
    setRefreshHotels(false)
  }, [refreshHotels, ticket])


  function handleReservation() {
    if (bookedAlready) {
      axios.put(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, { roomId: chosenRoom.id }, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          setBooked(firstChosenRoom?.id === chosenRoom.id ? RoomVacancy(hotels, chosenRoom) : RoomVacancy(hotels, chosenRoom) + 1)
          setRefreshHotels(true)
          setReserved(true)
        })
        .catch(err => {
          console.log(err)
          toast('Não foi possível trocar o quarto da sua reserva')
        })
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/booking`, { roomId: chosenRoom.id }, { headers: { Authorization: `Bearer ${token}` } })
        .then(ans => {
          setBooked(RoomVacancy(hotels, chosenRoom) + 1)
          setRefreshHotels(true)
          setFirstChosenRoom(chosenRoom)
          setBookedAlready(true)
          setReserved(true)

        })
        .catch(err => {
          console.error(err)
          if (err.response.status === 500) return toast("Você já tem um quarto reservado!")

        })
    }
  }
  function changeRoom() {
    setReserved(false)
    setFirstChosenRoom(chosenRoom)
    setChosenHotel()
    setChosenRoom()
  }
  return (
    <>
      {
        !ticket ? <TicketsWithNoHotelMessage >Você ainda não tem um ingresso reservado<br />Volte à escolha de ingressos</TicketsWithNoHotelMessage> :

        noHotelModality ? <TicketsWithNoHotelMessage >Sua modalidade de ingresso não inclui hospedagem<br />Prossiga para a escolha de atividades</TicketsWithNoHotelMessage> :
          notPaid ? <TicketsWithNoHotelMessage >Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</TicketsWithNoHotelMessage> :
            !reserved ?
              <>
                <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
                <StyledSubText >Primeiro, escolha seu hotel</StyledSubText>
                <LocalizationProvider>
                  <FormHotel >
                    {hotels.map(x => {
                      return <HotelsBtn reserved={reserved} setChosenRoom={setChosenRoom} chosenHotel={chosenHotel} setChosenHotel={setChosenHotel} setRoomOptions={setRoomOptions} key={x.id} id={x.id} rooms={x.Rooms} image={x.image} name={x.name} />
                    })
                    }
                  </FormHotel>
                </LocalizationProvider>
                {chosenHotel ?
                  <>
                    <StyledSubText>Ótima pedida! Agora escolha seu quarto:</StyledSubText>
                    <LocalizationProvider>
                      <FormHotel >
                        {roomOptions.map(x => {

                          return <RoomsBtn key={x.id} id={x.id} hotelId={x.hotelId} capacity={x.capacity} booked={x.Booking.length || 0} firstChosenRoom={firstChosenRoom} chosenRoom={chosenRoom} setChosenRoom={setChosenRoom} name={x.name} />
                        })}
                      </FormHotel>
                    </LocalizationProvider>
                  </>
                  : ''
                }
                {chosenHotel && chosenRoom ?
                  <ReserveButton onClick={handleReservation} >
                    <h1>RESERVAR INGRESSO</h1>
                  </ReserveButton>
                  : ""
                }
              </>
              :
              (<>
                <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
                <StyledSubText>Você já escolheu seu quarto:</StyledSubText>
                <LocalizationProvider>
                  <FormHotel >
                    <HotelsBtn reserved={reserved} setChosenRoom={setChosenRoom} chosenHotel={chosenHotel} booked={booked || RoomVacancy(hotels, chosenRoom)} setChosenHotel={setChosenHotel} chosenRoom={chosenRoom} setRoomOptions={setRoomOptions} id={chosenHotel.id} image={chosenHotel.image} name={chosenHotel.name} typeOfRoom={typeOfRoom(chosenRoom.capacity)} />

                  </FormHotel>
                  <ReserveButton onClick={changeRoom} >
                    <h1>TROCAR DE QUARTO</h1>
                  </ReserveButton>
                </LocalizationProvider>
              </>)}
    </>
  );
}

const StyledTypography = styled(Typography)`
    margin-bottom: 20px!important;
`;

const TicketsWithNoHotelMessage = styled.h2`
  width: 100%;
  height: 100%;
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

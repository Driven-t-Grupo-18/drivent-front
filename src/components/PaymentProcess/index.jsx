import styled from 'styled-components';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import { SubText } from '../SubText/SubText';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';
import { BookingButton } from '../BookingButton/BookingButton';
import axios from 'axios';
import useToken from '../../hooks/useToken';
import Payment from '../../pages/Dashboard/Payment';

dayjs.extend(CustomParseFormat);

export default function PaymentOptions({setStatus, setTicket}) {
    const token = useToken()
    const [userTicket, setUserTicket] = useState({ ticketStatus: '', ticketValue: '', includesHotel: false, isRemote: false });
    const [ticketModality, setTicketModality] = useState(null);
    const [showHotel, setShowHotel] = useState(null);
    const [ticketsTypes, setTicketsTypes] = useState([]);
    const [priceRemote, setPriceRemote] = useState(0);
    const [priceNotRemote, setPriceNotRemote] = useState(0);
    const [priceHotel, setPriceHotel] = useState(0);
    const [callPayment, setCallPayment] = useState(false);
    const [ticketType, setTicketType] = useState(undefined);

    const mockCard = [
        { name: 'Presencial', price: priceNotRemote, isRemote: false },
        { name: 'Online', price: priceRemote, isRemote: true },
    ];

    const mockHospedagem = [
        { name: 'Sem Hotel', price: 0, includesHotel: false },
        { name: 'Com Hotel', price: priceHotel, includesHotel: true },
    ];

    const totalPrice = () => {
        let price = mockCard.find((item) => item.name === ticketModality).price;
        if (showHotel) {
            price += mockHospedagem.find((item) => item.name === showHotel).price;
        }

        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/tickets/types`, { headers: { Authorization: `Bearer ${token}` } })

            .then((ans) => {
                const response = ans.data
                setTicketsTypes(response)
                const online = response.find((tickets) => tickets.isRemote === true);
                const withHotel = response.find((tickets) => tickets.isRemote === false && tickets.includesHotel === true);
                const noHotel = response.find((tickets) => tickets.isRemote === false && tickets.includesHotel === false);
                setPriceRemote(online.price);
                setPriceNotRemote(noHotel.price);
                setPriceHotel(Number(withHotel.price) - Number(noHotel.price));
            })

            .catch(console.error)
    }, [token])

    function defineTicketTypes() {
        const ticket = ticketsTypes.find((ticket) => ticket.includesHotel === userTicket.includesHotel && ticket.isRemote === userTicket.isRemote)
        return ticket.id;
    }
    
    function ticketRegister(){
        setTicket({price: totalPrice(), name: ticketModality === 'Online' ?  'Online' :`${ticketModality} + ${showHotel}`, userTicket})
    }
    return (
        <>
            {callPayment ? (
                <Payment userTicket={userTicket} ticketType={ticketType} />
            ) : (
                <>
                    <Text title="Ingresso e pagamento" />
                    <SubText title="Primeiro, escolha sua modalidade de ingresso" />

                    <StyledCard >
                        {mockCard.map((item, index) => (
                            <Card
                                key={index}
                                name={item.name}
                                price={`R$${item.price}`}
                                isRemote={item.isRemote}
                                selectedName={ticketModality}
                                setSelectedName={setTicketModality}
                                setUserTicket={setUserTicket}
                                userTicket={userTicket}
                            />
                        ))}
                    </StyledCard>

                    {ticketModality === 'Presencial' && (
                        <>
                            <SubText title="Ótimo! Agora escolha sua modalidade de hospedagem" />
                            <StyledCard>
                                {mockHospedagem.map((item, index) => (
                                    <Card
                                        key={index}
                                        name={item.name}
                                        includesHotel={item.includesHotel}
                                        price={`+R$${item.price}`}
                                        selectedName={showHotel}
                                        setSelectedName={setShowHotel}
                                        setUserTicket={setUserTicket}
                                    />
                                ))}
                            </StyledCard>
                        </>
                    )}

                    {(ticketModality === 'Online' || showHotel) && (
                        <>
                            <SubText title={`Fechado! O total ficou em ${totalPrice()}. Agora é só confirmar`} />
                            <BookingButton id={defineTicketTypes()} button="RESERVAR INGRESSO" ticketRegister={ticketRegister} setCallPayment={setCallPayment} setStatus={setStatus} />
                        </>
                    )}
                </>
            )}
        </>
    );
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;
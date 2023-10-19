
import styled from 'styled-components';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import { SubText } from '../SubText/SubText';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';
import { BookingButton } from '../BookingButton/BookingButton';

dayjs.extend(CustomParseFormat);

const mockCard = [
    { name: 'Presencial', price: 250 },
    { name: 'Online', price: 100 },
];

const mockHospedagem = [
    { name: 'Sem Hotel', price: 0 },
    { name: 'Com Hotel', price: 350 },
];

export default function PaymentOptions() {
    const [userTicket, setUserTicket] = useState({ ticketStatus: '', ticketValue: '', includesHotel: false, isRemote: false });
    const [ticketModality, setTicketModality] = useState(null);
    const [showHotel, setShowHotel] = useState(null);

    const totalPrice = () => {
        let price = mockCard.find((item) => item.name === ticketModality).price;
        if (showHotel) {
            price += mockHospedagem.find((item) => item.name === showHotel).price;
        }

        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    };

    return (
        <>
            <Text title="Ingresso e pagamento" />
            <SubText title="Primeiro, escolha sua modalidade de ingresso" />

            <StyledCard >
                {mockCard.map((item, index) => (
                    <Card
                        key={index}
                        name={item.name}
                        price={`R$${item.price},00`}
                        selectedName={ticketModality}
                        setSelectedName={setTicketModality}
                        setUserTicket={setUserTicket}
                        userTicket={userTicket}
                    />
                ))};
            </StyledCard>

            {ticketModality === 'Presencial' && (
                <>
                    <SubText title="Ótimo! Agora escolha sua modalidade de hospedagem" />
                    <StyledCard>
                        {mockHospedagem.map((item, index) => (
                            <Card
                                key={index}
                                name={item.name}
                                price={`R$${item.price},00`}
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
                    <BookingButton button="RESERVAR INGRESSO" />
                
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

import axios from 'axios';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
export const BookingButton = ({ button, id, setCallPayment, setStatus, ticketRegister }) => {

  const token = useToken()

  function handleClick(e) {
    e.preventDefault();
    console.log(id);
    axios
      .post(`${import.meta.env.VITE_API_URL}/tickets`, {
        ticketTypeId: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        toast('Ticket reservado com sucesso!');
        setCallPayment(true)
        setStatus('chose')
        ticketRegister()

      })
      .catch(err => {
        console.error(err);
        toast('Erro ao reservar Ticket');
      });
  }

    return (
        <>
            <StyledButton  onClick={handleClick}>{button}</StyledButton>
        </>
    );
};

const StyledButton = styled.button`
  border: none;
  margin: 10px 0;
  width: 185px;
  height: 40px;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px 0px #00000040;
  &:hover {
    cursor: pointer;
  }
`;
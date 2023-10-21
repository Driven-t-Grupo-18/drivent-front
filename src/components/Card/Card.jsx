import styled from 'styled-components';

const TicketOptions = [
  { name: 'Presencial', isRemote: false, includesHotel: false },
  { name: 'Online', isRemote: true, includesHotel: false },
  { name: 'Com Hotel', isRemote: false, includesHotel: true },
  { name: 'Sem Hotel', isRemote: false, includesHotel: false },
];

// eslint-disable-next-line react/prop-types
export const Card = ({ disabled, name, price, selectedName, setSelectedName, setUserTicket, reserved}) => {
  const option = TicketOptions.find((option) => option.name === name);

  const handleClick = () => {
    if (selectedName === name) {
      setSelectedName(null);
      return;
    }
    setUserTicket({ isRemote: option.isRemote, includesHotel: option.includesHotel });
    setSelectedName(name);
  };

  return (
    <StyledContainer reserved={reserved} onClick={disabled ? ()=>{} : handleClick} selected={selectedName === name}>
      <StyledName>{name}</StyledName>
      <StyledPrice>{price}</StyledPrice>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: ${props => props.reserved === 'reservado' ? '290px' : '145px'};
  height: 145px;
  border-radius: 20px;
  border: solid 1px #cecece;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: ${(props) => (props.selected ? '#FFEED2' : '#FFFFFF')};
  &:hover{
        background-color: ${(props) => (props.selected === true ? "#ffeed29d" : "#eaeaea")};
        transition: 0.5s;
        opacity: 0.7;
        cursor: pointer;
  }
`;

const StyledName = styled.p`
  font-size: 16px;
  color: #454545;
  font-weight: 400;
`;

const StyledPrice = styled.p`
  font-size: 14px;
  color: #898989;
  font-weight: 400;
`;

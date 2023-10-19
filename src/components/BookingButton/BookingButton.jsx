import styled from 'styled-components';

export const BookingButton = ({ button }) => {
    return (
        <>
            <StyledButton>{button}</StyledButton>
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
  :hover {
    cursor: pointer;
  }
`;
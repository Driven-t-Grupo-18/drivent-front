import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
export const Card = ({ name, price }) => {
  return (
    <StyledContainer >
      <StyledName>{name}</StyledName>
      <StyledPrice>R$ {price}</StyledPrice>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 290px;
  height: 108px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: #FFEED2;
`;

const StyledName = styled.p`
  font-size: 16px;
  color: #454545;
  font-weight: 400;
`;

const StyledPrice = styled.p`
    margin-top: 5px;
    font-size: 14px;
    color: #898989;
    font-weight: 400;
`;

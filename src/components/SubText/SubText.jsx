import styled from 'styled-components';
import Typography from '@mui/material/Typography';

export const SubText = ({ title }) => {
  return (
    <>
      <StyledSubText variant="h6">
        {title}
      </StyledSubText>
    </>
  );
};

const StyledSubText = styled(Typography)`
    margin-top: 35px !important;
    text-align: left;
    color: #8E8E8E;
    margin-bottom: 5px !important;
    span{
        font-weight: 600;
    }
`

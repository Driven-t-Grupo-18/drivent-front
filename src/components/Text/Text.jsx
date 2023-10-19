import styled from 'styled-components';
import Typography from '@mui/material/Typography';

export const Text = ({ title }) => {
  return (
    <>
      <StyledText variant='h4'>
        {title}
      </StyledText>
    </>
  );
};


const StyledText = styled(Typography)`
    margin-bottom: 20px!important;
`;
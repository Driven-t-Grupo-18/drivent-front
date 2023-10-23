import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

function nameToPlaceholder(name){
  switch (name){
    case 'name':
      return 'Name';
    case 'expiry':
      return 'Valid Thru';
    case 'cvc':
      return 'CVC';
    case 'number':
      return 'Card Number'
  }
}
export default function Input({ mask = '', maskChar = '', formatChars, variant = 'outlined', value='', onChange = () => 0, ...props }) {
  return (mask || maskChar) ? (
    <InputMask  placeholder={nameToPlaceholder(props.name)} name={props.name} mask={mask} maskChar={maskChar} onFocus={props.onFocus} onChange={onChange} {...(formatChars && { formatChars })}>
      {(props) => <StyledTextField  {...props} variant={variant} />}
    </InputMask>
  ) : (
    <StyledTextField {...props} value={value} onChange={onChange} variant={variant} />
  );
}

const StyledTextField = styled(TextField)`
  margin-top: 8px !important;
  input{
    height: 15px;
  }
`;

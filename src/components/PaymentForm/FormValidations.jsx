const validations = {
    number: {
      custom: {
        isValid: (value) => parseInt(value?.length, 10) === 19,
        message: 'Número de cartão inválido',
      },
    },
  
    name: {
      custom: {
        isValid: (value) => isValidString(value),
        message: 'Nome inválido',
      },
    },
  
    expirationDate: {
      custom: {
        isValid: (value) => isValidExpirationDate(value),
        message: 'Data de expiração inválida ',
      },
    },
  
    cvc: {
      custom: {
        isValid: (value) => parseInt(value?.length, 10) === 3,
        message: 'CVC inválido',
      },
    },
  
  };
  
  export default validations;
  
  function isValidString(value) {
    return value || value?.trim();
  }
  
  function isValidExpirationDate(value) {
    if (!value) return false;
  
    const dateParts = value.split('/');
    if (dateParts.length > 2) return false;
  
    const month = parseInt(dateParts[0], 10);
    const validMonth = month > 0 && month < 13;
  
    if (!validMonth) return false;
  
    const regexDateFormat = /^\d{2}\/\d{2}$/;
    const isValidDateFormat = regexDateFormat.test(value);
  
    return isValidDateFormat;
  }
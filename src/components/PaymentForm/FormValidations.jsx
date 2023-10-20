const validations = {
    number: {
      custom: {
        isValid: (value) => parseInt(value?.length, 10) === 19,
        message: 'Digite um número de cartão válido',
      },
    },
  
    name: {
      custom: {
        isValid: (value) => isValidString(value),
        message: 'Digite um nome válido',
      },
    },
  
    expirationDate: {
      custom: {
        isValid: (value) => isValidExpirationDate(value),
        message: 'Digite uma data de expiração válida - EX: (11/23 - MÊS/ANO)',
      },
    },
  
    cvv: {
      custom: {
        isValid: (value) => parseInt(value?.length, 10) === 3,
        message: 'Digite um cvv válido',
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
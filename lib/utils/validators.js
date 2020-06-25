import { validator } from '../helpers';

const { isEmail, minLength } = validator;

const validate = (validation) => {
  return Object.keys(validation)
    .map((field) => validation[field].isValid)
    .every(Boolean);
};

const getFieldErrors = (fields) => {
  return Object.entries(fields).reduce(
    (errors, [fieldName, { isValid, errorMessage }]) => {
      if (isValid) return errors;

      return { ...errors, ...{ [fieldName]: errorMessage } };
    },
    {}
  );
};

export const validateAuthForm = (fields, mode) => {
  const { username, email, password } = fields;
  const validation = {
    ...(mode === 'signup' && {
      username: {
        isValid: minLength(username, 3),
        errorMessage: 'Name must be at least 3 characters',
      },
    }),
    email: {
      isValid: isEmail(email),
      errorMessage: 'Invalid email address',
    },
    password: {
      isValid: minLength(password, 8),
      errorMessage: 'Password must be at least 8 characters',
    },
  };
  const isValid = validate(validation);
  const fieldErrors = getFieldErrors(validation);
  return { isValid, fieldErrors };
};

export const validateContactForm = (fields) => {
  const { name, email, phone, message } = fields;
  const validation = {
    name: {
      isValid: minLength(name, 3),
      errorMessage: 'Name must be at least 3 characters',
    },
    email: {
      isValid: isEmail(email),
      errorMessage: 'Invalid email address',
    },
    phone: {
      isValid: minLength(phone, 8),
      errorMessage: 'Invalid phone number',
    },
    message: {
      isValid: minLength(message, 30),
      errorMessage: 'Too short!',
    },
  };
  const isValid = validate(validation);
  return { isValid, fieldErrors: !isValid && getFieldErrors(validation) };
};

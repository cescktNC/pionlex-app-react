// Validación de campos obligatorios
const validateRequired = (value, fieldName) => {
  if ( !value || value.trim() === '' ) {
    return `El campo ${fieldName} es obligatorio`;
  }
  return null;
};

// Validación del campo `email` como obligatorio y formato correcto
const validateEmail = email => {
  if ( !email || email.trim() === '' ) {
    return 'El correo electrónico es obligatorio';
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "El correo electrónico no es válido";
  }

  return null;
};

// Validación del campo 'password' como obligatorio y longitud correcta
const validatePassword = password => {
  if ( !password || password.trim() === '' ) {
    return 'La contraseña es obligatoria';
  }

  if ( password.length < 8 ) {
    return 'La contraseña debe tener almenos 8 carácteres';
  }

  return null;
};

const validatePasswordConfirmation = (password, passwordConfirmation) => {
  if ( password !== passwordConfirmation ) {
    return 'Las contraseñas no coinciden';
  }

  return null;
};

// Validación del formulario de login (login form)
export const validateLoginForm = values => {
  let errors = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

// Validación del formulario de contraseña olvidada (forgot password form)
export const validateForgotPasswordForm = values => {
  let errors = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  return errors;
}

// Validación del formulario de restablecimiento de contraseña (password reset form)
export const validatePasswordResetForm = values => {
  let errors = {};

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  const passwordConfirmationError = validatePassword(values.password_confirmation);
  if (passwordConfirmationError) errors.passwordConfirmation = passwordConfirmationError;

  if (Object.keys(errors).length === 0) {
    const passwordMatchError = validatePasswordConfirmation(values.password, values.password_confirmation);
    if (passwordMatchError) errors.password = passwordMatchError;
  }

  return errors;
}
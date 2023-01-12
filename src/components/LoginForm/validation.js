import emailValidator from 'email-validator';

export function validateEmail(email) {
  if (!email) {
    return "Email is required";
  }
  return emailValidator.validate(email) ? "" : "Email is not valid!";
}

export const validatePassword = (password) => {
  let error = "";

  if (password.length < 8) {
    error = "Password must be at least 8 characters";
    return error;
  }
  
  if (!password.match(/[a-z]/)) {
    error = "Password must contain at least one lowercase letter";
    return error;
  }
  
  if (!password.match(/[A-Z]/)) {
    error = "Password must contain at least one uppercase letter";
    return error;
  }
  
  if (!password.match(/[0-9]/)) {
    error = "Password must contain at least one numerical digit";
    return error;
  }
  
  if (!password.match(/[!@#$%^&*]/)) {
    error = "Password must contain at least one special character (!@#$%^&*)";
    return error;
  }
  return error;
}
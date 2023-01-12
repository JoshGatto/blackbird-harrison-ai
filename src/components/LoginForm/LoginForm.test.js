import { render, screen } from '@testing-library/react';
import LoginForm from '.';
import { validateEmail } from './validation';
import { validatePassword } from './validation';
import emailValidator from 'email-validator';  // import the email-validator package

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

jest.mock('email-validator', () => ({
  validate: jest.fn()
}));

describe('validateEmail', () => {
  it('should return "Email is required" if email is empty', () => {
    expect(validateEmail('')).toBe('Email is required');
  });

  it('should return "Email is not valid!" if email is invalid', () => {
    emailValidator.validate.mockReturnValueOnce(false);
    expect(validateEmail('invalid@email')).toBe('Email is not valid!');
  });

  it('should return "" if email is valid', () => {
    emailValidator.validate.mockReturnValueOnce(true);
    expect(validateEmail('valid@email.com')).toBe('');
  });
});

describe('validatePassword', () => {
  it('should return "Password must be at least 8 characters" if the password is less than 8 characters', () => {
    expect(validatePassword('short')).toBe('Password must be at least 8 characters');
  });

  it('should return "Password must contain at least one lowercase letter" if the password does not contain a lowercase letter', () => {
    expect(validatePassword('NOLOWERCASE')).toBe('Password must contain at least one lowercase letter');
  });

  it('should return "Password must contain at least one uppercase letter" if the password does not contain an uppercase letter', () => {
    expect(validatePassword('nouppercase')).toBe('Password must contain at least one uppercase letter');
  });

  it('should return "Password must contain at least one numerical digit" if the password does not contain a digit', () => {
    expect(validatePassword('Nodigits')).toBe('Password must contain at least one numerical digit');
  });

  it('should return "Password must contain at least one special character (!@#$%^&*)" if the password does not contain a special character', () => {
    expect(validatePassword('Nopunctuation1')).toBe('Password must contain at least one special character (!@#$%^&*)');
  });
});

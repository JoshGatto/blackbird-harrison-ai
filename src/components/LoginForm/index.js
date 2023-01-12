import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';
import emailValidator from 'email-validator';

export function validateEmail(email) {
  if (!email) {
    return "Email is required";
  }
  return emailValidator.validate(email) ? "" : "Email is not valid!";
}

export const validatePassword = (password) => {
    let error = "";
    if (!password) {
        error = "Password is required";
        return error;
    }
    if (password.length < 8) {
        error = "Password must be at least 8 characters";
    } else if (!password.match(/[a-z]/)) {
        error = "Password must contain at least one lowercase letter";
    } else if (!password.match(/[A-Z]/)) {
        error = "Password must contain at least one uppercase letter";
    } else if (!password.match(/[0-9]/)) {
        error = "Password must contain at least one numerical digit";
    } else if (!password.match(/[!@#$%^&*]/)) {
        error = "Password must contain at least one special character (!@#$%^&*)";
    }
    return error;
};


export default function LoginForm() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
  
    setEmailError(emailError);
    setPasswordError(passwordError);
    
    if (!emailError && !passwordError) {
      setShowAlert("Login Successful");
      setTimeout(() => setShowAlert(false), 6000);
    } else {
      setShowAlert(false);
    }
  }  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    validateForm(event);
  };

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!passwordError}
              helperText={passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

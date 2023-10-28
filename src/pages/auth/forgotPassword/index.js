import * as React from 'react';

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography, 
  createTheme, 
  ThemeProvider 
} from '@mui/material';



import GridLink from '@/components/elements/gridLink';

import icon from '@/assets/marca-taugor.png';

import './style.css';
import forgotPass from '@/services/auth/forgotPass';

const theme = createTheme();

export default function ForgotPassword() {
  const uri = window.location.href.split('forgot-password')[0];

  const [message, setMessage] = React.useState({ messageUser: '', error: false, });

  const handleSubmit = async (event) => forgotPass(event, setMessage);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <img src={icon} alt="icon business" width={309} height={109} className="app-icon" />
      </AppBar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Grid sx={{display:'flex',flexDirection:'column', alignItems:'center'}}>
            
          <Typography component="h1" variant="h5">
            Recuperar conta
          </Typography>
          </Grid>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Seu e-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Typography component="h6" variant="h6" color={message.error ? 'red' : 'green'} fontSize={15}>
              {message.messageUser}
            </Typography>
            <Button type="submit" fullWidth variant="contained"sx={{ mt: 3, mb: 2 }}>
              Enviar email
            </Button>
          </Box>
          
        </Box>
        <Grid container justifyContent="space-between">
              <Grid>
                <GridLink link={uri + "login"} title="Cancelar" />
              </Grid>
            </Grid>

      </Container>
    </ThemeProvider>
  );
}

import React from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './style.css';

import icon from '@/assets/marca-taugor.png';
import GridLink from "@/components/elements/gridLink";
import { useNavigate } from "react-router-dom";

import register from "@/services/auth/registerNewUser";
import useStore from "@/store";

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const uri = window.location.href.split("register")[0];

  const incrementUser = useStore((state) => state.increaseUser);

  const userState = useStore((state) => state.user);
  const handleSubmit = async (event) =>
    register(event, setErrorMessage, navigate, incrementUser, userState);

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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Seu nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Seu sobrenome"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Seu e-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Sua senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <Typography component="h6" variant="h6" color={"red"} fontSize={15}>
              {errorMessage}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <GridLink link={uri + "login"} title="Já possuo cadastro" />
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

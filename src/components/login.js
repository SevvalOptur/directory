import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState } from 'react';
import Axios from 'axios' 

const theme = createTheme();

// export default function SignIn() 
const Login = () => {

  const [userMailReg, setUserMailReg] = useState("");
  const [userPassReg, setUserPassReg] = useState("");
  const [regStatus, setRegStatus] = useState("");

  const newUser = {
    email: userMailReg,
    password: userPassReg
  };

  // console.log("aaaa", newUser.email)
  const login = () =>{
    Axios.post('http://localhost:5000/login', newUser )
    .then((response) => {
      if(response.data){
        setRegStatus(response.data)
        if(response.data.status === "ok"){ 
          window.localStorage.setItem("loggedIn", true)
          window.localStorage.setItem("token", response.data.token)
          window.location.href="./dashboard";          
        }
        // navigate.push("/index")

      }else{
        setRegStatus("Giriş yapılamadı.")
      }
    });
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Giriş
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Mail Adresininiz"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setUserMailReg(e.target.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setUserPassReg(e.target.value)
              }}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography component="h4" variant="h5" className='alert' style={{ color:"red", background:"rgb(253, 237, 237)", padding:'0 10px', fontSize:'15px' }}>
                  {regStatus}
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={login}
              sx={{ float:'right', mt: 3, mb: 2, bgcolor: 'success.main',":hover": {bgcolor: "#37953c"} }}>
              Giriş
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item  >
                <Link href="/register"  variant="body2" sx={{ textDecoration:'none'}}>
                  {"Üyeliğiniz yok mu?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
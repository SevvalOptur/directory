import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import   {useState } from 'react';
import Axios from 'axios' 
const theme = createTheme();

export default function SignUp() {

  const [userNameReg, setUserNameReg] = useState("");
  const [userMailReg, setUserMailReg] = useState("");
  const [userNumReg, setUserNumReg] = useState("");
  const [userPassReg, setUserPassReg] = useState("");
  const [regStatus, setRegStatus] = useState("");

  const newUser = {
    name: userNameReg,
    email: userMailReg,
    number: userNumReg,
    password: userPassReg
  };
  console.log("aaaa", newUser.email)
  const register= () =>{
    Axios.post('http://localhost:5000/register', newUser )
    .then((response) => {
      if(response.data){
        setRegStatus(response.data)
      }else{
        setRegStatus("Kaydınız oluşturulamadı.")
      }
      //console.log("aaa",response);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* en dış div */}
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            {/* icon */}
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* baslık */}
          <Typography component="h1" variant="h5">
            Kayıt Ol
          </Typography>

          {/* form yapısı baslangic */}
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Adınız"
                  autoFocus
                  onChange={(e) => {
                    setUserNameReg(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Mail Adresiniz"
                  name="email"
                  onChange={(e) => {
                    setUserMailReg(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="number"
                  label="Telefon Numaranız"
                  name="number"
                  onChange={(e) => {
                    setUserNumReg(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setUserPassReg(e.target.value)
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography component="h4" variant="h5" className='alert' style={{ color:"red", background:"rgb(253, 237, 237)", padding:'0 10px', fontSize:'15px', marginTop:'10px' }}>
                  {regStatus}
                </Typography>
              </Grid>
            </Grid>
            {/* submit buton */}
            <Button onClick={register} variant="contained" sx={{ float: "right", mt: 3, mb: 2 , bgcolor:"success.main", ":hover": {bgcolor: "#37953c"}}}>
              Kayıt Ol
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2" sx={{ textDecoration:'none' }}>
                  Giriş Yapmak için
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Container, Typography, TextField, Button, Box, Grid, IconButton, InputAdornment, FormControl, InputLabel, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';

const Login = () => {
  let initial = {
    email: '',
    password: '',
  }
  const [loginData, setLoginData] = useState(initial);
  const [showPassword, SetShowPassword] = useState(false);
  const { loginUser, user, loading } = useAuth();
  const navigate = useNavigate()
  const { email, password } = loginData;
  const handleInput = e => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    if (user.email) {
      navigate('/all_job_post');
    }
  }, [user, navigate])
  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(loginData);
    // setLoginData(initial)
  }
  return (
    <Container>
      <Typography variant="h2"
        sx={{ fontSize: { xs: '18px', md: '32px' }, fontWeight: 'bold', marginTop: '60px', position: 'relative' }}
        align='center'
        className='title'
      >
        Please Login...
      </Typography>
      <form style={{ marginTop: '30px', margin: '60px auto 0 auto' }}
        onSubmit={handleLogin}
      >
        <Box sx={{ width: { md: '40%', xs: '100%' }, m: 'auto' }}>
          <Grid sx={{ mb: 4 }}>
            <Grid item>
              <TextField
                required
                fullWidth
                label="Email"
                variant="standard"
                name='email'
                type='email'
                value={email}
                onChange={handleInput}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 4 }}>
            <Grid item>
              <FormControl sx={{ width: '100%' }} variant="standard">
                <InputLabel>Password*</InputLabel>
                <Input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  name='password'
                  onChange={handleInput}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => SetShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Typography align='center' component='div' sx={{ mt: 6, mb: 1 }}>
            <Button
              disabled={loading}
              sx={{ padding: '8px 30px', fontSize: '14px', mt: 'auto' }}
              variant='contained'
              type='submit'
            >Login</Button>
          </Typography>
          <Typography align='center'>
            <Link to="/sign_up">Already Have an account?</Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default Login; 
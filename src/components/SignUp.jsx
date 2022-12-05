import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Container, Typography, TextField, Button, Box, Grid, FormControl, InputLabel, InputAdornment, Input, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../customHooks/useAuth';

const SignUp = () => {
  let initial = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  }
  const { registerUser, loading, user } = useAuth();
  const [signUpData, setSignUpData] = useState(initial);
  const [showPassword, SetShowPassword] = useState(false);
  const navigate = useNavigate()
  const { name, email, password, confirm_password } = signUpData;
  const handleInput = e => {
    setSignUpData({
      ...signUpData,
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
    if (signUpData.password.length < 6) {
      return toast.error('Password minimum six character');
    } if (signUpData.password !== signUpData.confirm_password) {
      return toast.error('Password did not match');
    } else {
      await registerUser(signUpData);
      setSignUpData(initial);
    }
  }
  return (
    <Container>
      <Typography variant="h2"
        sx={{ fontSize: { xs: '18px', md: '32px' }, fontWeight: 'bold', marginTop: '60px', position: 'relative' }}
        align='center'
        className='title'
      >
        Please Register...
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
                label="Full Name"
                variant="standard"
                name='name'
                type='text'
                value={name}
                onChange={handleInput}
              />
            </Grid>
          </Grid>
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
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
              <FormControl sx={{ width: '100%' }} variant="standard">
                <InputLabel>Confirm Password*</InputLabel>
                <Input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={confirm_password}
                  name='confirm_password'
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
            >Sign Up</Button>
          </Typography>
          <Typography align='center'>
            <Link to="/login">Have no account?</Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default SignUp; 
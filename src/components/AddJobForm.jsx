import React, { useState } from 'react';
import { Container, TextField, Grid, Typography, Select, MenuItem, InputLabel, Button, FormControl } from '@mui/material';
import useAuthAction from '../actions/authAction';
import useAuth from '../customHooks/useAuth';

const AddJobForm = () => {
   const { user } = useAuth();
   let initialData = {
      company_name: '',
      department_name: '',
      position_name: '',
      overview: '',
      responsibilities: '',
      requirements: '',
      type: '',
      level: '',
      shift: '',
      location: '',
   }
   const [formData, setFormData] = useState(initialData);
   const { company_name, department_name, position_name, overview, responsibilities, requirements, type, level, shift, location } = formData
   const { addNewJob } = useAuthAction();
   const handleInput = e => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }
   const newJob = {
      user, category: department_name, post: { company_name, position_name, overview, responsibilities, requirements, type, level, shift, location }
   }
   const handleSubmit = e => {
      e.preventDefault();
      addNewJob(newJob)
      console.log(newJob);
   }
   const department = ['Sales & Marketing', 'Digital Marketing', 'Management', 'Human Resource', 'Administration', 'Development', 'Engineering', 'Creative'];
   return (
      <div>
         <Container>
            <Typography variant="h2"
               sx={{ fontSize: { xs: '18px', md: '32px' }, fontWeight: 'bold', marginTop: '60px', position: 'relative' }}
               align='center'
               className='title'
            >
               Add New Job Post
            </Typography>
            <form style={{ marginTop: '30px', width: '80%', margin: '60px auto 0 auto' }}
               onSubmit={handleSubmit}
            >
               <Container>
                  <Grid container spacing={5} sx={{ mb: 4 }}>
                     <Grid item xs={4}>
                        <TextField
                           required
                           fullWidth
                           id="standard-basic"
                           label="Company Name"
                           variant="standard"
                           name='company_name'
                           value={company_name}
                           onChange={handleInput} />
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl fullWidth variant="standard">
                           <InputLabel id="demo-simple-select-standard-label">Department*</InputLabel>
                           <Select
                              required
                              id="standard-basic"
                              name='department_name'
                              value={department_name}
                              onChange={handleInput} >
                              {department.map((item, index) => (
                                 <MenuItem key={index} value={item}>{item}</MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <TextField
                           required
                           fullWidth
                           id="standard-basic"
                           label="Position Name"
                           variant="standard"
                           name='position_name'
                           value={position_name}
                           onChange={handleInput} />
                     </Grid>
                  </Grid>

                  <Grid container spacing={5} sx={{ mb: 4 }}>
                     <Grid item xs={12}>
                        <FormControl fullWidth >
                           <TextField
                              required
                              variant="standard"
                              label='Overview'
                              name='overview'
                              value={overview}
                              multiline
                              maxRows={Infinity}
                              onChange={handleInput}
                           />
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl fullWidth >
                           <TextField
                              required
                              variant="standard"
                              label='Responsibilities'
                              name='responsibilities'
                              value={responsibilities}
                              multiline
                              maxRows={Infinity}
                              onChange={handleInput}
                           />
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl fullWidth >
                           <TextField
                              required
                              variant="standard"
                              label='Requirements'
                              name='requirements'
                              value={requirements}
                              multiline
                              maxRows={Infinity}
                              onChange={handleInput}
                           />
                        </FormControl>
                     </Grid>
                  </Grid>
                  <Grid container spacing={5} sx={{ mb: 4 }}>
                     <Grid item xs={6} md={3}>
                        <FormControl fullWidth variant="standard">
                           <InputLabel id="demo-simple-select-standard-label">Type*</InputLabel>
                           <Select
                              required
                              id="standard-basic"
                              name='type'
                              value={type}
                              onChange={handleInput} >
                              <MenuItem value='Full Time'>Full Time</MenuItem>
                              <MenuItem value='Part Time'>Part Time</MenuItem>
                              <MenuItem value='Contractual'>Contractual</MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={6} md={3}>
                        <FormControl fullWidth variant="standard">
                           <InputLabel id="demo-simple-select-standard-label">Level*</InputLabel>
                           <Select
                              required
                              id="standard-basic"
                              name='level'
                              value={level}
                              onChange={handleInput}>
                              <MenuItem value='Junior'>Junior</MenuItem>
                              <MenuItem value='Mid-Level'>Mid-Level</MenuItem>
                              <MenuItem value='Senior'>Senior</MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={6} md={3}>
                        <FormControl fullWidth variant="standard">
                           <InputLabel id="demo-simple-select-standard-label">Shift*</InputLabel>
                           <Select
                              required
                              id="standard-basic"
                              name='shift'
                              value={shift}
                              onChange={handleInput}  >
                              <MenuItem value='Day'>Day</MenuItem>
                              <MenuItem value='Evening'>Evening</MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={6} md={3}>
                        <TextField
                           required
                           fullWidth
                           id="standard-basic"
                           label="Location"
                           variant="standard"
                           name='location'
                           value={location}
                           onChange={handleInput} />
                     </Grid>
                  </Grid>
                  <Typography align='center' component='div' sx={{ mt: 6 }}>
                     <Button
                        sx={{ padding: '8px 30px', fontSize: '14px', mt: 'auto' }}
                        variant='contained'
                        type='submit'
                     >Add Post</Button>
                  </Typography>
               </Container>
            </form>
         </Container>
      </div>
   );
};

export default AddJobForm;
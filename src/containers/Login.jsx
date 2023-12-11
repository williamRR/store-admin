import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, useTheme } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/');
  //   }
  // }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await login(data); // Aquí puedes realizar la lógica de inicio de sesión
  };

  const theme = useTheme();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.background,
          width: '80%',
          height: '40vh',
          marginTop: '10vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '40px',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.75)',
          '&:hover': {
            backgroundColor: theme.palette.secondary.background,
          },
        }}
      >
        <TextField
          label='Email'
          {...register('email', { required: 'Campo requerido' })}
          error={!!errors.email}
          helperText={errors.email?.message}
          variant='outlined'
          color='secondary'
          sx={{
            width: '50%',
            marginBottom: '20px',
            '&:hover fieldset': {
              borderColor: 'black',
            },
          }}
          inputProps={{
            style: { color: 'black' },
          }}
        />

        <TextField
          label='Contraseña'
          type='password'
          {...register('password', { required: 'Campo requerido' })}
          error={!!errors.password}
          helperText={errors.password?.message}
          variant='outlined'
          color='secondary'
          sx={{
            width: '50%',
            marginBottom: '20px',
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&:hover:not(.Mui-disabled)': {
              borderColor: 'black',
              backgroundColor: theme.palette.secondary.background,
            },
          }}
          inputProps={{
            style: { color: 'black' },
          }}
        />

        <Button
          type='submit'
          variant='contained'
          color='third'
          sx={{
            width: '50%',
            marginBottom: '20px',
            color: theme.palette.primary.third,
            '&:hover': {
              backgroundColor: theme.palette.secondary.background,
            },
          }}
        >
          Iniciar Sesión
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;

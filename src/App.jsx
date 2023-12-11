import * as React from 'react';
import Container from '@mui/material/Container';
import AppRouter from './router';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex', // Usar flexbox
        flexDirection: 'row',
      }}
    >
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <AppRouter />
    </Container>
  );
}

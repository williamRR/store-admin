import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  Typography,
} from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, content }) => {
  const theme = useTheme();

  return (
    <Dialog open={Boolean(open)} onClose={onClose}>
      <DialogTitle
        style={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          height: '100px',
          padding: '20px',
          backgroundColor: theme.palette.secondary.background,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography
          sx={{
            marginTop: '20px',
            color: theme.palette.primary.contrastText,
          }}
        >
          {content}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: theme.palette.secondary.background,
          color: theme.palette.primary.contrastText,
          padding: '20px',
        }}
      >
        <Button
          onClick={onClose}
          variant='outlined'
          style={{
            // backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.contrastText,
          }}
          color='primary'
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

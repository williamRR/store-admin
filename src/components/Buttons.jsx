import { useTheme } from '@emotion/react';
import { Button, Container } from '@mui/material';
import React from 'react';

const Buttons = ({
  canApplyToOwnStore,
  handleDelete,
  roles,
  selected,
  setEditing,
  handleApply,
  setEntityModalOpen,
  setSelected,
  storeId,
}) => {
  const theme = useTheme();
  return (
    console.log('selected'),
    console.log(selected),
    (
      <Container
        sx={{
          display: 'flex', // Agrega esta línea para habilitar flexbox
          width: '100v%',
          justifyContent: 'space-around',
          alignItems: 'center', // Alinea los elementos verticalmente en el centro
          padding: '28px',
          backgroundColor: theme.palette.secondary.background,
        }}
      >
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={() => {
            setEditing(false);
            setSelected({});
            setEntityModalOpen(true);
          }}
        >
          Agregar
        </Button>
        <Button
          size='small'
          variant='contained'
          color='secondary'
          disabled={
            roles === 'superAdmin' && selected
              ? false
              : !selected || (storeId ? storeId !== selected?.store?._id : true)
          }
          onClick={() => {
            setEditing(true);
            setEntityModalOpen(true);
          }}
        >
          Editar
        </Button>
        <Button
          size='small'
          variant='contained'
          color='secondary'
          onClick={handleDelete}
          disabled={
            roles === 'superAdmin' && selected
              ? false
              : !selected || (storeId ? storeId !== selected?.store?._id : true)
          }
        >
          Eliminar
        </Button>
        {canApplyToOwnStore && storeId && (
          <Button
            size='small'
            variant='contained'
            color='secondary'
            onClick={() => {
              handleApply(selected._id, storeId);
            }}
            disabled={!selected}
          >
            Aplicar a tienda
          </Button>
        )}
      </Container>
    )
  );
};

export default Buttons;

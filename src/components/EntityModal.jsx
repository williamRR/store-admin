import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  useTheme,
} from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';

const renderFormField = (attribute, field, formState, entityData, editing) => {
  const { errors } = formState;
  const commonProps = {
    ...field,
    error: attribute.isColor ? null : !!errors[attribute?.id] || false,
    helperText: attribute.isColor ? null : errors[attribute?.id]?.message || '',
    label: attribute.isColor ? null : attribute.label,
    disabled: attribute.isColor ? null : !attribute.editable,
    fullWidth: attribute.isColor ? null : true,
    defaultValue: attribute.isColor ? null : entityData?.[attribute.id],
    margin: attribute.isColor ? null : 'normal',
    variant: attribute.isColor ? null : 'outlined',
    style: attribute.isColor
      ? null
      : {
          marginBottom: '8px',
          backgroundColor: 'white',
          color: 'black',
        },
    InputProps: attribute.isColor
      ? null
      : {
          style: { color: 'black' },
        },
  };
  // if (attribute.shouldNotAppearInForm) return false;
  // if (!editing) {
  //   if (!attribute.shouldRenderOnAdd) return false;
  // }
  if (attribute.isColor) {
    const [color, setColor] = useState(field.value);
    const [open, setOpen] = useState(false);

    const handleHexInputChange = (event) => {
      const hexColor = event.target.value;
      setColor(hexColor);
      field.onChange(hexColor);
    };

    const theme = useTheme();
    return (
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Typography
          sx={{
            color: 'black',
            marginBottom: '10px',
          }}
        >
          {attribute.label}
          {/* {color} */}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <HexColorPicker
            sx={{
              height: '12px',
              width: '100%',
              borderRadius: '5px',
            }}
            color={field.value}
            onChange={setColor}
            {...commonProps}
          />
          <TextField
            type='text'
            value={field.value}
            onChange={handleHexInputChange}
            onFocus={() => setOpen(true)} // Abre el color picker al enfocar el campo de texto
            onBlur={() => setOpen(false)}
            inputProps={{
              textColor: 'black',
              backgroundColor: 'black',
            }}
            style={{
              marginLeft: '8px',
              // width: '70px',
              fullWidth: true,
              // color: 'white',
              color: 'black',

              backgroundColor: 'black',
            }} // Ajusta el estilo según tus necesidades
          />
        </div>
      </div>
    );
  }
  if (attribute.id === 'categoryId') {
    return (
      <TextField
        {...commonProps}
        placeholder=''
        select
        name=''
        SelectProps={{
          native: true,
        }}
      >
        <option value=''>Selecciona una categoría</option>
        {attribute.options?.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </TextField>
    );
  }
  switch (attribute.type) {
    case 'color':
      return <TextField type='color' {...commonProps} />;
    case 'url':
      return <TextField type='url' {...commonProps} />;
    case 'number':
      return <TextField type='number' {...commonProps} />;
    case 'tel':
      return <TextField type='tel' {...commonProps} />;
    case 'email':
      return <TextField type='email' {...commonProps} />;
    default:
      return <TextField {...commonProps} />;
  }
};

const EntityModal = ({
  editing,
  entity,
  entityName,
  entityData,
  entityModalOpen,
  setEntityModalOpen,
  onEdit,
  onSave,
}) => {
  const { control, handleSubmit, formState, setValue } = useForm();
  useEffect(() => {
    if (entityData) {
      entity.forEach((attribute) => {
        setValue(attribute.id, entityData[attribute.id]);
      });
    }
  }, [entityData]);
  const { errors } = formState;

  const onSubmit = (data) => {
    if (editing) {
      onEdit(data);
    } else {
      onSave(data);
    }
  };

  const handleClose = () => {
    setEntityModalOpen(false);
  };

  return (
    <Dialog open={entityModalOpen} onClose={handleClose}>
      <DialogTitle
        style={{
          color: 'black',
          backgroundColor: 'white',
        }}
      >
        {editing ? 'Actualizar' : 'Agregar'} {entityName}
      </DialogTitle>
      <DialogContent style={{ backgroundColor: 'white' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {entity?.map((attribute) => {
            // if (
            //   (attribute.shouldNotAppearInForm && !editing) ||
            //   (!editing && !attribute.shouldRenderOnAdd)
            // ) {
            //   return null; // No renderizar el campo
            // }c
            console.log('Boolean(!attribute.shouldRenderOnAdd)');
            console.log(attribute);
            if (!editing) if (!attribute.shouldRenderOnAdd) return null;
            console.log('llegué acá alñ menos');
            return (
              <Controller
                key={attribute.id}
                rules={{ required: `${attribute.label} is required` }}
                name={attribute.id}
                control={control}
                render={({ field }) =>
                  renderFormField(
                    attribute,
                    field,
                    formState,
                    entityData,
                    editing,
                  )
                }
              />
            );
          })}
          <DialogActions
            style={{
              backgroundColor: 'whitesmoke',
              justifyContent: 'space-between',
            }}
          >
            <Button onClick={handleClose} color='secondary' variant='contained'>
              Cancelar
            </Button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                type='submit'
                variant='contained'
                color={editing ? 'secondary' : 'primary'}
                sx={
                  {
                    // width: '50%',
                    // marginBottom: '20px',
                  }
                }
              >
                {editing ? 'Actualizar' : 'Agregar'}
              </Button>
              <Button
                color='primary'
                variant='contained'
                onClick={() => reset()}
              >
                Limpiar
              </Button>
            </div>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EntityModal;

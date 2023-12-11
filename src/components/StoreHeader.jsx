import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../largeLogo.png';
const StoreHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position='static'
      sx={{
        height: '8vh',
      }}
    >
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <img src={logo} alt='Logo' width={194} height={56} />
        </Typography>
        {/* <Select
          label='Selecciona'
          sx={{ width: 200, height: '5vh', marginTop: 2 }}
          defaultValue=''
        >
          <MenuItem value='' disabled>
            Selecciona
          </MenuItem>
          <MenuItem value={10}>Opción 1</MenuItem>
          <MenuItem value={20}>Opción 2</MenuItem>
          <MenuItem value={30}>Opción 3</MenuItem>
        </Select> */}

        {/* Icono de inicio de sesión a la derecha */}
        <div>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default StoreHeader;

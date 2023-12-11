import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { paths } from '../router/paths';
import { useAuth } from '../context/AuthContext';
import smallLogo from '../smallLogo.png';
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (path) => location.pathname === path;

  const handleChangePage = (path) => () => {
    navigate(path);
  };

  const {
    isAuthenticated,
    userData: { name, roles },
    logout,
  } = useAuth();
  const shouldRender = (route) => {
    if (!route.showInSidebar) {
      return false;
    }
    if (!isAuthenticated) {
      if (route.accessible === 'unauthenticated') return true;
      if (route.accessible === 'all') return true;
      else return false;
    }
    if (route.accessible.includes(roles)) {
      return true;
    }
    return false;
  };

  const theme = useTheme();

  return (
    <List
      sx={{
        borderRight: `2px solid ${theme.palette.secondary.main}`,
        minHeight: '90vh',
        maxHeight: '90vh',
        width: '200px',
        padding: '20px',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Alinea los elementos de la lista en el espacio disponible
      }}
    >
      <div>
        {isAuthenticated && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Avatar
              sx={{
                width: '50px',
                height: '50px',
                marginLeft: '0px',
                marginBottom: '30px',
              }}
              // src={userData?.avatar}
            >
              {(name && name[0]) || 'A'}
            </Avatar>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                marginBottom: '20px',
              }}
            >
              {name}
            </Typography>
          </Box>
        )}
        {paths.map(
          (route) =>
            shouldRender(route) && (
              <ListItem
                key={route.id}
                onClick={handleChangePage(route.path)}
                sx={{
                  cursor: 'pointer',
                  borderColor: theme.palette.secondary.main,
                  backgroundColor: isActiveRoute(route.path)
                    ? theme.palette.background.default
                    : 'transparent',
                  borderRadius: '5px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <ListItemText
                  primary={route.name}
                  sx={{
                    borderColor: theme.palette.secondary.main,

                    fontWeight: isActiveRoute(route.path) ? 'bold' : 'normal',
                    color: isActiveRoute(route.path)
                      ? theme.palette.primary.main
                      : null,
                  }}
                />
              </ListItem>
            ),
        )}
        {isAuthenticated && (
          <ListItem
            onClick={async () => {
              await logout();
              navigate('/login');
            }}
            sx={{
              borderColor: theme.palette.secondary.main,
              backgroundColor: theme.palette.background.default,

              borderRadius: '5px',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemText
              primary='Cerrar Sesión'
              sx={{
                borderColor: theme.palette.secondary.main,

                fontWeight: 'normal',
                color: null,
                // ? theme.palette.primary.main
                // : null,
              }}
            />
          </ListItem>
        )}
      </div>
      {/* Espaciador que empuja el logo hacia abajo */}
      <div
        sx={{
          flexGrow: 1,
          backgroundColor: theme.palette.secondary.main,
        }}
      />
      <ListItem
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={smallLogo} alt='Logo' width={160} height={100} />
      </ListItem>
    </List>
  );
};

export default Sidebar;

import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import MainPanel from '../containers/MainPanel';
import { paths } from './paths';
import { useAuth } from '../context/AuthContext';
const Content = () => {
  return (
    <Grid container>
      <Grid container>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <Routes>
            {paths.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<RouterHack route={route} />}
              />
            ))}
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  );
};

const RouterHack = ({ route }) => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    userData: { roles },
  } = useAuth();
  if (route.accessible === 'all') {
    return (
      <Suspense fallback={<CircularProgress />}>{route.component}</Suspense>
    );
  }

  if (!isAuthenticated && route.accessible === 'unauthenticated') {
    return (
      <Suspense fallback={<CircularProgress />}>{route.component}</Suspense>
    );
  }
  if (
    !isAuthenticated &&
    route.accessible !== 'unauthenticated' &&
    route.accessible !== 'all'
  ) {
    navigate('/forbidden');
  }
  if (route.accessible === 'unauthenticated') {
    navigate('/');
    return null;
  }

  if (route.accessible?.includes(roles)) {
    if (route.crud)
      return (
        <MainPanel
          entity={route.entity}
          name={route.name}
          headers={route.headers}
        />
      );
    else
      return (
        <Suspense fallback={<CircularProgress />}>{route.component}</Suspense>
      );
  } else {
    navigate('/forbidden');
    return null;
  }
};

const AppRouter = () => {
  return <Router>{<Content />}</Router>;
};

export default AppRouter;

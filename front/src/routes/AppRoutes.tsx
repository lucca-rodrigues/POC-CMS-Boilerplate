import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth/useAuthContext';
import { useGlobalContext } from '@contexts/globalContext/useGlobalContext';
import { RootTemplate } from '@components';
import { Box, CircularProgress } from '@mui/material';
import routes from './routes';
import NotFound from '@root/pages/notFound';
import { useEffect } from 'react';

export default function AppRoutes() {
  const { isAuthenticated, isLoading, setIsLoading } = useAuth();
  const { theme } = useGlobalContext();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Box
        height="100%"
        width="100%"
        pt="40vh"
        margin="0 auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress
          size={100}
          sx={{
            color: theme?.defaultColor,
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: '#E9E9E9',
      }}
    >
      <Routes>
        {routes.map(({ path, element, isPublicRoute }) => (
          <Route
            key={path}
            path={path}
            element={
              isAuthenticated ? (
                isPublicRoute ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <RootTemplate>{element}</RootTemplate>
                )
              ) : isPublicRoute ? (
                element
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

import { ReactNode, useState } from 'react';
import { useAuth } from '@root/contexts/auth/useAuthContext';

import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '@root/contexts/globalContext/useGlobalContext';
import { Box, Grid2 as Grid, Hidden } from '@mui/material';
import { SidebarMenu } from '../SidebarMenu';
import { Header } from '../Header';

type RootTemplateProps = {
  children: ReactNode;
};

export function RootTemplate({ children }: RootTemplateProps) {
  const { theme } = useGlobalContext();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isLoading, isAuthenticated, signOut } = useAuth();

  // const navigate = useNavigate();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Grid container>
        <Hidden lgDown={!showMobileMenu}>
          <Grid
            size={{
              lg: 2,
              md: 2,
            }}
            sx={{
              backgroundSize: 'inherit',
              backgroundPosition: 'left center',
              background: theme?.defaultColor,
            }}
          >
            <SidebarMenu />
          </Grid>
        </Hidden>
        <Grid
          size={{
            lg: 10,
            md: 10,
          }}
        >
          <Header theme={theme} signOut={signOut} />
          <Box
            pb={4}
            pl={4}
            pr={4}
            sx={{
              mt: 3,
              zIndex: 0,
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

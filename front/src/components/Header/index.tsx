import { Box, Button, Stack, Typography } from '@mui/material';
import { ITheme } from '@root/contexts/globalContext/useGlobalContext';
import LogoutIcon from '@mui/icons-material/Logout';

interface IHeaderProps {
  theme: ITheme;
  signOut: () => void;
}

export function Header({ theme, signOut }: IHeaderProps) {
  return (
    <Stack
      p={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        background: theme?.defaultColor,
        color: '#fff',
      }}
    >
      <Box>
        <Typography>Teste</Typography>
      </Box>
      <Box>
        <Button
          onClick={signOut}
          endIcon={
            <LogoutIcon
              sx={{
                color: '#fff',
              }}
            />
          }
        >
          <Typography color="#fff">Sair</Typography>
        </Button>
      </Box>
    </Stack>
  );
}

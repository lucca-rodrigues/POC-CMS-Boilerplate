import { Box, Button, Stack, Typography } from '@mui/material';
import notFound from '@assets/notfound.jpg';

export default function TemplatePage({ ...sharedProps }) {
  const { goBackPage, theme } = sharedProps;

  return (
    <Box
      sx={{
        background: '#fff',
      }}
    >
      <Stack alignItems="center" maxWidth="60%" margin="0 auto" pt={4}>
        <Box margin="0 auto" width="100%" display="flex" justifyContent="center">
          <img src={notFound} width="70%" />
        </Box>
        <Typography variant="h1" fontWeight={600} fontSize={50}>
          Página não encontrada
        </Typography>

        <Box
          sx={{
            '& .MuiButtonBase-root': {
              color: '#fff',
              borderRadius: '20px',
              minWidth: '150px',
              marginTop: 5,
            },
          }}
        >
          <Button
            size="medium"
            onClick={() => goBackPage()}
            sx={{
              backgroundColor: theme?.defaultColor,
            }}
          >
            Voltar
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

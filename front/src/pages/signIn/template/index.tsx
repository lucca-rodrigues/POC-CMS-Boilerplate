import { Box, Button, Grid2 as Grid, TextField } from '@mui/material';
import Logo from '@assets/logo.png';
import ScreenBg from '@assets/bg_man.jpg';

export default function TemplatePage({ ...sharedProps }) {
  const { validateIfIsDisabledButton, handleSubmit, signIn, setValue, theme } = sharedProps;

  return (
    <Box
      minHeight="100vh"
      pt={30}
      sx={{
        backgroundImage: `url(${ScreenBg})`,
        backgroundSize: 'cover',
      }}
    >
      <form onSubmit={handleSubmit(signIn)} data-testid="signIn-form">
        <Grid
          container
          spacing={4}
          margin="0 auto"
          borderRadius={4}
          maxWidth="500px"
          textAlign="center"
          p={4}
          sx={{
            background: '#fff',
            minHeight: '450px',
            minWidth: '350px',
            '& .MuiInputBase-root': {
              background: '#fff!important',
            },
            '& .MuiButtonBase-root': {
              color: theme?.defaulColor,
              background: '#fff!important',
              borderRadius: '20px',
            },
          }}
        >
          <Grid size={{ md: 12, sm: 12, lg: 12, xs: 12 }}>
            <img src={Logo} width="150px" data-testid="logo-image" />
          </Grid>
          <Grid size={{ md: 12, sm: 12, lg: 12, xs: 12 }}>
            <TextField
              data-testid="email-input"
              fullWidth
              label="E-mail"
              name="email"
              variant="filled"
              size="small"
              onChange={(e) => setValue('email', e?.target?.value as string)}
            />
          </Grid>
          <Grid size={{ md: 12, sm: 12, lg: 12, xs: 12 }}>
            <TextField
              data-testid="password-input"
              fullWidth
              label="Senha"
              name="password"
              variant="filled"
              size="small"
              onChange={(e) => setValue('password', e?.target?.value as string)}
            />
          </Grid>
          <Grid size={{ md: 12, sm: 12, lg: 12, xs: 12 }}>
            <Button
              data-testid="signIn-button"
              size="medium"
              type={!validateIfIsDisabledButton() ? 'submit' : 'button'}
              disabled={validateIfIsDisabledButton()}
            >
              Acessar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

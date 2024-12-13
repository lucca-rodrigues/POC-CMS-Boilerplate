import { Box, TextField, TextFieldProps } from '@mui/material';

export function InputOutlined({ ...props }: TextFieldProps) {
  return (
    <Box
      sx={{
        width: '100%',
        '.MuiInputBase-root': {
          background: '#fff',
        },
      }}
    >
      <TextField fullWidth variant="outlined" margin="normal" {...props} />
    </Box>
  );
}

import { Button, Typography } from '@mui/material';
import { IDefaultButton } from '../DefaultButton';

interface ISaveButton extends IDefaultButton {
  text: string;
}
export function SaveButton({ icon, text, theme, onClick, type }: ISaveButton) {
  return (
    <Button
      onClick={onClick}
      endIcon={icon}
      type={type}
      sx={{
        borderRadius: 1,
        padding: '10px 20px',
        backgroundColor: theme?.defaultColor,
      }}
    >
      <Typography color="#fff">{text}</Typography>
    </Button>
  );
}

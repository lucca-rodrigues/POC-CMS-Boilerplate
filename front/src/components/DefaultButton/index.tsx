import { Button, Typography } from '@mui/material';
import { ITheme } from '@root/contexts/globalContext/useGlobalContext';

export interface IDefaultButton {
  icon?: React.ReactNode;
  theme?: ITheme;
  defaultColor?: string;
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function DefaultButton({ icon, text, onClick }: IDefaultButton) {
  return (
    <Button onClick={onClick} endIcon={icon}>
      <Typography color="#fff">{text}</Typography>
    </Button>
  );
}

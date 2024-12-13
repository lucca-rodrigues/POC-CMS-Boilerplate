import { Typography } from '@mui/material';

export function PageTitle({ title }: { title: string }) {
  return (
    <Typography variant="h1" fontSize={20} fontWeight={600}>
      {title}
    </Typography>
  );
}

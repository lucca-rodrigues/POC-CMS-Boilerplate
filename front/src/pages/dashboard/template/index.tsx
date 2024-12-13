import { Box } from '@mui/material';

export default function TemplatePage({ ...sharedProps }) {
  return (
    <Box data-testid="content-page">
      <h1> Content, validations and rules here </h1>
    </Box>
  );
}

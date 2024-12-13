import { Grid2 as Grid } from '@mui/material';
import { PageTitle } from '@root/components';
import { FileUpload } from '@root/components/FileUpload';

export default function TemplatePage({ ...sharedProps }) {
  return (
    <>
      <Grid container alignItems="center" mb={2}>
        <Grid size={{ md: 12, sm: 12, lg: 12 }}>
          <PageTitle title="Upload de Arquivos" />
        </Grid>

        {/* <Grid size={{ md: 2, sm: 2, lg: 2 }} textAlign="end">
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => navigate('/files/library')}
          >
            Adicionar arquivo
          </Button>
        </Grid> */}
      </Grid>
      <FileUpload {...sharedProps} />
    </>
  );
}

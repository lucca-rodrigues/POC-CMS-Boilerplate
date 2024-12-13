/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageTitle, SaveButton, Table } from '@root/components';
import { TableColumns } from '../mocks/TableColumns';
import { Box, Grid2 as Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function TemplatePage({ ...sharedProps }) {
  const { isLoading, theme, navigate, tableData } = sharedProps;

  return (
    <>
      <Grid container alignItems="center" mb={4}>
        <Grid size={{ md: 10, sm: 10, lg: 10 }}>
          <PageTitle title="Páginas" />
        </Grid>

        <Grid size={{ md: 2, sm: 2, lg: 2 }} textAlign="end">
          <SaveButton
            theme={theme}
            icon={<AddCircleIcon sx={{ color: '#fff' }} />}
            text="Criar nova página"
            onClick={() => {
              navigate('/pages/new');
            }}
          />
        </Grid>
      </Grid>

      <Box>
        <Table
          columns={TableColumns()}
          data={tableData as any}
          loading={isLoading}
          notFoundMessage="Nenhuma página encontrada"
        />
      </Box>
    </>
  );
}

import { Box, Grid2 as Grid, Stack } from '@mui/material';
import { PageTitle, SaveButton, Table } from '@root/components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TableColumns } from '../mocks/TableColumns';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { ModalMultipleUsersCreate } from './components/ModalMultipleUsersCreate';

export default function TemplatePage({ ...sharedProps }) {
  const {
    navigate,
    theme,
    tableData,
    isLoading,
    openAndCloseModal,
    handleDetails,
    setValue,
    deleteUser,
  } = sharedProps;

  return (
    <>
      <Grid container alignItems="center" mb={4}>
        <Grid size={{ md: 8, sm: 12, lg: 8 }}>
          <PageTitle title="Usuários" />
        </Grid>

        <Grid size={{ md: 4, sm: 12, lg: 4 }} textAlign="end">
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <SaveButton
              theme={theme}
              icon={<AttachFileIcon sx={{ color: '#fff' }} />}
              text="Cadastrar em lote"
              onClick={() => setValue('isMultipleusersCreation', true)}
            />

            <SaveButton
              theme={theme}
              icon={<AddCircleIcon sx={{ color: '#fff' }} />}
              text="Cadastrar"
              onClick={() => {
                navigate('/users/new');
              }}
            />
          </Stack>
        </Grid>
      </Grid>

      <Box>
        <Table
          columns={TableColumns({
            openAndCloseModal,
            handleDetails,
            deleteUser,
          })}
          data={tableData}
          loading={isLoading}
          notFoundMessage="Nenhuma usuário cadastrado"
        />
      </Box>

      <ModalMultipleUsersCreate {...sharedProps} />

      {/* <Modal
        isOpenModal={isOpenModal}
        title="Teste"
        openAndCloseModal={openAndCloseModal}
        onConfirm={onConfirm}
      >
        <Box>
          <Typography>Teste</Typography>
        </Box>
      </Modal> */}
    </>
  );
}

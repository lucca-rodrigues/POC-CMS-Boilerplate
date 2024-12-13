import { Box, IconButton, Stack, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export function TableColumns({ openAndCloseModal, handleDetails, deleteUser }) {
  return [
    {
      id: 'name',
      label: 'Nome',
      render: (rowData) => (
        <Box>
          <Typography>{rowData?.name ?? '-'}</Typography>
        </Box>
      ),
    },
    {
      id: 'email',
      label: 'E-mail',
      render: (rowData) => (
        <Box>
          <Typography>{rowData?.email ?? '-'}</Typography>
        </Box>
      ),
    },
    {
      id: 'phone',
      label: 'Telefone',
      render: (rowData) => (
        <Box>
          <Typography>{rowData?.cellPhone ?? '-'} </Typography>
        </Box>
      ),
    },
    {
      id: 'group',
      label: 'Grupo de permissões',
      align: 'center',
      render: (rowData) => (
        <Box>
          <Typography>{rowData?.permissionsGroup ?? '-'}</Typography>
        </Box>
      ),
    },

    {
      align: 'center',
      id: 'action',
      label: 'Ações',
      padding: '0px',
      maxWidth: '200px',
      render: (rowData) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton onClick={() => handleDetails(rowData)}>
            <VisibilityIcon />
          </IconButton>

          <IconButton>
            <CreateIcon />
          </IconButton>

          <IconButton onClick={() => deleteUser(rowData?.id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];
}

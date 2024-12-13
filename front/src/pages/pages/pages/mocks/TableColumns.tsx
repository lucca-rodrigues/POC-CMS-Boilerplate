import { Box, IconButton, Stack, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export function TableColumns() {
  return [
    {
      id: 'name',
      label: 'Nome',
      render: (rowData) => (
        <Box>
          <Typography>{rowData?.title}</Typography>
        </Box>
      ),
    },

    {
      align: 'center',
      id: 'action',
      label: 'Ações',
      padding: '0px',
      maxWidth: '40px',
      render: () => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton>
            <VisibilityIcon />
          </IconButton>

          <IconButton>
            <CreateIcon />
          </IconButton>

          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];
}

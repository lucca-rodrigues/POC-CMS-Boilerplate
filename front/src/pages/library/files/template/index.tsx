import {
  Box,
  Grid2 as Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import { Delete, FileCopy } from '@mui/icons-material';
import { PageTitle } from '@root/components';

interface File {
  name: string;
  url: string;
}

export default function TemplatePage({ ...sharedProps }) {
  const {
    navigate,
    files,
    deleteFile,
    selectedFile,
    setSelectedFile,
    isDetailsOpen,
    setIsDetailsOpen,
  } = sharedProps;

  const handleFileClick = (file: File) => {
    setSelectedFile(file);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedFile(null);
  };

  return (
    <>
      <Grid container alignItems="center" mt={-2}>
        <Grid size={{ md: 10, sm: 10, lg: 10 }}>
          <PageTitle title="Biblioteca de mídia" />
        </Grid>

        <Grid size={{ md: 2, sm: 2, lg: 2 }} textAlign="end">
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => navigate('/files/library')}
          >
            Adicionar arquivo
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {files?.map((file, index) => (
          <Grid
            size={{
              xs: 6,
              sm: 4,
              md: 3,
              lg: 2,
            }}
            key={index}
          >
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={file.url}
                alt={file.name}
                onClick={() => handleFileClick(file)}
                sx={{ cursor: 'pointer' }}
              />
              <CardActions>
                <IconButton size="small" onClick={() => deleteFile(file)}>
                  <Delete />
                </IconButton>
                <IconButton size="small" onClick={() => navigator.clipboard.writeText(file.url)}>
                  <FileCopy />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={isDetailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        <Box p={2}>
          <DialogTitle>Detalhes do anexo</DialogTitle>
          <DialogContent>
            {selectedFile && (
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ flex: 1, mr: { md: 2 }, mb: { xs: 2, md: 0 } }}>
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.name}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    disabled
                    fullWidth
                    label="Título"
                    variant="outlined"
                    margin="normal"
                    defaultValue={selectedFile.name}
                  />
                  <TextField
                    disabled
                    fullWidth
                    label="Descrição"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                  />
                  <TextField
                    disabled
                    fullWidth
                    label="URL do arquivo"
                    variant="outlined"
                    margin="normal"
                    value={selectedFile.url}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <IconButton onClick={() => navigator.clipboard.writeText(selectedFile.url)}>
                          <FileCopy />
                        </IconButton>
                      ),
                    }}
                  />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails}>Fechar</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

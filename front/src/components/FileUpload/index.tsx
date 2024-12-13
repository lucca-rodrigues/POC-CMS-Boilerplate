import { CloudUpload, Delete } from '@mui/icons-material';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Button,
} from '@mui/material';

export function FileUpload({ ...sharedProps }) {
  const { files, isMultipleFiles, uploadFile, getRootProps, getInputProps, handleRemoveFile } =
    sharedProps;

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload sx={{ fontSize: 48 }} />
        <Typography variant="body1">
          Arraste e solte os arquivos aqui, ou clique para selecionar
        </Typography>
      </Box>
      {isMultipleFiles && (
        <>
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Avatar
                    src={URL.createObjectURL(file)}
                    alt={file?.name}
                    variant="square"
                    sx={{ width: 48, height: 48 }}
                  />
                </ListItemIcon>
                <ListItemText primary={file.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleRemoveFile(file)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {files.length > 0 && (
            <Button variant="contained" onClick={uploadFile} sx={{ mt: 2 }}>
              Salvar Arquivos
            </Button>
          )}
        </>
      )}
    </>
  );
}

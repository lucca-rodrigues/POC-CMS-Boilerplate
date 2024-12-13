import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { PageTitle } from '../PageTitle';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface IModalProps {
  isOpenModal: boolean;
  openAndCloseModal: () => void;
  title: string;
  onConfirm: () => void;
  children: React.ReactNode;
}
export function Modal({ openAndCloseModal, isOpenModal, title, onConfirm, children }: IModalProps) {
  return (
    <BootstrapDialog
      onClose={openAndCloseModal}
      aria-labelledby="customized-dialog-title"
      open={isOpenModal}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <PageTitle title={title} />
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={openAndCloseModal}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box minWidth="500px">{children}</Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onConfirm}>
          Salvar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

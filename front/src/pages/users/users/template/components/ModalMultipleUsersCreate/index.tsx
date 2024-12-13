import { Stack } from '@mui/material';
import { FileUpload } from '@root/components/FileUpload';
import { Modal } from '@root/components/Modal';

export function ModalMultipleUsersCreate({ ...sharedProps }) {
  const { watchFields, setValue, uploadFile } = sharedProps;
  return (
    <Modal
      title="Cadastro de usuários em lote"
      isOpenModal={watchFields?.isMultipleusersCreation}
      openAndCloseModal={() =>
        setValue('isMultipleusersCreation', !watchFields?.isMultipleusersCreation)
      }
      onConfirm={uploadFile}
    >
      <Stack>
        <FileUpload {...sharedProps} />
      </Stack>
    </Modal>
  );
}

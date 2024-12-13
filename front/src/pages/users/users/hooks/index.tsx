import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UsersServices } from '@root/domain/users';
import { useGlobalContext } from '@root/contexts/globalContext/useGlobalContext';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { toast } from 'react-toastify';

export default function useUsers() {
  const service = new UsersServices();
  const [tableData, setTableData] = useState([]);

  const [file, setFile] = useState<File | null>(null);

  const { theme } = useGlobalContext();

  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      isMultipleusersCreation: false,
      selectedItem: null,
    },
  });
  const watchFields = watch();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  async function getUsers() {
    // setIsLoading(true);
    const response = await service.get();
    setTableData(response?.data);
    setIsLoading(false);
  }

  async function uploadFile() {
    if (!file) {
      toast.error('Nenhum arquivo selecionado');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    for (const [name, value] of formData.entries()) {
      console.log(`FormData entry: ${name}: ${value}`);
    }

    const response = await service.upload(formData);

    if (response?.status !== 200) {
      toast.error('Erro ao carregar arquivo');
    } else {
      getUsers();
      toast.success('Cadastro de usuários realizado com sucesso!');
      reset();
    }
  }

  function openAndCloseModal() {
    setIsOpenModal((prev) => !prev);
  }

  function handleDetails(data) {
    setValue('selectedItem', data);
    setIsOpenModal(true);
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    multiple: false,
  } as DropzoneOptions);

  const handleRemoveFile = () => {
    setFile(null);
  };

  async function deleteUser(id: string) {
    const response = await service.delete(id);
    if (response?.status !== 204) {
      toast.error('Erro ao remover usuário');
    } else {
      const newData = tableData.filter((item) => item.id !== id);
      setTableData(newData);
      toast.success('Usuário removido com sucesso!');
    }
  }

  return {
    theme,
    isLoading,
    setIsLoading,
    control,
    handleSubmit,
    watch,
    setValue,
    watchFields,
    navigate,
    getUsers,
    tableData,
    openAndCloseModal,
    isOpenModal,
    handleDetails,
    uploadFile,
    file,
    setFile,
    getRootProps,
    getInputProps,
    handleRemoveFile,
    deleteUser,
  };
}

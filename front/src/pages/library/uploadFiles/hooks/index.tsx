import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FilesServices } from '@root/domain/files';
import { toast } from 'react-toastify';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

export default function useLibrary() {
  const service = new FilesServices();

  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue } = useForm();
  const watchFields = watch();

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const isMultipleFiles = true;

  async function uploadFile() {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    for (const [name, value] of formData.entries()) {
      console.log(`FormData entry: ${name}: ${value}`);
    }

    const response = await service.create(formData);

    if (response?.status !== 200) {
      toast.error('Erro ao carregar arquivo');
    }

    toast.success('Upload de arquivo realizado com sucesso!');
    navigate('/files');
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  } as DropzoneOptions);

  const handleRemoveFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  return {
    isLoading,
    setIsLoading,
    control,
    handleSubmit,
    watch,
    setValue,
    watchFields,
    navigate,
    uploadFile,
    files,
    setFiles,
    getRootProps,
    getInputProps,
    handleRemoveFile,
    isMultipleFiles,
  };
}

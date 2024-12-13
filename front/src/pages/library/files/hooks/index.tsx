import { FilesServices } from '@root/domain/files';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface File {
  name: string;
  url: string;
}

export default function useFiles() {
  const service = new FilesServices();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const getFilesData = async () => {
    setIsLoading(true);
    const response = await service.get();

    if (response?.status !== 200) {
      toast.error('Erro ao carregar  arquivos');
    }

    setFiles(response?.data?.files);
    setIsLoading(false);
  };

  const deleteFile = async (file: File) => {
    const response = await service.delete(file?.name);

    if (response?.status !== 200) {
      toast.error('Erro ao remover arquivo');
    }
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    toast.success('Arquivo removido com sucesso!');
  };

  return {
    navigate,
    files,
    isLoading,
    deleteFile,
    getFilesData,
    selectedFile,
    setSelectedFile,
    isDetailsOpen,
    setIsDetailsOpen,
    setFiles,
  };
}

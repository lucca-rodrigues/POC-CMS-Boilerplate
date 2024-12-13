/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PagesServices } from '@root/domain/pages';
import { useGlobalContext } from '@root/contexts/globalContext/useGlobalContext';

export default function usePages() {
  const service = new PagesServices();
  const [tableData, setTableData] = useState([]);

  const { theme } = useGlobalContext();

  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue } = useForm();
  const watchFields = watch();

  const [isLoading, setIsLoading] = useState(false);

  async function getPages() {
    // const response = await service.get();

    const data = [
      {
        id: '1',
        title: 'Página 1',
      },
      {
        id: '2',
        title: 'Página 2',
      },
    ];
    setTableData(data);
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
    getPages,
    tableData,
  };
}

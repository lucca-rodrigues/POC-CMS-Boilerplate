import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PagesServices } from '@root/domain/pages';
import { useGlobalContext } from '@root/contexts/globalContext/useGlobalContext';

export default function useCreatePage() {
  const service = new PagesServices();

  const { theme } = useGlobalContext();

  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue } = useForm();
  const watchFields = watch();

  const [isLoading, setIsLoading] = useState(false);

  async function createPage(data) {
    console.log('data', data);
    // const response = await service.create(data);
    // setPageData(response);
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
    createPage,
  };
}

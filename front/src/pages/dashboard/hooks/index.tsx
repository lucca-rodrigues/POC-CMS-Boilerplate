import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DashboardServices } from '@root/domain/dashboard';

export default function useDashboard() {
  const service = new DashboardServices();
  const [pageData, setPageData] = useState();

  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue } = useForm();
  const watchFields = watch();

  const [isLoading, setIsLoading] = useState(false);

  async function getDashboard() {
    const response = await service.get();
    setPageData(response);
  }

  return {
    isLoading,
    setIsLoading,
    control,
    handleSubmit,
    watch,
    setValue,
    watchFields,
    navigate,
    getDashboard,
    pageData,
  };
}

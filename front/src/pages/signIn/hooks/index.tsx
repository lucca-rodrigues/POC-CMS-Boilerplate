import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SignInServices } from '@root/domain/signIn';
import { toast } from 'react-toastify';
import { useAuth } from '@root/contexts/auth/useAuthContext';
import { useGlobalContext } from '@root/contexts/globalContext/useGlobalContext';

export default function useSignIn() {
  const service = new SignInServices();
  const { setUserToken } = useAuth();
  const { theme } = useGlobalContext();

  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue } = useForm();
  const watchFields = watch();

  const [isLoading, setIsLoading] = useState(false);

  // async function signIn(data) {
  //   const formatedData = {
  //     email: data.email,
  //     password: data.password,
  //   };

  //   const response = await service.signIn(formatedData);

  //   if (response?.token) {
  //     setUserToken(response.token);
  //     navigate('/plans');
  //   } else {
  //     toast.error('Usuário ou senha inválidos');
  //   }
  // }

  async function signIn(data) {
    const formatedData = {
      email: data.email,
      password: data.password,
    };

    if (formatedData?.email && formatedData?.password) {
      setUserToken('123456');
      navigate('/dashboard');
    } else {
      toast.error('Usuário ou senha inválidos');
    }
  }

  function validateIfIsDisabledButton() {
    if (watchFields?.email?.length > 1 && watchFields?.password?.length > 1) {
      return false;
    }
    return true;
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
    signIn,
    validateIfIsDisabledButton,
    theme,
  };
}

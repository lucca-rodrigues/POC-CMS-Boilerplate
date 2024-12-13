import { useGlobalContext } from '@root/contexts/globalContext/useGlobalContext';
import { useNavigate } from 'react-router-dom';

export default function useNotFound() {
  const navigate = useNavigate();
  const { theme } = useGlobalContext();

  function goBackPage() {
    navigate('/dashboard');
  }

  return {
    navigate,
    goBackPage,
    theme,
  };
}

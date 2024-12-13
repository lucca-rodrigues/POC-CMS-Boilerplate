import { useEffect } from 'react';
import TemplatePage from './template';
import useUsers from './hooks';

export default function Users() {
  const hookParams = useUsers();
  const { getUsers } = hookParams;

  const sharedProps = {
    ...hookParams,
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <TemplatePage {...sharedProps} />
    </>
  );
}

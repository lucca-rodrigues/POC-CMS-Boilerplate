import { useEffect } from 'react';
import TemplatePage from './template';
import useFiles from './hooks';

export default function Files() {
  const hookParams = useFiles();
  const { getFilesData } = hookParams;

  const sharedProps = {
    ...hookParams,
  };

  useEffect(() => {
    getFilesData();
  }, []);

  return (
    <>
      <TemplatePage {...sharedProps} />
    </>
  );
}

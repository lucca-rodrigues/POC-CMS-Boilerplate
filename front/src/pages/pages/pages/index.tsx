import { useEffect } from 'react';
import TemplatePage from './template';
import usePages from './hooks';

export default function Pages() {
  const hookParams = usePages();
  const { getPages } = hookParams;

  const sharedProps = {
    ...hookParams
  };

  useEffect(() => {
      getPages();
  },[]);

  return (
    <>
      <TemplatePage {...sharedProps} />
    </>
  );
}

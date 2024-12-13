import { useEffect } from 'react';
import TemplatePage from './template';
import useSettings from './hooks';

export default function Settings() {
  const hookParams = useSettings();
  const { getSettings } = hookParams;

  const sharedProps = {
    ...hookParams
  };

  useEffect(() => {
      getSettings();
  },[]);

  return (
    <>
      <TemplatePage {...sharedProps} />
    </>
  );
}

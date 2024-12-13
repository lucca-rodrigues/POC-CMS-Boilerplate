import TemplatePage from './template';
import useLibrary from './hooks';

export default function Library() {
  const hookParams = useLibrary();

  const sharedProps = {
    ...hookParams,
  };

  return (
    <>
      <TemplatePage {...sharedProps} />
    </>
  );
}

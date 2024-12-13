import TemplatePage from './template';
import useNotFound from './hooks';

export default function NotFound() {
  const hookParams = useNotFound();

  const sharedProps = {
    ...hookParams,
  };

  return (
    <>
      <TemplatePage {...sharedProps} />
    </>
  );
}

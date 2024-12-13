import TemplatePage from './template';
import useCreatePage from './hooks';

export default function CreatePage() {
  const hookParams = useCreatePage();

  const sharedProps = {
    ...hookParams,
  };

  return (
    <>
      <TemplatePage {...sharedProps} />
    </>
  );
}

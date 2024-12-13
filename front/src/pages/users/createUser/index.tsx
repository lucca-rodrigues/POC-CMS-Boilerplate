import TemplatePage from './template';
import useCreateUser from './hooks';

export default function CreateUser() {
  const hookParams = useCreateUser();

  const sharedProps = {
    ...hookParams,
  };

  return (
    <>
      <TemplatePage {...sharedProps} />
    </>
  );
}

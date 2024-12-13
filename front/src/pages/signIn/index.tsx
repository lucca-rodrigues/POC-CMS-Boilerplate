import TemplatePage from './template';
import useSignIn from './hooks';

export default function SignIn() {
  const hookParams = useSignIn();

  const sharedProps = {
    ...hookParams,
  };

  return (
    <>
      <TemplatePage {...sharedProps} />
    </>
  );
}

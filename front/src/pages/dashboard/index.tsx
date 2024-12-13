import TemplatePage from './template';
import useDashboard from './hooks';

export default function Dashboard() {
  const hookParams = useDashboard();
  // const { getDashboard } = hookParams;

  const sharedProps = {
    ...hookParams,
  };

  // useEffect(() => {
  //     getDashboard();
  // },[]);

  return (
    <>
      <TemplatePage {...sharedProps} />
    </>
  );
}

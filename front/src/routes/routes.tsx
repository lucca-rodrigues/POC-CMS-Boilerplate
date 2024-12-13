import SignIn from '@pages/signIn';
import Dashboard from '@pages/dashboard';
import Settings from '@root/pages/settings';
import Files from '@root/pages/library/files';
import Library from '@root/pages/library/uploadFiles';
import Pages from '@root/pages/pages/pages';
import CreatePage from '@root/pages/pages/createPage';
import Users from '@root/pages/users/users';
import CreateUser from '@root/pages/users/createUser';

const routes = [
  { path: '/', element: <SignIn />, isPublicRoute: true },
  { path: '/dashboard', element: <Dashboard />, isPublicRoute: false },
  { path: '/users', element: <Users />, isPublicRoute: false },
  { path: '/users/new', element: <CreateUser />, isPublicRoute: false },
  { path: '/settings', element: <Settings />, isPublicRoute: false },
  { path: '/files', element: <Files />, isPublicRoute: false },
  { path: '/files/library', element: <Library />, isPublicRoute: false },
  { path: '/pages', element: <Pages />, isPublicRoute: false },
  { path: '/pages/new', element: <CreatePage />, isPublicRoute: false },
];

export default routes;

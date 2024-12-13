import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/useAuthContext';
import { GlobalProvider } from './contexts/globalContext/useGlobalContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <GlobalProvider>
          <AppRoutes />
        </GlobalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

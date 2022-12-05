import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AuthProvider from './context/authContext/AuthProvider';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
        />
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

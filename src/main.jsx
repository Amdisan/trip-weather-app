import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext.jsx';
import { TripsProvider } from './context/TripsContext.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="561825059053-415e8svrv30li39alabiskr6kn853aoc.apps.googleusercontent.com">
    <UserProvider>
      <TripsProvider>
        <App />
      </TripsProvider>
    </UserProvider>
  </GoogleOAuthProvider>
);

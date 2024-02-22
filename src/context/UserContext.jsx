import { createContext, useContext } from 'react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

const UserContext = createContext();

function UserProvider({ children }) {
  const { profile, login, logOut } = useGoogleAuth();
  
  return (
    <UserContext.Provider
      value={{
        profile,
        login,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('UserContext was used outside of UserProvider');
  return context;
}

export { UserProvider, useUser };

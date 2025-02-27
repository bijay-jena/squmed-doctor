import React, {createContext, useContext, useState, useEffect} from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null); // User state
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading user from storage (or API)
    const fetchUser = async () => {
      setIsLoading(true);
      const savedUser = null; // Example: Fetch from AsyncStorage or API
      setUser(savedUser);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const login = async credentials => {
    // Simulate login logic
    const loggedInUser = {id: 1, name: 'John Doe'}; // Example
    setUser(loggedInUser);
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, isLoading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming Auth Context
export const useAuth = () => useContext(AuthContext);

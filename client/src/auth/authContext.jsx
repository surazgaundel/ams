// authContext.js
import React, { createContext, useState, useContext } from 'react';
import { login } from '../api/apiLayer';
import { handleError } from '../utils/helper';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleLogin=async(email,password)=>{
    try{
      const response = await login(email,password);
      const {token} = response.data;
      localStorage.setItem('token',token);
      setUser(token);
    }catch(err){
      handleError(err.response.data.message);
      console.error('Login failed',err.response.data.message);
    }
  }

  const handleLogout =()=>{
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);

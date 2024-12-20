// App.js
import React from 'react';
import { AuthProvider } from '../src/auth/authContext';
import RoutePage from './routePage';

function App() {
  return (
    <AuthProvider>
      <RoutePage />
    </AuthProvider>
  );
}

export default App;

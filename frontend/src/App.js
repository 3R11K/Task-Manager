import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home.tsx';  // A página Home
import Login from './Pages/Login/Login.tsx';  // A página de login
import ProtectedRoute from './Context/ProtectedRoutes.tsx';  // Componente de rota protegida
import { AuthProvider } from './Context/AuthContext.tsx';  // Contexto de autenticação
import GlobalStyle from './Global.tsx';
import Kanban from './Pages/Kanban/Kanban.tsx';
import ConfigPage from './Pages/Config/Config.tsx';
import SelectSprint from './Pages/SelectSprint/SelectSprint.tsx';
import Register from './Components/Register/Register.tsx';
import SetGroup from './Pages/SetGroup/SetGroup.tsx';

console.log('App.js'); // Verifica se o App.js está sendo executado

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/set-group" element={<SetGroup />} />
          <Route path="/" element={<SelectSprint />} />
          <Route path="/home/:sprint" element={<Home />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/config" element={<ConfigPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;

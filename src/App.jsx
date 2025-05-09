import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Login from './components/Login/Login';
import Home from "./components/Home/Home";
import Register from "./components/Login/Register"; 
import Public from './components/Public/Public';

import RequireAuth from './context/RequiresAuth';
import './App.css'

function App() {
  return (
    <>
      <Header/>
      <Routes>
          <Route path='/' element={<Public/>}/>
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/home/:userId?'element={<RequireAuth><Home /></RequireAuth>}/>
      </Routes>
    </>
  )
}

export default App


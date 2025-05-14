import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from './componants/header/index';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import header from './componants/header/index';
import Home from './pages/home';

function App() {
  return (
  
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' exact ={true} element={<Home/>}/> 
    </Routes>
    </BrowserRouter>
  );
}

export default App;

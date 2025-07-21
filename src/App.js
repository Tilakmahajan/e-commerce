import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, createContext } from 'react';
import Header from './componants/header/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import axios from 'axios';


const mycontext = createContext();

function App() {
  
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);
  const getCountry = async (url) => {
    const response = await axios.get(url).then((res) =>{
      setCountryList(res.data.data);
      console.log(res.data.data);
      
      
    });
  };

  const value = {
   countryList,
    selectedCountry,
setSelectedCountry
  }
  return (

    <BrowserRouter>
    <mycontext.Provider value={value}>
    <Header/>
    <Routes>
      <Route path='/' exact ={true} element={<Home/>}/> 
    </Routes>
    </mycontext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { mycontext };
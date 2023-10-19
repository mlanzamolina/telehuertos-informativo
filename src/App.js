import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import List from './components/List';
import Details from './components/Details';

function App() {

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<List />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

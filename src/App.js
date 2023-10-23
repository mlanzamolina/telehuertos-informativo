import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import List from "./components/List";
import { Details } from "./components/Details";
import { HeaderTelehuertos } from "./components/HeaderTelehuertos";
import "./style.css";

function App() {
  const rutaServidor = "/tele-informativo"; // Correct base route

  return (
    <div className="App">
      <Header />
      <HeaderTelehuertos />
      <BrowserRouter basename={rutaServidor}>
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

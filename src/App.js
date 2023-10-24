import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
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
      <HashRouter>
        {/* <BrowserRouter > */}
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/tele-informativo/" element={<List />} />
          <Route path="/tele-informativo/details/:id" element={<Details />} />
        </Routes>
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;

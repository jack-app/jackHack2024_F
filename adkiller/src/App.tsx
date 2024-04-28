import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from '@mui/material';
import Home from './pages/Home';
import Pnf from './pages/Pnf';
import Stage from './pages/Stage';
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>

        <Container className="main-content" sx={{ marginTop: "9vh", marginBottom: "9vh" }}>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/stage"} element={<Stage />} />
            <Route path="/*" element={<Pnf />} />
          </Routes>
        </Container>

      </BrowserRouter>
    </>
  )
};

export default App;
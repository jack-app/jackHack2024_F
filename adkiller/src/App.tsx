import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from '@mui/material';
import Home from './pages/Home';
import Pnf from './pages/Pnf';
import Stage from './pages/Stage';
import Chahan from './pages/Chahan';
import Hiranan from './pages/Hiranan';
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>

        <Container className="main-content" sx={{ marginTop: "9vh", marginBottom: "9vh" }}>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/chahan"} element={<Chahan />} />
            <Route path={"/hiranan"} element={<Hiranan />} />
            <Route path={"/stage"} element={<Stage />} />
            <Route path="/*" element={<Pnf />} />
          </Routes>
        </Container>

      </BrowserRouter>
    </>
  )
};

export default App;
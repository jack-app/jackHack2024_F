import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from '@mui/material';
import Home from './pages/Home';
import Pnf from './pages/Pnf';
import Stage from './pages/Stage';


export type tBooleanSet2 = {
  valNull: boolean,
  setValNull: React.Dispatch<React.SetStateAction<boolean>>,
  valRun: boolean,
  setValRun: React.Dispatch<React.SetStateAction<boolean>>,
}

export const adContext = createContext<tBooleanSet2 | undefined>(undefined);


const App: React.FC = () => {
  const [isAdNull, setIsAdNull] = useState<boolean>(false);
  const [isAdRun, setIsAdRun] = useState<boolean>(true);

  const ad = {
    valNull: isAdNull,
    setValNull: setIsAdNull,
    valRun: isAdRun,
    setValRun: setIsAdRun,
  }
  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/background.png`} style={{
        zIndex: -9999999999,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: window.innerHeight,
        width: window.innerWidth,
        position: "absolute",
        top: 0,
        left: 0,
      }} />
      <BrowserRouter>
        <adContext.Provider value={ad} >

          <Container className="main-content" sx={{ marginTop: "9vh", marginBottom: "9vh" }}>

            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/stage"} element={<Stage />} />
              <Route path="/*" element={<Pnf />} />
            </Routes>
          </Container>

        </adContext.Provider>
      </BrowserRouter >
    </>
  )
};

export default App;
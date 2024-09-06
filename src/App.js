import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConnectWallet from "./components/ConnectWallet/ConnectWallet";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

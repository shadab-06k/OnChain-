import "./App.css";
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
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
      {/* <h1>Hello World</h1>
      <button onClick={onCreateUser}>Create User</button>
      <div>
        <p>Address: {data.address}</p>
      </div>
      <Forms />
      <div>
        <h2>Available Accounts:</h2>
        <ul>
          {getdata.map((account, index) => (
            <li key={index}>{account}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default App;

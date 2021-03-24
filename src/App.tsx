import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { QRScanner } from './qr-scanner';

function App() {
  const [value, setValue] = useState("")
   return (
     <div className="App">
       <div>{value}</div>
       
       <QRScanner onChange={setValue} label="scan qr" />
     </div>
   );
}

export default App;

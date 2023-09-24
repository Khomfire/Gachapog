// App.js
import React, { useState } from 'react';
import Gachapog from './Gachapog';
import GearIcon from './assets/gear.png';
import GearPopup from './GearPopup';
import './App.css';

function App() {
  const [showGearPopup, setShowGearPopup] = useState(false);
  const [rates, setRates] = useState({ reward1: 0, reward2: 0, reward3: 0 });

  const openGearPopup = () => {
    setShowGearPopup(true);
  };

  const closeGearPopup = () => {
    setShowGearPopup(false);
  };

  const handleSetRates = (newRates) => {
    setRates(newRates);
  };

  return (
    <div className="App">
      <img
        src={GearIcon}
        alt="Gear Icon"
        className="icon-gear"
        onClick={openGearPopup}
      />
      <Gachapog rates={rates} />
      {showGearPopup && <GearPopup onClose={closeGearPopup} onSetRates={handleSetRates} />}
    </div>
  );
}

export default App;

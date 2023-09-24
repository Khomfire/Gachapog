// GearPopup.js
import React, { useState } from 'react';

function GearPopup({ onClose, onSetRates }) {
  const [rates, setRates] = useState({ reward1: 0, reward2: 0, reward3: 0 });
  const [totalRewards, setTotalRewards] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newRates = { ...rates, [name]: parseInt(value) };
    setRates(newRates);

    // คำนวณเรท
    const total = Object.values(newRates).reduce((acc, curr) => acc + curr, 0);
    setTotalRewards(total);
  };

  const handleSave = () => {
    // ส่งค่าเรทไปยัง App.js
    onSetRates(rates);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>ตั้งค่ารางวัล</h2>
        <label>
        <p>
          จำนวนรางวัลที่ 1 :
          <input
            type="number"
            name="reward1"
            value={rates.reward1}
            onChange={handleChange}
          />
          </p>
        </label>
        <label>
        <p>
          จำนวนรางวัลที่ 2 :
          <input
            type="number"
            name="reward2"
            value={rates.reward2}
            onChange={handleChange}
          />
          </p>
        </label>
        <label>
          <p>
          จำนวนรางวัลที่ 3 :
          <input
            type="number"
            name="reward3"
            value={rates.reward3}
            onChange={handleChange}
          />
          </p>
        </label>
        
        <p>เรทของรางวัลที่ 1: {totalRewards === 0 ? 0 : (rates.reward1 / totalRewards).toFixed(2)}</p>
        <p>เรทของรางวัลที่ 2: {totalRewards === 0 ? 0 : (rates.reward2 / totalRewards).toFixed(2)}</p>
        <p>เรทของรางวัลที่ 3: {totalRewards === 0 ? 0 : (rates.reward3 / totalRewards).toFixed(2)}</p>
        <button onClick={handleSave}>บันทึก</button>
        <button onClick={onClose}>ปิด</button>
      </div>
    </div>
  );
}

export default GearPopup;

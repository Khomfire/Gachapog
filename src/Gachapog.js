import React, { useState } from 'react';
import GachapogPNG from './assets/gashapog1.png';
import Video1 from './assets/video/G1.mp4';
import Video2 from './assets/video/G2.mp4';
import Video3 from './assets/video/G3.mp4';
import './Gachapog.css';

function Gachapog({ rates }) {
  const [rounds, setRounds] = useState(0);
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  // State เพื่อควบคุมการแสดงวิดีโอ
  const [showVideo, setShowVideo] = useState(false);
  const [videoSource, setVideoSource] = useState('');
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);



  const handleRandom = () => {
    if (rates.reward1 === 0 && rates.reward2 === 0 && rates.reward3 === 0) {
      // ไม่สามารถสุ่มได้ถ้าไม่มีรางวัลเหลือ
      return;
    }

    const randomValue = Math.random();
    let reward;
    let totalRewards = rates.reward1 + rates.reward2 + rates.reward3;

    if (randomValue < rates.reward1 / totalRewards) {
      reward = 1;
      rates.reward1--; // ลดจำนวนรางวัลที่ 1
      setVideoSource(Video1);
      
    } else if (randomValue < (rates.reward1 + rates.reward2) / totalRewards) {
      reward = 2;
      rates.reward2--; // ลดจำนวนรางวัลที่ 2
      setVideoSource(Video2);
    } else {
      reward = 3;
      rates.reward3--; // ลดจำนวนรางวัลที่ 3
      setVideoSource(Video3);
    }

    setResult([...result, reward]);
    setRounds(rounds + 1);

    // แสดงวิดีโอเมื่อมีการคลิก "สุ่ม"
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    setShowResult(true);
    setShowVideo(false);
    setShowResultPopup(true); // เพิ่มบรรทัดนี้
  };

  const handleFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      if (!isFullScreen) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullScreen(!isFullScreen);
    }
  };
  
  

  return (
    <div>
      <h1 className="Gachapog" >Gachapog</h1>
      <img src={GachapogPNG} alt="Gachapog Machine" />
      <button
        onClick={handleRandom}
        disabled={rates.reward1 === 0 && rates.reward2 === 0 && rates.reward3 === 0}
        className="random-button" // เพิ่มคลาสนี้
      >
        สุ่ม
      </button>

      <button
        onClick={handleFullScreen}
        className={isFullScreen ? 'fullscreen-button active' : 'fullscreen-button'}
      >
        {isFullScreen ? 'ออกจากโหมดเต็มหน้าจอ' : 'เต็มหน้าจอ'}
      </button>

      {showVideo && (
        // แสดง popup วิดีโอเมื่อมีการคลิก "สุ่ม"
        <div className="video-popup">
          <video src={videoSource} autoPlay onEnded={handleVideoEnd} />
        </div>
      )}
      {showResult && (
        <div className="results">
          <div className="result-box">
            <div className="scrollable-box">
              <ul>
                {result.map((value, index) => (
                  <li key={index}>รอบที่ {index + 1} : {value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {showResultPopup && (
        <div className="result-popup">
          <div className="result-popup-content">
            <h1>ยินดีด้วย!</h1>
            <h2> รางวัลที่ {result[result.length - 1]} </h2>
            
            <button onClick={() => setShowResultPopup(false)}>ปิด</button>
          </div>
        </div>
      )}
      <div className="results-text">
        <h4>จำนวนรอบสุ่มทั้งหมด : {rounds}</h4>
        <p> ผลรางวัลทั้งหมด</p>
      </div>
      <div className="results-text2">
        <h4>จำนวนรางวัลทั้งหมด : {rates.reward1 + rates.reward2 + rates.reward3}</h4>
        <p>รางวัลที่ 1 ที่เหลือ : {rates.reward1} ({(rates.reward1 / (rates.reward1 + rates.reward2 + rates.reward3) * 100).toFixed(2)}%) </p>
        <p>รางวัลที่ 2 ที่เหลือ : {rates.reward2} ({(rates.reward2 / (rates.reward1 + rates.reward2 + rates.reward3) * 100).toFixed(2)}%) </p>
        <p>รางวัลที่ 3 ที่เหลือ : {rates.reward3} ({(rates.reward3 / (rates.reward1 + rates.reward2 + rates.reward3) * 100).toFixed(2)}%) </p>
      </div>
      <h3 className="GPT">Created by ChatGPT 95%</h3>
    </div>
  );
}

export default Gachapog;

import React, { useState, useEffect, useRef } from 'react';
import Canvas from 'canvas';
import RefreshIcon from '@mui/icons-material/Refresh';
const CaptchaGenerator = () => {
  const [captcha, setCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters[randomIndex];
    }

    setCaptcha(captcha);
    drawCaptcha(captcha);
  };

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the text
    ctx.font = '30px Arial';
    ctx.fillText(text, 10, 30);
  };

  const handleRefresh = () => {
    generateCaptcha();
    setUserInput('');
  };

  const handleSubmit = () => {
    if (userInput.toLowerCase() === captcha.toLowerCase()) {
      alert('CAPTCHA is correct!');
    } else {
      alert('CAPTCHA is incorrect. Please try again.');
    }
  };

  return (
    <div className=' flex items-center text-white '>
      <canvas ref={canvasRef} width="150" height="50" className=' bg-white rounded-md text-white pt-2 text-center flex justify-center items-center m-2'></canvas>
      <input
        className=' border border-slate-300 rounded-md ps-2 py-1'
        type="text"
        placeholder="Enter CAPTCHA"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleRefresh} className=' rounded-sm p-1'><RefreshIcon/></button>
      <br />
     
      <button onClick={handleSubmit} className=' bg-green-700  rounded-md p-1 text-white'>Verify</button>
    </div>
  );
};

export default CaptchaGenerator;
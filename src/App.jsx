import { useRef, useEffect } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
//* Drawing a cicle 
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");

  //   const resizeCanvas = () => {
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  //   };
  //   resizeCanvas();
  //   window.addEventListener("resize", resizeCanvas);

  //   ctx.fillStyle = 'red';
  //   ctx.beginPath();
  //   ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2)
  //   ctx.fill();

  //   return () => {
  //     window.addEventListener("resize", resizeCanvas);
  //   }
  // }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let speedX = 3;
    let speecY = 2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(x, y, 50, 0, Math.PI * 2)
      ctx.fill();

      if (x + 50 > canvas.width || x - 50 < 0) speedX = -speedX;
      if (y + 50 > canvas.height || y - 50 < 0) speecY = -speecY;

      x += speedX;
      y += speecY;

      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })

  return (
    <>
      <canvas ref={canvasRef} style={{ background: '#000', display: 'block', }}>
        <div className="wrapper flex justify-center">
          <h1 className="text-black text-6xl uppercase">Canvas</h1>
        </div>
      </canvas>
    </>
  );
}

export default App;

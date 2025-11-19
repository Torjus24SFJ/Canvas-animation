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

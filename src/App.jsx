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

  //* Moving a circle
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');

  //   let x = canvas.width / 2;
  //   let y = canvas.height / 2;
  //   let speedX = 3;
  //   let speecY = 2;

  //   const animate = () => {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);

  //     ctx.fillStyle = 'red';
  //     ctx.beginPath();
  //     ctx.arc(x, y, 50, 0, Math.PI * 2)
  //     ctx.fill();

  //     if (x + 50 > canvas.width || x - 50 < 0) speedX = -speedX;
  //     if (y + 50 > canvas.height || y - 50 < 0) speecY = -speecY;

  //     x += speedX;
  //     y += speecY;

  //     requestAnimationFrame(animate);
  //   }
  //   animate();

  //   const handleResize = () => {
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  //   }
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   }
  // })

  //* Bouncing DVD Logo
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let speedX = 3;
    let speedY = 2;

    let hue = 0;

    let cornerHits = 0;
    let highScore = 0;
    let leaderboard = [];

    const saved = localStorage.getItem("leaderboard");
    if (saved) {
      leaderboard = JSON.parse(saved);
      highScore = leaderboard[0]?.score || 0;
    }

    const saveToLeaderboard = () => {
      const entry = {
        score: cornerHits,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      leaderboard = [...leaderboard, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
      highScore = leaderboard[0].score;
    };

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "bold 100px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.fillText("DVD", x, y);

      ctx.font = "bold 30px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Video", x, y + 50);

      x += speedX;
      y += speedY;

      let hitCorner = false;

      if (x + 80 > canvas.width || x - 80 < 0) {
        speedX = -speedX;
        x = Math.max(80, Math.min(canvas.width - 80, x));
        if (y < 100 || y > canvas.height - 100) hitCorner = true;
      }

      if (y + 80 > canvas.height || y - 80 < 0) {
        speedY = -speedY;
        y = Math.max(80, Math.min(canvas.height - 80, y));
        if (x < 120 || x > canvas.width - 120) hitCorner = true;
      }

      if (hitCorner) {
        hue = Math.random() * 360;
        cornerHits++;
      } else {
        hue += 1;
      }

      if (cornerHits > highScore) {
        saveToLeaderboard();
      }

      ctx.font = "bold 32px Arial";
      ctx.fillStyle = "gray";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`Counter: ${cornerHits}`, 30, 30);

      ctx.font = "bold 32px Arial";
      ctx.fillStyle = "gray";
      ctx.fillText("Top 10:", 30, 90);

      ctx.font = "32px Arial";
      leaderboard.slice(0, 10).forEach((entry, i) => {
        ctx.fillText(
          `${i + 1}. ${entry.score} — ${entry.date} ${entry.time}`,
          30,
          180 + i * 35
        );
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ background: "black", display: "block" }}
      />
    </>
  );
}

export default App;

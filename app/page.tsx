"use client";

import { useEffect, useState } from "react";

function BaseCloud({ children, x, y, speed, direction, scale }: any) {
  const [offset, setOffset] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setOffset((prev) => {
      let next = prev + speed * direction;

      // Lebar layar (misal 1400px, bisa sesuaikan)
      const screenWidth = 1400;

      // Kalau awan ke kanan
      if (direction === 1 && next > screenWidth) {
        return -400; // muncul lagi dari kiri (diluar layar)
      }

      // Kalau awan ke kiri
      if (direction === -1 && next < -400) {
        return screenWidth; // muncul lagi dari kanan (diluar layar)
      }

      return next;
    });
  }, 50);
  return () => clearInterval(interval);
}, [speed, direction]);


  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        transform: `translateX(${offset}px) scale(${scale})`,
        opacity: 0.9,
        transition: "transform 0.1s linear",
      }}
    >
      <svg width="200" height="100" viewBox="0 0 400 200">
        <defs>
          <linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="#d6f3ff" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {children}
      </svg>
    </div>
  );
}

function Cloud(props: any) {
  return (
    <BaseCloud {...props}>
      <ellipse cx="100" cy="80" rx="60" ry="35" fill="url(#cloudGradient)" />
      <ellipse cx="160" cy="85" rx="70" ry="40" fill="url(#cloudGradient)" />
      <ellipse cx="220" cy="75" rx="55" ry="30" fill="url(#cloudGradient)" />
    </BaseCloud>
  );
}

export default function Home() {
  return (
    <main
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #4facfe, #00f2fe)", // gradasi langit
        position: "relative",
      }}
    >
      {/* Matahari */}
      <div
        style={{
          position: "absolute",
          top: "50px",
          right: "100px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #fff7a1, #ffae00)",
          boxShadow: "0 0 60px rgba(255, 200, 0, 0.7)",
        }}
      />

      {/* Awan */}
      <Cloud x={100} y={100} speed={2} direction={1} scale={0.9} />
      <Cloud x={300} y={150} speed={1.5} direction={-1} scale={0.8} />
      <Cloud x={600} y={80} speed={2.5} direction={1} scale={0.8} />
      <Cloud x={900} y={200} speed={1.2} direction={-1} scale={0.9} />
      <Cloud x={200} y={250} speed={1.8} direction={1} scale={0.8} />
    </main>
  );
}

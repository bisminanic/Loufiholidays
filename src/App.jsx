import React, { useEffect, useRef } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

import { theme } from "./theme";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Destinations from "./components/Destinations";
import ContactUs from "./components/ContactUs";
import TestimonialsAndNewsletter from "./components/Testimonials";
import Testimonials from "./components/Testimonials";

export default function App() {

  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {

    let mouseX = 0;
    let mouseY = 0;

    let circleX = 0;
    let circleY = 0;

    // Mouse move
    const moveCursor = (e) => {

      mouseX = e.clientX;
      mouseY = e.clientY;

      // DOT instantly follows
      if (dotRef.current) {

        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    // Circle delayed animation
    const animateCircle = () => {

      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;

      if (cursorRef.current) {

        cursorRef.current.style.left = `${circleX}px`;
        cursorRef.current.style.top = `${circleY}px`;
      }

      requestAnimationFrame(animateCircle);
    };

    animateCircle();

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };

  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ───────────────── OUTER CIRCLE ───────────────── */}
      <Box
        ref={cursorRef}
        sx={{
          width: "42px",
          height: "42px",

          border: "3px solid #c7d300",

          borderRadius: "50%",

          position: "fixed",

          top: 0,
          left: 0,

          transform: "translate(-50%, -50%)",

          pointerEvents: "none",

          zIndex: 999999,

          transition: "width 0.3s ease, height 0.3s ease",

          background: "transparent",
        }}
      />

      {/* ───────────────── INNER DOT ───────────────── */}
      <Box
        ref={dotRef}
        sx={{
          width: "8px",
          height: "8px",

          background: "#000",

          borderRadius: "50%",

          position: "fixed",

          top: 0,
          left: 0,

          transform: "translate(-50%, -50%)",

          pointerEvents: "none",

          zIndex: 999999,
        }}
      />

      {/* ───────────────── APP ───────────────── */}
      <Box
        sx={{
          overflowX: "hidden",
        }}
      >
        <Navbar />

        <Hero />
        <Testimonials/>
        <ContactUs/>
        <Footer/>
      </Box>

      {/* ───────────────── HIDE DEFAULT CURSOR ───────────────── */}
      <style>
        {`
          html,
          body,
          * {
            cursor: none !important;
          }
        `}
      </style>
    </ThemeProvider>
  );
}
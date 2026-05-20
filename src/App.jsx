import React, { useEffect, useRef } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "./theme";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

export default function App() {
  const cursorRef = useRef(null);
  const dotRef    = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0, circleX = 0, circleY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top  = `${mouseY}px`;
      }
    };

    const animateCircle = () => {
      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${circleX}px`;
        cursorRef.current.style.top  = `${circleY}px`;
      }
      requestAnimationFrame(animateCircle);
    };

    animateCircle();
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Custom cursor */}
      <Box ref={cursorRef} sx={{ width: "42px", height: "42px", border: "3px solid #c7d300", borderRadius: "50%", position: "fixed", top: 0, left: 0, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 999999, background: "transparent", transition: "width 0.3s ease, height 0.3s ease" }} />
      <Box ref={dotRef}    sx={{ width: "8px", height: "8px", background: "#000", borderRadius: "50%", position: "fixed", top: 0, left: 0, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 999999 }} />

      <Box sx={{ overflowX: "hidden" }}>
        <Navbar />

        {/* Each section has an id for scroll targeting */}
        <Box id="home">
          <Hero />
        </Box>

        <Box id="testimonials">
          <Testimonials />
        </Box>

        <Box id="contact">
          <ContactUs />
        </Box>

        <Footer />
      </Box>

      <style>{`html, body, * { cursor: none !important; }`}</style>
    </ThemeProvider>
  );
}
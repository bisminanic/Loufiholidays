import { useEffect, useRef } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { theme } from "./theme";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import AboutUs from "./components/Aboutus";
import TrendingDestinations from "./components/TrendingDestinations";
import Holidays from "./components/Holidays";
import DestinationDetails from "./Pages/DestinationDetails";
import GlobalVisa from "./Pages/GlobalVisa";

// ── Cursor ───────────────────────────────────────────────────
function Cursor() {
  const cursorRef = useRef(null);
  const dotRef    = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0, circleX = 0, circleY = 0;
    const move = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top  = `${mouseY}px`;
      }
    };
    const animate = () => {
      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${circleX}px`;
        cursorRef.current.style.top  = `${circleY}px`;
      }
      requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <Box ref={cursorRef} sx={{ width: "42px", height: "42px", border: "3px solid #c7d300", borderRadius: "50%", position: "fixed", top: 0, left: 0, transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 999999, background: "transparent", transition: "width 0.3s ease, height 0.3s ease" }} />
      <Box ref={dotRef}    sx={{ width: "8px",  height: "8px",  background: "#c7d300", borderRadius: "50%", position: "fixed", top: 0, left: 0, transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 999999 }} />
    </>
  );
}

// ── Scroll to top on route change ────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

// ── Home page (all sections) ─────────────────────────────────
function HomePage() {
  const location = useLocation();

  // If navigated back from destinations, scroll to that section
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  return (
    <>
      <Box id="home">        <Hero />               </Box>
      <Box id="holidays">   <Holidays />            </Box>
      <Box id="destinations"><TrendingDestinations /></Box>
      <Box id="about">      <AboutUs />             </Box>
      <Box id="testimonials"><Testimonials />        </Box>
      <Box id="contact">    <ContactUs />           </Box>
      <Footer />
    </>
  );
}

// ── Destination page wrapper ─────────────────────────────────
function DestinationPage() {
  const navigate  = useNavigate();
  const location  = useLocation();

  // derive tab from URL: /destinations/domestic or /destinations/international
  const tab = location.pathname.includes("international") ? "international" : "domestic";

  const handleBack = () => {
    navigate("/", { state: { scrollTo: "destinations" } });
  };

  return (
    <>
      <DestinationDetails initialTab={tab} onBack={handleBack} />
      <Footer />
    </>
  );
}

// ── Navbar wrapper — gets navigate for destination clicks ─────
function NavbarWrapper() {
  const navigate = useNavigate();
  return (
    <Navbar
      onDestinationClick={(tab) => navigate(`/destinations/${tab}`)}
    />
  );
}

// ── Root ─────────────────────────────────────────────────────
function AppContent() {
  return (
    <>
      <Cursor />
      <ScrollToTop />
      <Box sx={{ overflowX: "hidden" }}>
        <NavbarWrapper />
        <Routes>
          <Route path="/"                              element={<HomePage />} />
          <Route path="/destinations/domestic"         element={<DestinationPage />} />
          <Route path="/destinations/international"    element={<DestinationPage />} />
          {/* fallback */}
          <Route path="/destinations"                  element={<DestinationPage />} />
          <Route path="/visa" element={<GlobalVisa />} />
        </Routes>
      </Box>
      <style>{`html, body, * { cursor: none !important; }`}</style>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}
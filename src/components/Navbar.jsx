import { useEffect, useRef, useState } from "react";
import {
  AppBar, Toolbar, Button, Box, IconButton,
  Drawer, useMediaQuery, useTheme as useMuiTheme, Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { gsap } from "gsap";
import Logo from "../assets/loufibg.png";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

// ── Nav links — href = section id to scroll to, or null for dropdowns ──
const navLinks = [
  { label: "Home",         scrollTo: "home" },
  {
    label: "Holidays", serviceName: "Holiday Services",
    dropdown: ["Holiday Packages","Beach Escapes","Honeymoon Trips","Family Tours","Adventure Tours","Luxury Holidays","Cruise Packages","Group Tours","Weekend Getaways","Customized Trips"],
  },
  {
    label: "Global Visa", serviceName: "Visa Services",
    dropdown: ["Tourist Visa","Business Visa","Student Visa","Work Permit","Immigration","Visa on Arrival","Express Visa","Dependent Visa","Documentation Support","Visa Consultation"],
  },
  {
    label: "Destinations", serviceName: "Popular Destinations",
    dropdown: ["Dubai","Thailand","Maldives","Bali","Turkey","Singapore","Malaysia","Europe","Switzerland","Paris","Japan","Vietnam","Saudi Arabia","Georgia","Azerbaijan"],
  },
  {
    label: "Offers", badge: "HOT", serviceName: "Special Deals",
    dropdown: ["Summer Deals","Dubai Sale","Honeymoon Offers","Last Minute Trips","Group Discounts","Family Offers","Student Offers","Festival Packages","Early Bird Discounts"],
  },
  { label: "About Us",     scrollTo: "home" },
  { label: "Testimonials", scrollTo: "testimonials" },
  { label: "Contact",      scrollTo: "contact" },
];

// Smooth scroll helper — accounts for fixed navbar height
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 70;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
};

export default function Navbar() {
  const navRef   = useRef(null);
  const badgeRef = useRef(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [openMenu,   setOpenMenu]   = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  // entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".nav-item",
        { y: -28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.0, ease: "power2.out", delay: 0.5 }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  // scroll bg + active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // detect which section is in view
      const sections = ["home", "testimonials", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // HOT badge sparks
  useEffect(() => {
    const wrap = badgeRef.current;
    if (!wrap) return;
    const colors = ["#ff9a00","#ffcc00","#ff6a3d","#ff4d6d","#ffdd57"];
    const interval = setInterval(() => {
      const spark = document.createElement("div");
      const size = 2 + Math.random() * 4;
      const duration = (0.55 + Math.random() * 0.55) * 1000;
      const drift = (Math.random() - 0.5) * 12;
      const color = colors[Math.floor(Math.random() * colors.length)];
      Object.assign(spark.style, {
        position: "absolute", width: `${size}px`, height: `${size}px`,
        borderRadius: "50%", background: color,
        boxShadow: `0 0 ${size + 1}px ${color}`,
        left: `${10 + Math.random() * 80}%`, bottom: "100%",
        pointerEvents: "none", zIndex: 10,
      });
      wrap.appendChild(spark);
      spark.animate(
        [{ transform: "translateY(0) translateX(0) scale(1)", opacity: 1 },
         { transform: `translateY(-28px) translateX(${drift}px) scale(0)`, opacity: 0 }],
        { duration, easing: "ease-out", fill: "forwards" }
      );
      setTimeout(() => spark.remove(), duration + 50);
    }, 280);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = (e, label) => {
    e.stopPropagation();
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const handleNavClick = (link, e) => {
    if (link.scrollTo) {
      scrollToSection(link.scrollTo);
      setDrawerOpen(false);
      setOpenMenu(null);
    } else if (link.dropdown) {
      toggleMenu(e, link.label);
    }
  };

  const isActive = (link) => link.scrollTo && activeSection === link.scrollTo;

  return (
    <AppBar ref={navRef} elevation={0}
      sx={{ background: "#fff", borderBottom: scrolled ? "1px solid rgba(199,211,0,0.2)" : "none", transition: "all 0.7s ease" }}>
      <Toolbar sx={{ maxWidth: 1800, mx: "auto", width: "100%", py: 1, px: { xs: 2, md: 4 } }}>

        {/* Logo */}
        <Box className="nav-item" onClick={() => scrollToSection("home")}
          sx={{ display: "flex", alignItems: "center", flexGrow: { xs: 1, md: 0 }, mr: { md: 5 }, cursor: "pointer" }}>
          <img src={Logo} alt="Loufi" style={{ width: "auto", height: 50 }} />
        </Box>

        {/* Desktop Nav */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
            {navLinks.map((link) => (
              <Box key={link.label} sx={{ position: "relative" }}>
                <Button
                  className="nav-item"
                  onClick={(e) => handleNavClick(link, e)}
                  endIcon={link.dropdown ? (
                    <KeyboardArrowDownIcon sx={{ fontSize: "18px !important", transition: "transform 0.3s", transform: openMenu === link.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                  ) : undefined}
                  sx={{
                    color: isActive(link) ? "#c7d300" : "#1a1a2e",
                    fontWeight: isActive(link) ? 700 : 500,
                    fontSize: "0.9rem",
                    px: 1.8,
                    textTransform: "none",
                    "&:hover": { color: "#c7d300", background: "transparent" },
                    position: "relative",
                    "&::after": isActive(link) ? {
                      content: '""', position: "absolute", bottom: 4,
                      left: "50%", transform: "translateX(-50%)",
                      width: 6, height: 6, borderRadius: "50%", background: "#c7d300",
                    } : {},
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {link.label}
                    {link.badge && (
                      <Box ref={badgeRef} sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <Box sx={{
                          position: "relative", overflow: "hidden",
                          px: 1.1, py: 0.4, borderRadius: "30px",
                          fontSize: "0.62rem", fontWeight: 900, letterSpacing: "0.1em", lineHeight: 1.2,
                          color: "#fff", background: "linear-gradient(90deg, #f8375a 0%, #ff6a3d 100%)",
                          animation: "bubbleBounce 2.2s cubic-bezier(.36,.07,.19,.97) infinite, glowPulse 2.2s ease-in-out infinite",
                          "&::after": { content: '""', position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)", animation: "shimmer 2.5s linear infinite" },
                          "@keyframes bubbleBounce": { "0%": { transform: "scale(1) translateY(0)" }, "30%": { transform: "scale(1.18,0.88) translateY(2px)" }, "55%": { transform: "scale(0.92,1.12) translateY(-5px)" }, "70%": { transform: "scale(1.06,0.95) translateY(0)" }, "85%": { transform: "scale(0.97,1.03) translateY(-2px)" }, "100%": { transform: "scale(1) translateY(0)" } },
                          "@keyframes glowPulse": { "0%,100%": { boxShadow: "0 3px 12px rgba(255,80,120,0.4)" }, "50%": { boxShadow: "0 5px 22px rgba(255,80,120,0.7), 0 0 0 7px rgba(255,80,120,0.07)" } },
                          "@keyframes shimmer": { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(200%)" } },
                        }}>
                          {link.badge}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Button>

                {/* Dropdown */}
                {link.dropdown && openMenu === link.label && (
                  <Box onClick={(e) => e.stopPropagation()}
                    sx={{ position: "absolute", top: "calc(100% + 8px)", left: 0, minWidth: 200, background: "#fff", borderRadius: "14px", boxShadow: "0 12px 40px rgba(0,0,0,0.13)", border: "1px solid rgba(199,211,0,0.25)", py: 1, zIndex: 999, animation: "fadeDown 0.2s ease", "@keyframes fadeDown": { from: { opacity: 0, transform: "translateY(-8px)" }, to: { opacity: 1, transform: "translateY(0)" } } }}>
                    <Box sx={{ mx: 1.5, mb: 1, px: 1.5, py: 0.8, background: "linear-gradient(135deg,#c7d300,#9aa000)", borderRadius: "8px" }}>
                      <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.05em" }}>{link.serviceName}</Typography>
                    </Box>
                    {link.dropdown.map((item) => (
                      <Box key={item} onClick={() => setOpenMenu(null)}
                        sx={{ px: 2.5, py: 0.9, fontSize: "0.875rem", color: "#1a1a2e", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", "&:hover": { color: "#9aa000", background: "rgba(199,211,0,0.08)", paddingLeft: "24px" } }}>
                        {item}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* CTA Buttons */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1.5 }} className="nav-item">
            <Button variant="outlined" startIcon={<WhatsAppIcon />}
              component="a" href="https://wa.me/917736062244" target="_blank"
              sx={{ borderColor: "#fff", background: "#fff", color: "#1a1a2e", borderRadius: "17px", px: 3, py: 1, textTransform: "none", fontWeight: 600, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", transition: "all 0.3s ease", "&:hover": { borderColor: "#c7d300", color: "#c7d300", backgroundColor: "transparent", transform: "translateY(-1px)" } }}>
              WhatsApp Us
            </Button>
            <Button startIcon={<RequestQuoteIcon />} variant="contained"
              onClick={() => scrollToSection("contact")}
              sx={{ px: 3, py: 1, background: "#c7d300", color: "#1a1a2e", borderRadius: "17px", fontWeight: 700, textTransform: "none", "&:hover": { background: "#d9e633" } }}>
              Get a Quote
            </Button>
          </Box>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon sx={{ color: "#1a1a2e" }} />
          </IconButton>
        )}
      </Toolbar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: "85%", maxWidth: 340, height: "100vh", background: "#111827", color: "#fff", borderTopLeftRadius: "24px", borderBottomLeftRadius: "24px", overflow: "hidden" } }}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>

          <Box sx={{ px: 3, py: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <img src={Logo} alt="Loufi" style={{ height: 42, width: "auto" }} />
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 2, display: "flex", flexDirection: "column", gap: 1, minHeight: 0 }}>
            {navLinks.map((link) => (
              <Box key={link.label} sx={{ width: "100%" }}>
                <Box
                  onClick={(e) => handleNavClick(link, e)}
                  sx={{
                    px: 2, py: 1.4, borderRadius: "14px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    cursor: "pointer", transition: "all 0.3s ease",
                    background: isActive(link) ? "rgba(199,211,0,0.12)" : openMenu === link.label ? "rgba(199,211,0,0.06)" : "transparent",
                    "&:hover": { background: "rgba(255,255,255,0.04)" },
                  }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: isActive(link) || openMenu === link.label ? "#c7d300" : "#fff" }}>
                    {link.label}
                  </Typography>
                  {link.dropdown && (
                    <KeyboardArrowDownIcon sx={{ transition: "0.3s", transform: openMenu === link.label ? "rotate(180deg)" : "rotate(0deg)", color: openMenu === link.label ? "#c7d300" : "rgba(255,255,255,0.5)" }} />
                  )}
                </Box>

                {link.dropdown && openMenu === link.label && (
                  <Box sx={{ mt: 1, ml: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                    {link.dropdown.map((item) => (
                      <Box key={item} onClick={() => setDrawerOpen(false)}
                        sx={{ px: 2, py: 1, borderRadius: "12px", fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", transition: "0.25s", cursor: "pointer", "&:hover": { background: "rgba(199,211,0,0.08)", color: "#c7d300", pl: 2.5 } }}>
                        {item}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <Box sx={{ p: 2.5, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button variant="outlined" fullWidth component="a" href="https://wa.me/917736062244" target="_blank"
              sx={{ borderColor: "#c7d300", color: "#c7d300", borderRadius: "14px", py: 1.2, fontWeight: 600, textTransform: "none", "&:hover": { background: "rgba(199,211,0,0.08)" } }}>
              WhatsApp Us
            </Button>
            <Button variant="contained" fullWidth
              onClick={() => { scrollToSection("contact"); setDrawerOpen(false); }}
              sx={{ background: "#c7d300", color: "#111827", borderRadius: "14px", py: 1.2, fontWeight: 700, textTransform: "none", boxShadow: "none", "&:hover": { background: "#dce84a" } }}>
              Get a Quote
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
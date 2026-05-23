import { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { holidayCategories } from "../Datas/holidaysdata";

gsap.registerPlugin(ScrollTrigger);

const allPackages = holidayCategories.flatMap((cat) =>
  cat.packages.map((pkg) => ({ ...pkg, categoryLabel: cat.label, categoryColor: cat.color }))
);

// ── Package Card ─────────────────────────────────────────────
function PackageCard({ pkg, onSelect }) {
  return (
    <Box
      onClick={() => onSelect(pkg)}
      sx={{
        flexShrink: 0,
        width: { xs: 260, sm: 290, md: 310 },
        borderRadius: "22px",
        overflow: "hidden",
        background: "#fff",
        border: "1.5px solid rgba(199,211,0,0.18)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 24px 50px rgba(199,211,0,0.22)",
          borderColor: "#c7d300",
        },
        "& img": { transition: "transform 0.4s ease" },
        "&:hover img": { transform: "scale(1.07)" },
      }}
    >
      {/* Image area */}
      <Box sx={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={pkg.image} alt={pkg.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 55%)" }} />

        {/* Category */}
        <Box sx={{ position: "absolute", top: 12, left: 12, px: 1.2, py: 0.4, borderRadius: "8px", background: `${pkg.categoryColor}ee` }}>
          <Typography sx={{ color: "#1a1a2e", fontSize: "0.67rem", fontWeight: 800 }}>{pkg.categoryLabel}</Typography>
        </Box>

        {/* Price */}
        <Box sx={{ position: "absolute", top: 12, right: 12, px: 1.2, py: 0.4, borderRadius: "8px", background: "rgba(10,10,20,0.75)", border: "1px solid rgba(199,211,0,0.4)" }}>
          <Typography sx={{ color: "#c7d300", fontSize: "0.78rem", fontWeight: 800 }}>{pkg.price}</Typography>
        </Box>

        {/* Duration bottom */}
        <Box sx={{ position: "absolute", bottom: 12, left: 12 }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1.2, py: 0.4, borderRadius: "8px", background: "rgba(199,211,0,0.92)" }}>
            <AccessTimeIcon sx={{ fontSize: 12, color: "#1a1a2e" }} />
            <Typography sx={{ color: "#1a1a2e", fontSize: "0.68rem", fontWeight: 800 }}>{pkg.duration}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Text area */}
      <Box sx={{ p: 2.5 }}>
        <Typography sx={{ fontWeight: 800, fontSize: "0.98rem", color: "#1a1a2e", mb: 0.3, lineHeight: 1.3 }}>{pkg.title}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <FlightTakeoffIcon sx={{ fontSize: 12, color: "#bbb" }} />
          <Typography sx={{ color: "#999", fontSize: "0.77rem" }}>{pkg.destination}</Typography>
        </Box>

        {/* Top highlights */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
          {pkg.highlights.slice(0, 3).map((h, i) => (
            <Box key={i} sx={{ px: 1, py: 0.3, borderRadius: "6px", background: "rgba(199,211,0,0.1)", border: "1px solid rgba(199,211,0,0.2)" }}>
              <Typography sx={{ fontSize: "0.66rem", color: "#7a8400", fontWeight: 700 }}>{h}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ── Detail Inner Page ────────────────────────────────────────
function DetailPage({ pkg, onBack }) {
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    gsap.fromTo(ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
  }, []);

  return (
    <Box ref={ref} sx={{ minHeight: "100vh", background: "#f9fafb", pt: "66px" }}>

      {/* Hero */}
      <Box sx={{ position: "relative", height: { xs: 260, md: 400 }, overflow: "hidden" }}>
        <img src={pkg.image} alt={pkg.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.15) 60%,transparent 100%)" }} />

        <Button onClick={onBack} startIcon={<ArrowBackIcon />}
          sx={{ position: "absolute", top: 20, left: 20, background: "rgba(255,255,255,0.93)", color: "#1a1a2e", borderRadius: "12px", fontWeight: 700, textTransform: "none", fontSize: "0.85rem", px: 2, py: 0.8, "&:hover": { background: "#fff" }, transition: "all 0.2s" }}>
          Back
        </Button>

        <Box sx={{ position: "absolute", top: 20, right: 20, px: 1.5, py: 0.5, borderRadius: "10px", background: `${pkg.categoryColor || "#c7d300"}ee` }}>
          <Typography sx={{ color: "#1a1a2e", fontSize: "0.7rem", fontWeight: 800 }}>{pkg.categoryLabel}</Typography>
        </Box>

        <Box sx={{ position: "absolute", bottom: 24, left: { xs: 20, md: 48 }, right: { xs: 20, md: 48 }, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.4rem" }, lineHeight: 1.1, mb: 0.5 }}>{pkg.title}</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FlightTakeoffIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }} />
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>{pkg.destination}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }} />
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>{pkg.duration}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>Starting from</Typography>
            <Typography sx={{ color: "#c7d300", fontWeight: 900, fontSize: { xs: "1.6rem", md: "2rem" }, lineHeight: 1 }}>{pkg.price}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ maxWidth: 1000, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "flex-start" }}>

          {/* Left */}
          <Box sx={{ flex: "1 1 60%" }}>

            {/* Highlights */}
            <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, mb: 3, border: "1.5px solid rgba(199,211,0,0.18)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <Typography sx={{ fontWeight: 800, color: "#1a1a2e", fontSize: "0.95rem", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 4, height: 18, borderRadius: "2px", background: "#c7d300", flexShrink: 0 }} /> Trip Highlights
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {pkg.highlights.map((h, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.8, px: 1.4, py: 0.6, borderRadius: "10px", background: "rgba(199,211,0,0.1)", border: "1px solid rgba(199,211,0,0.22)" }}>
                    <CheckCircleIcon sx={{ fontSize: 13, color: "#c7d300" }} />
                    <Typography sx={{ fontSize: "0.78rem", color: "#555", fontWeight: 600 }}>{h}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Itinerary */}
            <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, border: "1.5px solid rgba(199,211,0,0.18)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <Typography sx={{ fontWeight: 800, color: "#1a1a2e", fontSize: "0.95rem", mb: 2.5, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 4, height: 18, borderRadius: "2px", background: "#c7d300", flexShrink: 0 }} /> Day-by-Day Itinerary
              </Typography>
              {pkg.itinerary.map((day, i) => (
                <Box key={i} sx={{ display: "flex", gap: 2.5, position: "relative" }}>
                  {i < pkg.itinerary.length - 1 && (
                    <Box sx={{ position: "absolute", left: 19, top: 42, bottom: -10, width: 2, background: "linear-gradient(180deg,rgba(199,211,0,0.35),rgba(199,211,0,0.05))", zIndex: 0 }} />
                  )}
                  <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#c7d300,#9aa000)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                    <Typography sx={{ color: "#1a1a2e", fontWeight: 900, fontSize: "0.68rem" }}>D{day.day}</Typography>
                  </Box>
                  <Box sx={{ pb: 3, flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, color: "#1a1a2e", fontSize: "0.92rem", mb: 0.3 }}>{day.title}</Typography>
                    <Typography sx={{ color: "#888", fontSize: "0.83rem", lineHeight: 1.7 }}>{day.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right sticky */}
          <Box sx={{ flex: "0 0 280px", width: { xs: "100%", md: 280 }, position: { md: "sticky" }, top: 90 }}>
            <Box sx={{ background: "#fff", borderRadius: "22px", p: 3, border: "1.5px solid rgba(199,211,0,0.22)", boxShadow: "0 8px 36px rgba(0,0,0,0.09)" }}>
              <Typography sx={{ fontWeight: 800, color: "#1a1a2e", fontSize: "0.95rem", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 4, height: 18, borderRadius: "2px", background: "#c7d300", flexShrink: 0 }} /> Package Includes
              </Typography>
              {pkg.includes.map((inc, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.1 }}>
                  <CheckCircleIcon sx={{ color: "#c7d300", fontSize: 15, flexShrink: 0 }} />
                  <Typography sx={{ color: "#555", fontSize: "0.83rem" }}>{inc}</Typography>
                </Box>
              ))}

              <Box sx={{ mt: 3, pt: 2.5, borderTop: "1px solid rgba(199,211,0,0.18)" }}>
                <Typography sx={{ color: "#aaa", fontSize: "0.76rem", mb: 0.4 }}>Starting from</Typography>
                <Typography sx={{ color: "#1a1a2e", fontWeight: 900, fontSize: "1.9rem", lineHeight: 1, mb: 0.2 }}>{pkg.price}</Typography>
                <Typography sx={{ color: "#bbb", fontSize: "0.73rem", mb: 2.5 }}>per person · {pkg.duration}</Typography>

                <Button fullWidth variant="contained" startIcon={<WhatsAppIcon />}
                  component="a" href="https://wa.me/917736062244" target="_blank"
                  sx={{ background: "#25D366", color: "#fff", borderRadius: "13px", py: 1.4, fontWeight: 700, fontSize: "0.9rem", textTransform: "none", mb: 1.2, boxShadow: "0 6px 18px rgba(37,211,102,0.28)", "&:hover": { background: "#20ba5a" } }}>
                  Book via WhatsApp
                </Button>

                <Button fullWidth variant="outlined" onClick={onBack}
                  sx={{ borderColor: "rgba(199,211,0,0.4)", color: "#9aa000", borderRadius: "13px", py: 1.1, fontWeight: 600, textTransform: "none", "&:hover": { background: "rgba(199,211,0,0.06)", borderColor: "#c7d300" } }}>
                  ← Browse More
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ── Main Holidays Section ────────────────────────────────────
export default function Holidays() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const [detailPkg, setDetailPkg] = useState(null);
  const [canLeft,   setCanLeft]   = useState(false);
  const [canRight,  setCanRight]  = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hol-title, .hol-sub",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".hol-title", start: "top 85%" } }
      );
      gsap.fromTo(".hol-track",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".hol-track", start: "top 88%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const check = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const handleSelect = (pkg) => {
    setDetailPkg(pkg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setDetailPkg(null);
    setTimeout(() => {
      const el = document.getElementById("holidays");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  if (detailPkg) return <DetailPage pkg={detailPkg} onBack={handleBack} />;

  return (
    <Box ref={sectionRef} sx={{ background: "linear-gradient(160deg,#f8f9f2 0%,#ffffff 55%,#f2f5e8 100%)", py: { xs: 6, md: 9 }, position: "relative", overflow: "hidden" }}>

      {/* Dot grid */}
      <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(199,211,0,0.18) 1px,transparent 1px)", backgroundSize: "30px 30px", zIndex: 0, pointerEvents: "none" }} />
      {/* Glow */}
      <Box sx={{ position: "absolute", top: -60, right: -60, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(199,211,0,0.13) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1300, mx: "auto", px: { xs: 2, md: 4 } }}>

        {/* Header */}
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, px: 2.2, py: 0.7, borderRadius: "30px", background: "rgba(199,211,0,0.15)", border: "1px solid rgba(199,211,0,0.35)", mb: 2 }}>
            <FlightTakeoffIcon sx={{ color: "#9aa000", fontSize: 16 }} />
            <Typography sx={{ color: "#7a8400", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Holiday Packages</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography className="hol-title" sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 900, lineHeight: 1.1, color: "#1a1a2e" }}>
                Find Your Perfect
                <Box component="span" sx={{ display: "block", background: "linear-gradient(135deg,#9aa000,#c7d300)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Holiday
                </Box>
              </Typography>
              <Typography className="hol-sub" sx={{ color: "#888", fontSize: "0.95rem", mt: 1 }}>
                Handcrafted packages for every kind of traveller
              </Typography>
            </Box>

            {/* Arrow buttons — desktop */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.2 }}>
              <IconButton onClick={() => scroll(-1)} disabled={!canLeft}
                sx={{ width: 44, height: 44, background: canLeft ? "#fff" : "rgba(255,255,255,0.5)", border: "1.5px solid rgba(199,211,0,0.35)", color: canLeft ? "#9aa000" : "#ccc", borderRadius: "12px", "&:hover": { background: "#c7d300", color: "#1a1a2e", borderColor: "#c7d300" }, transition: "all 0.2s" }}>
                <ArrowBackIosNewIcon sx={{ fontSize: 15 }} />
              </IconButton>
              <IconButton onClick={() => scroll(1)} disabled={!canRight}
                sx={{ width: 44, height: 44, background: canRight ? "#fff" : "rgba(255,255,255,0.5)", border: "1.5px solid rgba(199,211,0,0.35)", color: canRight ? "#9aa000" : "#ccc", borderRadius: "12px", "&:hover": { background: "#c7d300", color: "#1a1a2e", borderColor: "#c7d300" }, transition: "all 0.2s" }}>
                <ArrowForwardIosIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Carousel */}
        <Box sx={{ position: "relative" }}>
          <Box
            ref={trackRef}
            onScroll={check}
            className="hol-track"
            sx={{
              display: "flex",
              gap: 2.5,
              overflowX: "auto",
              pb: 2,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {allPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onSelect={handleSelect} />
            ))}
          </Box>

          {/* Mobile arrows */}
          {canLeft && (
            <IconButton onClick={() => scroll(-1)}
              sx={{ display: { md: "none" }, position: "absolute", left: -10, top: "45%", transform: "translateY(-50%)", zIndex: 5, width: 38, height: 38, background: "#fff", border: "1.5px solid rgba(199,211,0,0.4)", boxShadow: "0 4px 14px rgba(0,0,0,0.1)", color: "#9aa000", borderRadius: "50%" }}>
              <ArrowBackIosNewIcon sx={{ fontSize: 13 }} />
            </IconButton>
          )}
          {canRight && (
            <IconButton onClick={() => scroll(1)}
              sx={{ display: { md: "none" }, position: "absolute", right: -10, top: "45%", transform: "translateY(-50%)", zIndex: 5, width: 38, height: 38, background: "#fff", border: "1.5px solid rgba(199,211,0,0.4)", boxShadow: "0 4px 14px rgba(0,0,0,0.1)", color: "#9aa000", borderRadius: "50%" }}>
              <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
            </IconButton>
          )}
        </Box>

        {/* Scroll hint dots */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.8, mt: 3 }}>
          {Array.from({ length: Math.min(allPackages.length, 6) }).map((_, i) => (
            <Box key={i} sx={{ width: i === 0 ? 20 : 7, height: 7, borderRadius: "4px", background: i === 0 ? "#c7d300" : "rgba(199,211,0,0.25)", transition: "all 0.3s" }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
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

// ── All packages flattened for the overview carousel ─────────
const allPackages = holidayCategories.flatMap((cat) =>
  cat.packages.map((pkg) => ({ ...pkg, categoryLabel: cat.label, categoryColor: cat.color }))
);

// ── Single Package Card ──────────────────────────────────────
function PackageCard({ pkg, onSelect }) {
  return (
    <Box
      onClick={() => onSelect(pkg)}
      sx={{
        flexShrink: 0,
        width: { xs: 270, sm: 300, md: 320 },
        borderRadius: "22px",
        overflow: "hidden",
        background: "#fff",
        border: "1.5px solid rgba(199,211,0,0.18)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "all 0.32s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 24px 56px rgba(199,211,0,0.2)",
          borderColor: "#c7d300",
        },
        "&:hover img": { transform: "scale(1.06)" },
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative", height: 195, overflow: "hidden" }}>
        <img
          src={pkg.image}
          alt={pkg.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.45s ease", display: "block" }}
        />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 55%)" }} />

        {/* Category tag */}
        <Box sx={{ position: "absolute", top: 12, left: 12, px: 1.3, py: 0.4, borderRadius: "8px", background: `${pkg.categoryColor}dd`, backdropFilter: "blur(4px)" }}>
          <Typography sx={{ color: "#1a1a2e", fontSize: "0.68rem", fontWeight: 800 }}>{pkg.categoryLabel}</Typography>
        </Box>

        {/* Price */}
        <Box sx={{ position: "absolute", top: 12, right: 12, px: 1.3, py: 0.4, borderRadius: "8px", background: "rgba(13,17,23,0.78)", border: "1px solid rgba(199,211,0,0.35)" }}>
          <Typography sx={{ color: "#c7d300", fontSize: "0.8rem", fontWeight: 800 }}>{pkg.price}</Typography>
        </Box>

        {/* Duration */}
        <Box sx={{ position: "absolute", bottom: 12, left: 12, display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box sx={{ px: 1.2, py: 0.4, borderRadius: "8px", background: "rgba(199,211,0,0.92)" }}>
            <Typography sx={{ color: "#1a1a2e", fontSize: "0.7rem", fontWeight: 800 }}>{pkg.duration}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.5 }}>
        <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a2e", mb: 0.3 }}>{pkg.title}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <FlightTakeoffIcon sx={{ fontSize: 13, color: "#999" }} />
          <Typography sx={{ color: "#999", fontSize: "0.78rem" }}>{pkg.destination}</Typography>
        </Box>

        {/* Highlights */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 2 }}>
          {pkg.highlights.slice(0, 3).map((h, i) => (
            <Box key={i} sx={{ px: 1, py: 0.3, borderRadius: "6px", background: "rgba(199,211,0,0.1)", border: "1px solid rgba(199,211,0,0.22)" }}>
              <Typography sx={{ fontSize: "0.67rem", color: "#7a8400", fontWeight: 600 }}>{h}</Typography>
            </Box>
          ))}
          {pkg.highlights.length > 3 && (
            <Box sx={{ px: 1, py: 0.3, borderRadius: "6px", background: "rgba(0,0,0,0.04)" }}>
              <Typography sx={{ fontSize: "0.67rem", color: "#aaa" }}>+{pkg.highlights.length - 3} more</Typography>
            </Box>
          )}
        </Box>

        <Button fullWidth variant="contained" endIcon={<ArrowForwardIosIcon sx={{ fontSize: "12px !important" }} />}
          sx={{ background: "linear-gradient(135deg,#c7d300,#9aa000)", color: "#1a1a2e", borderRadius: "11px", py: 1, fontWeight: 700, fontSize: "0.82rem", textTransform: "none", boxShadow: "none", "&:hover": { background: "#dce84a", boxShadow: "none" } }}>
          View Details
        </Button>
      </Box>
    </Box>
  );
}

// ── Carousel ─────────────────────────────────────────────────
function Carousel({ packages, onSelect }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const check = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {canLeft && (
        <IconButton onClick={() => scroll(-1)}
          sx={{ position: "absolute", left: { xs: -8, md: -20 }, top: "50%", transform: "translateY(-70%)", zIndex: 5, width: 42, height: 42, background: "#fff", border: "1.5px solid rgba(199,211,0,0.4)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", color: "#9aa000", "&:hover": { background: "#c7d300", color: "#1a1a2e" }, transition: "all 0.2s" }}>
          <ArrowBackIosNewIcon sx={{ fontSize: 15 }} />
        </IconButton>
      )}

      <Box ref={trackRef} onScroll={check}
        sx={{ display: "flex", gap: 2.5, overflowX: "auto", pb: 2, px: 0.5, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} onSelect={onSelect} />
        ))}
      </Box>

      {canRight && (
        <IconButton onClick={() => scroll(1)}
          sx={{ position: "absolute", right: { xs: -8, md: -20 }, top: "50%", transform: "translateY(-70%)", zIndex: 5, width: 42, height: 42, background: "#fff", border: "1.5px solid rgba(199,211,0,0.4)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", color: "#9aa000", "&:hover": { background: "#c7d300", color: "#1a1a2e" }, transition: "all 0.2s" }}>
          <ArrowForwardIosIcon sx={{ fontSize: 15 }} />
        </IconButton>
      )}
    </Box>
  );
}

// ── Detail Inner Page ────────────────────────────────────────
function DetailPage({ pkg, onBack }) {
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    gsap.fromTo(ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
  }, []);

  return (
    <Box ref={ref} sx={{ minHeight: "100vh", background: "#f9fafb", pt: "66px" }}>

      {/* Hero */}
      <Box sx={{ position: "relative", height: { xs: 260, md: 420 }, overflow: "hidden" }}>
        <img src={pkg.image} alt={pkg.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.2) 60%,transparent 100%)" }} />

        {/* Back button */}
        <Button onClick={onBack} startIcon={<ArrowBackIcon />}
          sx={{ position: "absolute", top: 20, left: 20, background: "rgba(255,255,255,0.95)", color: "#1a1a2e", borderRadius: "12px", fontWeight: 700, textTransform: "none", fontSize: "0.85rem", px: 2, py: 0.8, "&:hover": { background: "#fff", transform: "translateX(-2px)" }, transition: "all 0.2s" }}>
          Back
        </Button>

        {/* Category badge */}
        <Box sx={{ position: "absolute", top: 20, right: 20, px: 1.5, py: 0.5, borderRadius: "10px", background: `${pkg.categoryColor || "#c7d300"}dd` }}>
          <Typography sx={{ color: "#1a1a2e", fontSize: "0.72rem", fontWeight: 800 }}>{pkg.categoryLabel}</Typography>
        </Box>

        {/* Bottom overlay content */}
        <Box sx={{ position: "absolute", bottom: 24, left: { xs: 20, md: 48 }, right: { xs: 20, md: 48 }, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.4rem" }, lineHeight: 1.1, mb: 0.5 }}>{pkg.title}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FlightTakeoffIcon sx={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }} />
                <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem" }}>{pkg.destination}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }} />
                <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem" }}>{pkg.duration}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
            <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem" }}>Starting from</Typography>
            <Typography sx={{ color: "#c7d300", fontWeight: 900, fontSize: { xs: "1.6rem", md: "2rem" }, lineHeight: 1 }}>{pkg.price}</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>per person</Typography>
          </Box>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ maxWidth: 1000, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "flex-start" }}>

          {/* Left — itinerary */}
          <Box sx={{ flex: "1 1 60%" }}>

            {/* Highlights */}
            <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, mb: 3, border: "1.5px solid rgba(199,211,0,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <Typography sx={{ fontWeight: 800, color: "#1a1a2e", fontSize: "1rem", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 4, height: 18, borderRadius: 1, background: "#c7d300" }} /> Trip Highlights
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {pkg.highlights.map((h, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.8, px: 1.5, py: 0.7, borderRadius: "10px", background: "rgba(199,211,0,0.1)", border: "1px solid rgba(199,211,0,0.25)" }}>
                    <CheckCircleIcon sx={{ fontSize: 14, color: "#c7d300" }} />
                    <Typography sx={{ fontSize: "0.8rem", color: "#555", fontWeight: 600 }}>{h}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Itinerary */}
            <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, mb: 3, border: "1.5px solid rgba(199,211,0,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <Typography sx={{ fontWeight: 800, color: "#1a1a2e", fontSize: "1rem", mb: 2.5, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 4, height: 18, borderRadius: 1, background: "#c7d300" }} /> Day-by-Day Itinerary
              </Typography>

              {pkg.itinerary.map((day, i) => (
                <Box key={i} sx={{ display: "flex", gap: 2.5, mb: i < pkg.itinerary.length - 1 ? 0 : 0, position: "relative" }}>
                  {/* Timeline line */}
                  {i < pkg.itinerary.length - 1 && (
                    <Box sx={{ position: "absolute", left: 19, top: 44, bottom: -8, width: 2, background: "linear-gradient(180deg,rgba(199,211,0,0.4),rgba(199,211,0,0.05))", zIndex: 0 }} />
                  )}
                  {/* Day circle */}
                  <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#c7d300,#9aa000)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, boxShadow: "0 4px 12px rgba(199,211,0,0.35)" }}>
                    <Typography sx={{ color: "#1a1a2e", fontWeight: 900, fontSize: "0.72rem" }}>D{day.day}</Typography>
                  </Box>
                  <Box sx={{ pb: 3, flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, color: "#1a1a2e", fontSize: "0.95rem", mb: 0.3 }}>{day.title}</Typography>
                    <Typography sx={{ color: "#777", fontSize: "0.85rem", lineHeight: 1.7 }}>{day.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right — sticky booking card */}
          <Box sx={{ flex: "0 0 300px", position: { md: "sticky" }, top: 90 }}>
            <Box sx={{ background: "#fff", borderRadius: "22px", p: 3, border: "1.5px solid rgba(199,211,0,0.25)", boxShadow: "0 8px 40px rgba(0,0,0,0.1)", mb: 3 }}>
              <Typography sx={{ fontWeight: 800, color: "#1a1a2e", fontSize: "1rem", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 4, height: 18, borderRadius: 1, background: "#c7d300" }} /> Package Includes
              </Typography>
              {pkg.includes.map((inc, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.2 }}>
                  <CheckCircleIcon sx={{ color: "#c7d300", fontSize: 16, flexShrink: 0 }} />
                  <Typography sx={{ color: "#555", fontSize: "0.85rem" }}>{inc}</Typography>
                </Box>
              ))}

              <Box sx={{ mt: 3, pt: 2.5, borderTop: "1px solid rgba(199,211,0,0.2)" }}>
                <Typography sx={{ color: "#999", fontSize: "0.78rem", mb: 0.5 }}>Starting from</Typography>
                <Typography sx={{ color: "#1a1a2e", fontWeight: 900, fontSize: "2rem", lineHeight: 1, mb: 0.3 }}>{pkg.price}</Typography>
                <Typography sx={{ color: "#aaa", fontSize: "0.75rem", mb: 2.5 }}>per person • {pkg.duration}</Typography>

                <Button fullWidth variant="contained" startIcon={<WhatsAppIcon />}
                  component="a" href="https://wa.me/917736062244" target="_blank"
                  sx={{ background: "#25D366", color: "#fff", borderRadius: "14px", py: 1.4, fontWeight: 700, fontSize: "0.92rem", textTransform: "none", mb: 1.5, "&:hover": { background: "#20ba5a" }, boxShadow: "0 6px 20px rgba(37,211,102,0.3)" }}>
                  Book via WhatsApp
                </Button>

                <Button fullWidth variant="outlined"
                  onClick={onBack}
                  sx={{ borderColor: "rgba(199,211,0,0.4)", color: "#9aa000", borderRadius: "14px", py: 1.2, fontWeight: 600, textTransform: "none", "&:hover": { background: "rgba(199,211,0,0.06)", borderColor: "#c7d300" } }}>
                  ← Browse More Packages
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
  const heroRef    = useRef(null);
  const [detailPkg, setDetailPkg] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        yPercent: 20, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".hol-hero-el",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.14, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".hol-hero-el", start: "top 85%" } }
      );
      gsap.fromTo(".hol-filter-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".hol-filters", start: "top 88%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", ...holidayCategories.map((c) => c.label)];

  const filtered = activeFilter === "All"
    ? allPackages
    : allPackages.filter((p) => p.categoryLabel === activeFilter);

  // Show detail page
  if (detailPkg) {
    return <DetailPage pkg={detailPkg} onBack={() => { setDetailPkg(null); setTimeout(() => { const el = document.getElementById("holidays"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 100); }} />;
  }

  return (
    <Box ref={sectionRef} sx={{ background: "#f9fafb", overflow: "hidden" }}>

      {/* ── LIGHT HERO ── */}
      <Box sx={{ background: "linear-gradient(160deg,#f8f9f2 0%,#ffffff 55%,#f2f5e8 100%)", position: "relative", pb: { xs: 5, md: 7 }, overflow: "hidden" }}>
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(199,211,0,0.18) 1px,transparent 1px)", backgroundSize: "30px 30px", zIndex: 0, pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", top: -80, right: -80, width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle,rgba(199,211,0,0.14) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

        <Box ref={heroRef} sx={{ position: "relative", zIndex: 1, textAlign: "center", pt: { xs: 6, md: 8 }, pb: { xs: 3, md: 4 }, px: 2 }}>
          <Box className="hol-hero-el" sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, px: 2.5, py: 0.8, borderRadius: "30px", background: "rgba(199,211,0,0.15)", border: "1px solid rgba(199,211,0,0.35)", mb: 2.5 }}>
            <FlightTakeoffIcon sx={{ color: "#9aa000", fontSize: 17 }} />
            <Typography sx={{ color: "#7a8400", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Holiday Packages</Typography>
          </Box>

          <Typography className="hol-hero-el" sx={{ fontSize: { xs: "2.2rem", md: "3.8rem" }, fontWeight: 900, lineHeight: 1.1, color: "#1a1a2e", mb: 1.5 }}>
            Find Your Perfect
            <Box component="span" sx={{ display: "block", background: "linear-gradient(135deg,#9aa000,#c7d300)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Holiday
            </Box>
          </Typography>

          <Typography className="hol-hero-el" sx={{ color: "#777", fontSize: "0.97rem", maxWidth: 480, mx: "auto", lineHeight: 1.8 }}>
            Handcrafted packages for every traveller — beaches, honeymoons, adventures, luxury, groups and more.
          </Typography>
        </Box>
      </Box>

      {/* ── FILTER TABS ── */}
      <Box className="hol-filters" sx={{ px: { xs: 2, md: 4 }, py: 3, maxWidth: 1300, mx: "auto" }}>
        <Box sx={{ display: "flex", gap: 1.2, overflowX: "auto", pb: 1, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
          {filters.map((f) => (
            <Box key={f} className="hol-filter-btn" onClick={() => setActiveFilter(f)}
              sx={{
                flexShrink: 0, px: 2.2, py: 0.9, borderRadius: "12px",
                cursor: "pointer", transition: "all 0.22s ease",
                background: activeFilter === f ? "linear-gradient(135deg,#c7d300,#9aa000)" : "#fff",
                border: activeFilter === f ? "1.5px solid #c7d300" : "1.5px solid rgba(199,211,0,0.2)",
                boxShadow: activeFilter === f ? "0 4px 16px rgba(199,211,0,0.3)" : "0 2px 8px rgba(0,0,0,0.05)",
                "&:hover": { borderColor: "#c7d300", transform: "translateY(-2px)" },
              }}>
              <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: activeFilter === f ? "#1a1a2e" : "#555", whiteSpace: "nowrap" }}>
                {f}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── CAROUSEL ── */}
      <Box sx={{ maxWidth: 1300, mx: "auto", px: { xs: 2, md: 4 }, pb: { xs: 6, md: 8 } }}>
        <Carousel packages={filtered} onSelect={setDetailPkg} />

        {/* Count */}
        <Typography sx={{ color: "#bbb", fontSize: "0.8rem", mt: 2, textAlign: "center" }}>
          Showing {filtered.length} package{filtered.length !== 1 ? "s" : ""}
          {activeFilter !== "All" ? ` in ${activeFilter}` : ""}
        </Typography>
      </Box>
    </Box>
  );
}
import { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VerifiedIcon from "@mui/icons-material/Verified";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Testimonial Data ──────────────────────────────────────────
const testimonials = [
  {
    name: "Arjun Menon",
    location: "Kochi, Kerala",
    destination: "Dubai",
    rating: 5,
    text: "Loufi Holidays made our Dubai trip absolutely magical. From visa processing to hotel bookings — everything was seamless. Our family of five had zero stress. Highly recommend!",
    avatar: "AM",
    color: "#c7d300",
    tag: "Family Tour",
  },
  {
    name: "Priya Nair",
    location: "Thrissur, Kerala",
    destination: "Maldives",
    rating: 5,
    text: "Our honeymoon in Maldives was a dream come true, all thanks to Loufi. The overwater villa they arranged was stunning. Every detail was taken care of perfectly. We'll definitely book with them again.",
    avatar: "PN",
    color: "#25D366",
    tag: "Honeymoon",
  },
  {
    name: "Rahul Sharma",
    location: "Bangalore, Karnataka",
    destination: "Thailand",
    rating: 5,
    text: "Got my Thailand visa approved in just 3 days! The team was incredibly responsive and guided me through every step of the process. Exceptional service at a great price.",
    avatar: "RS",
    color: "#c7d300",
    tag: "Visa Service",
  },
  {
    name: "Fatima Al-Rashid",
    location: "Calicut, Kerala",
    destination: "Europe",
    rating: 5,
    text: "Booked a 10-day Europe package for our group of 12. The itinerary was perfectly planned — Switzerland, Paris, Amsterdam. Loufi handled everything including Schengen visa for all of us!",
    avatar: "FA",
    color: "#ff6b6b",
    tag: "Group Tour",
  },
  {
    name: "Suresh Kumar",
    location: "Ernakulam, Kerala",
    destination: "Singapore",
    rating: 5,
    text: "Amazing experience! The Singapore trip was well organized and budget-friendly. The Loufi team was available 24/7 during our trip which gave us so much confidence. Will book again!",
    avatar: "SK",
    color: "#c7d300",
    tag: "Holiday Package",
  },
  {
    name: "Anjali Thomas",
    location: "Trivandrum, Kerala",
    destination: "Bali",
    rating: 5,
    text: "Bali was on my bucket list for years and Loufi made it happen within my budget. The resort they chose was breathtaking. Professional, punctual, and truly passionate about travel.",
    avatar: "AT",
    color: "#25D366",
    tag: "Solo Travel",
  },
];

const stats = [
  { value: "10K+", label: "Happy Travellers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "150+", label: "Destinations" },
  { value: "5★", label: "Average Rating" },
];

function StarRating({ count = 5 }) {
  return (
    <Box sx={{ display: "flex", gap: 0.3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} sx={{ fontSize: 16, color: "#c7d300" }} />
      ))}
    </Box>
  );
}

export default function Testimonials() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const sliderRef = useRef(null);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(heroRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      // Entrance animations
      gsap.fromTo(".t-badge, .t-h1, .t-sub",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(".stat-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".stats-row", start: "top 85%" } }
      );
      gsap.fromTo(".featured-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".featured-card", start: "top 80%" } }
      );
      gsap.fromTo(".grid-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".grid-section", start: "top 80%" } }
      );
      gsap.fromTo(".cta-section",
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".cta-section", start: "top 85%" } }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    gsap.to(sliderRef.current, {
      opacity: 0, x: idx > active ? -30 : 30, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(sliderRef.current,
          { opacity: 0, x: idx > active ? 30 : -30 },
          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", onComplete: () => setAnimating(false) }
        );
      },
    });
  };

  const prev = () => goTo(active === 0 ? testimonials.length - 1 : active - 1);
  const next = () => goTo(active === testimonials.length - 1 ? 0 : active + 1);

  const t = testimonials[active];

  return (
    <Box ref={pageRef} sx={{ minHeight: "100vh", pt: "66px", position: "relative", overflow: "hidden" }}>

      {/* ════════════ LIGHT HERO SECTION ════════════ */}
      <Box sx={{ background: "linear-gradient(160deg, #f8f9f2 0%, #ffffff 50%, #f2f5e8 100%)", position: "relative", overflow: "hidden", pb: { xs: 8, md: 10 } }}>

        {/* Dot grid */}
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, rgba(199,211,0,0.2) 1px, transparent 1px)`, backgroundSize: "32px 32px", zIndex: 0, pointerEvents: "none" }} />
        {/* Blobs */}
        <Box sx={{ position: "absolute", top: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,211,0,0.15) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: 0, left: -120, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,211,0,0.1) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

        {/* Hero Text */}
        <Box ref={heroRef} sx={{ position: "relative", zIndex: 1, textAlign: "center", pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 }, px: 2 }}>
          <Box className="t-badge" sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, px: 2.5, py: 0.8, borderRadius: "30px", background: "rgba(199,211,0,0.15)", border: "1px solid rgba(199,211,0,0.35)", mb: 3 }}>
            <StarIcon sx={{ color: "#9aa000", fontSize: 16 }} />
            <Typography sx={{ color: "#7a8400", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Real Stories, Real Journeys
            </Typography>
          </Box>

          <Typography className="t-h1" sx={{ fontSize: { xs: "2.5rem", md: "4.2rem" }, fontWeight: 900, lineHeight: 1.1, color: "#1a1a2e", mb: 2 }}>
            Travellers Who{" "}
            <Box component="span" sx={{ background: "linear-gradient(135deg, #9aa000, #c7d300)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Loved It
            </Box>
          </Typography>

          <Typography className="t-sub" sx={{ color: "#666", fontSize: "1rem", maxWidth: 520, mx: "auto", lineHeight: 1.8, mb: 2 }}>
            Don't just take our word for it — here's what our travellers say about their experiences with Loufi Holidays & Global Visa.
          </Typography>

          <Box sx={{ mt: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <Box sx={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #c7d300)" }} />
            <FlightTakeoffIcon sx={{ color: "#c7d300", fontSize: 20 }} />
            <Box sx={{ width: 60, height: 2, background: "linear-gradient(90deg, #c7d300, transparent)" }} />
          </Box>
        </Box>

        {/* Stats Row */}
        <Box className="stats-row" sx={{ position: "relative", zIndex: 1, maxWidth: 900, mx: "auto", px: { xs: 2, md: 4 }, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: { xs: 2, md: 4 } }}>
          {stats.map((s, i) => (
            <Box key={i} className="stat-item"
              sx={{
                textAlign: "center", px: { xs: 3, md: 5 }, py: 3,
                background: "#fff",
                border: "1.5px solid rgba(199,211,0,0.25)",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                minWidth: 140,
                transition: "all 0.3s ease",
                "&:hover": { borderColor: "#c7d300", transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(199,211,0,0.18)" },
              }}>
              <Typography sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" }, fontWeight: 900, background: "linear-gradient(135deg, #9aa000, #c7d300)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1 }}>
                {s.value}
              </Typography>
              <Typography sx={{ color: "#888", fontSize: "0.82rem", fontWeight: 500, mt: 0.5 }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ════════════ DARK SECTION — Featured Slider + Grid ════════════ */}
      <Box sx={{ background: "linear-gradient(165deg, #0d1117 0%, #111827 50%, #0d1117 100%)", position: "relative", overflow: "hidden", pt: { xs: 0, md: 0 }, pb: { xs: 8, md: 10 } }}>

        {/* Wave divider */}
        <Box sx={{ position: "absolute", top: -2, left: 0, right: 0, zIndex: 1, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }}>
            <path d="M0,0 C360,60 1080,0 1440,50 L1440,0 L0,0 Z" fill="#f2f5e8" />
          </svg>
        </Box>

        {/* Dark dot grid */}
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, rgba(199,211,0,0.06) 1px, transparent 1px)`, backgroundSize: "28px 28px", zIndex: 0, pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,211,0,0.07) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

        <Box sx={{ position: "relative", zIndex: 2, maxWidth: 1300, mx: "auto", px: { xs: 2, md: 4 }, pt: { xs: 6, md: 10 } }}>

          {/* ── FEATURED SLIDER ── */}
          <Box className="featured-card"
            sx={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(199,211,0,0.2)",
              borderRadius: "28px",
              p: { xs: 3, md: 6 },
              mb: 8,
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              position: "relative",
              overflow: "hidden",
            }}>
            {/* Big quote decoration */}
            <FormatQuoteIcon sx={{ position: "absolute", top: 20, right: 30, fontSize: 120, color: "rgba(199,211,0,0.06)", transform: "rotate(180deg)" }} />

            <Box ref={sliderRef} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 4, md: 6 }, alignItems: "center" }}>

              {/* Avatar side */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <Box sx={{
                  width: 100, height: 100, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2rem", fontWeight: 900, color: "#1a1a2e",
                  boxShadow: `0 8px 30px ${t.color}44`,
                  mb: 2,
                  border: `3px solid ${t.color}`,
                }}>
                  {t.avatar}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                  <VerifiedIcon sx={{ fontSize: 16, color: "#c7d300" }} />
                  <Typography sx={{ color: "#c7d300", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em" }}>VERIFIED</Typography>
                </Box>
                <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", textAlign: "center" }}>{t.name}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", textAlign: "center" }}>{t.location}</Typography>
                <Box sx={{ mt: 1.5, px: 1.5, py: 0.5, borderRadius: "8px", background: "rgba(199,211,0,0.1)", border: "1px solid rgba(199,211,0,0.2)" }}>
                  <Typography sx={{ color: "#c7d300", fontSize: "0.72rem", fontWeight: 700 }}>✈ {t.destination}</Typography>
                </Box>
              </Box>

              {/* Quote side */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
                  <StarRating count={t.rating} />
                  <Box sx={{ px: 1.5, py: 0.4, borderRadius: "8px", background: "rgba(199,211,0,0.1)", border: "1px solid rgba(199,211,0,0.2)" }}>
                    <Typography sx={{ color: "#c7d300", fontSize: "0.72rem", fontWeight: 700 }}>{t.tag}</Typography>
                  </Box>
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: { xs: "1rem", md: "1.2rem" }, lineHeight: 1.8, fontStyle: "italic", mb: 3 }}>
                  "{t.text}"
                </Typography>
                <Box sx={{ height: 2, width: 60, background: "linear-gradient(90deg, #c7d300, transparent)", borderRadius: 1 }} />
              </Box>
            </Box>

            {/* Slider controls */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 4, pt: 3, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {/* Dots */}
              <Box sx={{ display: "flex", gap: 1 }}>
                {testimonials.map((_, i) => (
                  <Box key={i} onClick={() => goTo(i)}
                    sx={{ width: i === active ? 24 : 8, height: 8, borderRadius: "4px", background: i === active ? "#c7d300" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.3s ease" }} />
                ))}
              </Box>

              {/* Arrow buttons */}
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <IconButton onClick={prev}
                  sx={{ width: 44, height: 44, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", borderRadius: "12px", "&:hover": { background: "rgba(199,211,0,0.12)", borderColor: "#c7d300", color: "#c7d300" }, transition: "all 0.25s ease" }}>
                  <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <IconButton onClick={next}
                  sx={{ width: 44, height: 44, background: "rgba(199,211,0,0.12)", border: "1px solid rgba(199,211,0,0.25)", color: "#c7d300", borderRadius: "12px", "&:hover": { background: "#c7d300", color: "#1a1a2e" }, transition: "all 0.25s ease" }}>
                  <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* ── GRID CARDS ── */}
          <Box className="grid-section" sx={{ mb: 8 }}>
            <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.5rem", md: "2rem" }, mb: 1, textAlign: "center" }}>
              More Happy{" "}
              <Box component="span" sx={{ background: "linear-gradient(135deg, #c7d300, #f5ff8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Travellers
              </Box>
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem", textAlign: "center", mb: 5 }}>
              Thousands of satisfied customers across the globe
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, justifyContent: "center" }}>
              {testimonials.map((item, i) => (
                <Box key={i} className="grid-card"
                  onClick={() => { goTo(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 10px)", md: "1 1 calc(33% - 14px)" },
                    maxWidth: { sm: "calc(50% - 10px)", md: "calc(33% - 14px)" },
                    background: i === active
                      ? "linear-gradient(145deg, rgba(199,211,0,0.12), rgba(199,211,0,0.05))"
                      : "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    border: i === active ? "1px solid rgba(199,211,0,0.35)" : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "20px",
                    p: 3,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": { borderColor: "rgba(199,211,0,0.3)", transform: "translateY(-4px)", boxShadow: "0 16px 40px rgba(0,0,0,0.3)" },
                  }}>
                  {/* Header */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box sx={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 800, color: "#1a1a2e", flexShrink: 0 }}>
                      {item.avatar}
                    </Box>
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{item.name}</Typography>
                        <VerifiedIcon sx={{ fontSize: 14, color: "#c7d300" }} />
                      </Box>
                      <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>{item.location}</Typography>
                    </Box>
                    <Box sx={{ ml: "auto", px: 1.2, py: 0.4, borderRadius: "8px", background: "rgba(199,211,0,0.08)", border: "1px solid rgba(199,211,0,0.15)", flexShrink: 0 }}>
                      <Typography sx={{ color: "#c7d300", fontSize: "0.68rem", fontWeight: 700 }}>✈ {item.destination}</Typography>
                    </Box>
                  </Box>

                  <StarRating count={item.rating} />

                  <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.7, mt: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    "{item.text}"
                  </Typography>

                  <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ px: 1.2, py: 0.4, borderRadius: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem" }}>{item.tag}</Typography>
                    </Box>
                    <FormatQuoteIcon sx={{ fontSize: 20, color: "rgba(199,211,0,0.2)" }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── CTA STRIP ── */}
          <Box className="cta-section"
            sx={{
              background: "linear-gradient(135deg, rgba(199,211,0,0.12), rgba(199,211,0,0.04))",
              border: "1px solid rgba(199,211,0,0.2)",
              borderRadius: "28px",
              p: { xs: 4, md: 6 },
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(8px)",
            }}>
            <Box sx={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,211,0,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <FlightTakeoffIcon sx={{ color: "#c7d300", fontSize: 36, mb: 2 }} />
              <Typography sx={{ fontSize: { xs: "1.6rem", md: "2.2rem" }, fontWeight: 900, color: "#fff", mb: 1.5 }}>
                Ready to Create Your{" "}
                <Box component="span" sx={{ background: "linear-gradient(135deg, #c7d300, #f5ff8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Own Story?
                </Box>
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", maxWidth: 500, mx: "auto", mb: 4 }}>
                Join thousands of happy travellers who trusted Loufi Holidays for their dream vacations and hassle-free visa services.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Box component="a" href="/contact"
                  sx={{ px: 4, py: 1.6, borderRadius: "14px", background: "linear-gradient(135deg, #c7d300, #9aa000)", color: "#1a1a2e", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 8px 24px rgba(199,211,0,0.3)", transition: "all 0.3s ease", display: "inline-block", "&:hover": { transform: "translateY(-2px)", boxShadow: "0 12px 32px rgba(199,211,0,0.4)" } }}>
                  Plan My Trip →
                </Box>
                <Box component="a" href="https://wa.me/917736062244" target="_blank" rel="noopener noreferrer"
                  sx={{ px: 4, py: 1.6, borderRadius: "14px", background: "transparent", border: "1px solid rgba(199,211,0,0.35)", color: "#c7d300", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", transition: "all 0.3s ease", display: "inline-block", "&:hover": { background: "rgba(199,211,0,0.08)", transform: "translateY(-2px)" } }}>
                  WhatsApp Us
                </Box>
              </Box>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}
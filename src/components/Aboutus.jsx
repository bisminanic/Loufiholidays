import { useEffect, useRef } from "react";
import { Box, Typography, } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import HandshakeIcon from "@mui/icons-material/Handshake";
import StarIcon from "@mui/icons-material/Star";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Trip destination images (Unsplash free) ──────────────────
const tripImages = [
  {
    url: "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779527166/ChatGPT_Image_May_23_2026_02_34_58_PM_1_mlkqia.png",
    label: "Dubai",
  },
  {
    url: "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779528626/balitrip_m5ymco.png",
    label: "Bali",
  },
  {
    url: "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779528798/thailand_udsuwd.png",
    label: "Thailand",
  },
  {
    url: "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779528947/maldivestrip_hxfotv.png",
    label: "Maldives",
  },
  {
    url: "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779529074/paristrip_mssctk.png",
    label: "Paris",
  },
  {
    url: "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779528204/SwitzerlandTrip_qi886b.png",
    label: "Switzerland",
  },
   {
    url: "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779530584/japan_ruswbp.png",
    label: "Japan",
  },
  {
    url: "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779530426/newyorktrip_bfejrr.png",
    label: "Newyork",
  },
  {
    url: "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779530506/greece_mgvxhp.png",
    label: "Greece",
  },
 
];

const stats = [
  {
    icon: <GroupsIcon sx={{ fontSize: 28 }} />,
    value: "10,000+",
    label: "Happy Travellers",
  },
  {
    icon: <PublicIcon sx={{ fontSize: 28 }} />,
    value: "150+",
    label: "Destinations",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 28 }} />,
    value: "98%",
    label: "Visa Approval Rate",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 28 }} />,
    value: "8+",
    label: "Years of Excellence",
  },
];

const values = [
  {
    icon: <HandshakeIcon sx={{ fontSize: 28 }} />,
    title: "Trust & Transparency",
    desc: "We believe in honest pricing and clear communication at every step of your journey. No hidden fees, no surprises.",
  },
  {
    icon: <StarIcon sx={{ fontSize: 28 }} />,
    title: "Excellence in Service",
    desc: "From your first inquiry to your safe return, we deliver a premium, personalised experience that exceeds expectations.",
  },
  {
    icon: <PublicIcon sx={{ fontSize: 28 }} />,
    title: "Global Expertise",
    desc: "With deep knowledge of 150+ destinations and visa regulations worldwide, we make international travel effortless.",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 28 }} />,
    title: "Customer First",
    desc: "Every itinerary is crafted around your needs. Whether it's a family vacation or a solo adventure, we put you first.",
  },
];

const team = [
  {
    name: "Nowfal Nazeer",
    role: "Founder & CEO",
    initials: "NN",
    color: "#c7d300",
  },
  {
    name: "Kripa K V",
    role: "Global Visa Manager",
    initials: "KK",
    color: "#25D366",
  },
  {
    name: "Abhijith Dhanan",
    role: "Tour Operation Manager",
    initials: "AD",
    color: "#c7d300",
  },
  {
    name: "Bismina A S",
    role: "Business Developement Manager",
    initials: "BA",
    color: "#ff9a00",
  },
];

const milestones = [
  {
    year: "2016",
    title: "Founded in Kochi",
    desc: "Loufi Holidays started as a small travel consultancy in Thevara, Ernakulam.",
  },
  {
    year: "2018",
    title: "Visa Services Launch",
    desc: "Expanded to full-scale global visa processing — tourist, business, student, and work permits.",
  },
  {
    year: "2020",
    title: "10,000+ Travellers",
    desc: "Crossed a milestone of serving over 10,000 happy travellers despite global challenges.",
  },
  {
    year: "2022",
    title: "150+ Destinations",
    desc: "Expanded our holiday portfolio to cover 150+ international destinations across 6 continents.",
  },
  {
    year: "2024",
    title: "Award-Winning Service",
    desc: "Recognised as one of Kerala's most trusted travel agencies with a 98% visa approval rate.",
  },
];

export default function AboutUs() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(heroRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Entrance animations
      gsap.fromTo(
        ".ab-badge, .ab-h1, .ab-sub",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.2,
        },
      );
      gsap.fromTo(
        ".stat-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".stats-row", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".story-text",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".story-section", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".story-img",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".story-section", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".trip-img",
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: ".trips-grid", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".value-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".values-grid", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".timeline-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: ".timeline-section", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".team-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".team-section", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".cta-about",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".cta-about", start: "top 85%" },
        },
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={pageRef}
      sx={{ minHeight: "100vh", pt: "66px", overflow: "hidden" }}
    >
      {/* ════════ LIGHT HERO ════════ */}
      <Box
        sx={{
          background:
            "linear-gradient(160deg,#f8f9f2 0%,#ffffff 50%,#f2f5e8 100%)",
          position: "relative",
          pb: { xs: 8, md: 10 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle,rgba(199,211,0,0.2) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(199,211,0,0.15) 0%,transparent 70%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: -120,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(199,211,0,0.1) 0%,transparent 70%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <Box
          ref={heroRef}
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            pt: { xs: 6, md: 10 },
            pb: { xs: 4, md: 6 },
            px: 2,
          }}
        >
          <Box
            className="ab-badge"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              px: 2.5,
              py: 0.8,
              borderRadius: "30px",
              background: "rgba(199,211,0,0.15)",
              border: "1px solid rgba(199,211,0,0.35)",
              mb: 3,
            }}
          >
            <FlightTakeoffIcon sx={{ color: "#9aa000", fontSize: 18 }} />
            <Typography
              sx={{
                color: "#7a8400",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              About Loufi Holidays
            </Typography>
          </Box>

          <Typography
            className="ab-h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4.2rem" },
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#1a1a2e",
              mb: 2,
            }}
          >
            Your Trusted Partner
            <Box
              component="span"
              sx={{
                display: "block",
                background: "linear-gradient(135deg,#9aa000,#c7d300)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              in Every Journey
            </Box>
          </Typography>

          <Typography
            className="ab-sub"
            sx={{
              color: "#666",
              fontSize: "1rem",
              maxWidth: 580,
              mx: "auto",
              lineHeight: 1.9,
              mb: 3,
            }}
          >
            Loufi Holidays & Global Visa is a premier travel agency based in
            Kochi, Kerala — dedicated to crafting unforgettable holiday
            experiences and delivering seamless global visa solutions since
            2016.
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 2,
                background: "linear-gradient(90deg,transparent,#c7d300)",
              }}
            />
            <FlightTakeoffIcon sx={{ color: "#c7d300", fontSize: 20 }} />
            <Box
              sx={{
                width: 60,
                height: 2,
                background: "linear-gradient(90deg,#c7d300,transparent)",
              }}
            />
          </Box>
        </Box>

        {/* Stats */}
        <Box
          className="stats-row"
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1000,
            mx: "auto",
            px: { xs: 2, md: 4 },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {stats.map((s, i) => (
            <Box
              key={i}
              className="stat-card"
              sx={{
                flex: "1 1 180px",
                maxWidth: 220,
                background: "#fff",
                border: "1.5px solid rgba(199,211,0,0.25)",
                borderRadius: "20px",
                p: 3,
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#c7d300",
                  transform: "translateY(-5px)",
                  boxShadow: "0 14px 36px rgba(199,211,0,0.18)",
                },
              }}
            >
              <Box
                sx={{
                  color: "#c7d300",
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {s.icon}
              </Box>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  background: "linear-gradient(135deg,#9aa000,#c7d300)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                }}
              >
                {s.value}
              </Typography>
              <Typography sx={{ color: "#888", fontSize: "0.82rem", mt: 0.5 }}>
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ════════ DARK — OUR STORY ════════ */}
      <Box
        sx={{
          background:
            "linear-gradient(165deg,#0d1117 0%,#111827 50%,#0d1117 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle,rgba(199,211,0,0.06) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: -2,
            left: 0,
            right: 0,
            zIndex: 1,
            lineHeight: 0,
          }}
        >
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            style={{ width: "100%", height: 60, display: "block" }}
          >
            <path
              d="M0,0 C360,60 1080,0 1440,50 L1440,0 L0,0 Z"
              fill="#f2f5e8"
            />
          </svg>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(199,211,0,0.07) 0%,transparent 70%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1300,
            mx: "auto",
            px: { xs: 2, md: 4 },
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 10 },
          }}
        >
          {/* Story Section */}
          <Box
            className="story-section"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: { xs: 4, lg: 8 },
              alignItems: "center",
              mb: { xs: 8, md: 12 },
            }}
          >
            {/* Text */}
            <Box className="story-text" sx={{ flex: "1 1 50%" }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 0.6,
                  borderRadius: "20px",
                  background: "rgba(199,211,0,0.1)",
                  border: "1px solid rgba(199,211,0,0.2)",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    color: "#c7d300",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Our Story
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.2,
                  mb: 3,
                }}
              >
                Born from a Passion{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg,#c7d300,#f5ff8a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  for Travel
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.95rem",
                  lineHeight: 1.9,
                  mb: 2.5,
                }}
              >
                Founded in 2016 by Nowfal Nazeer in the heart of Thevara,
                Ernakulam, Loufi Holidays & Global Visa was born out of a simple
                belief — that every person deserves to experience the world
                without the stress of complicated planning or visa paperwork.
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.95rem",
                  lineHeight: 1.9,
                  mb: 2.5,
                }}
              >
                What started as a small travel consultancy has grown into one of
                Kerala's most trusted names in international travel, serving
                over 10,000 travellers across 150+ destinations worldwide. Our
                team of passionate travel experts brings deep local knowledge
                and global connections to every booking.
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.95rem",
                  lineHeight: 1.9,
                  mb: 4,
                }}
              >
                From honeymooners heading to the Maldives to families exploring
                Europe, from professionals needing express visa services to
                groups embarking on adventure tours — we craft each experience
                with care, precision, and a personal touch that sets us apart.
              </Typography>
              {[
                "IATA accredited travel agency",
                "Licensed by Kerala Tourism",
                "98% visa approval success rate",
                "Dedicated 24/7 customer support",
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1.2,
                  }}
                >
                  <CheckCircleIcon
                    sx={{ color: "#c7d300", fontSize: 18, flexShrink: 0 }}
                  />
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Image collage */}
            <Box
              className="story-img"
              sx={{
                flex: "1 1 50%",
                position: "relative",
                minHeight: { xs: 300, md: 480 },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box
                    sx={{
                      borderRadius: "18px",
                      overflow: "hidden",
                      height: 220,
                      boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1779529190/Dubai_j79g6b.png"
                      alt="Dubai"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "18px",
                      overflow: "hidden",
                      height: 160,
                      boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1779527820/Bali_wghvww.png"
                      alt="Bali"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 4,
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "18px",
                      overflow: "hidden",
                      height: 160,
                      boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1779527685/MaliAbout_yfifu4.png"
                      alt="Maldives"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "18px",
                      overflow: "hidden",
                      height: 220,
                      boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                      position: "relative",
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1779528019/paris_w9qiee.png"
                      alt="Paris"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Floating badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        background: "rgba(13,17,23,0.88)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(199,211,0,0.3)",
                        borderRadius: "12px",
                        px: 1.5,
                        py: 0.8,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#c7d300",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                        }}
                      >
                        ✈ 150+ Destinations
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ── TRIPS GALLERY ── */}
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  fontWeight: 900,
                  color: "#fff",
                  mb: 1,
                }}
              >
                Places We've{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg,#c7d300,#f5ff8a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Taken You
                </Box>
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem" }}
              >
                A glimpse of the incredible destinations our travellers have
                explored
              </Typography>
            </Box>
            <Box
              className="trips-grid"
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr 1fr",
                  md: "repeat(3,1fr)",
                  lg: "repeat(6,1fr)",
                },
                gap: 2,
              }}
            >
              {tripImages.map((img, i) => (
                <Box
                  key={i}
                  className="trip-img"
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    position: "relative",
                    height: {
                      xs: 160,
                      md: 200,
                      lg: i === 0 || i === 3 ? 240 : 200, // ✅ only row 1 span-2 images taller
                    },
                    gridColumn:
                      i === 0 || i === 3 || i === 6
                        ? { lg: "span 2" }
                        : "span 1",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover img": { transform: "scale(1.08)" },
                    "&:hover .img-label": { opacity: 1 },
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                      display: "block",
                    }}
                  />
                  <Box
                    className="img-label"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 60%)",
                      display: "flex",
                      alignItems: "flex-end",
                      p: 1.5,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        background: "rgba(13,17,23,0.8)",
                        backdropFilter: "blur(6px)",
                        borderRadius: "8px",
                        border: "1px solid rgba(199,211,0,0.3)",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#c7d300",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        ✈ {img.label}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── VALUES ── */}
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  fontWeight: 900,
                  color: "#fff",
                  mb: 1,
                }}
              >
                What We{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg,#c7d300,#f5ff8a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Stand For
                </Box>
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem" }}
              >
                Our core values that drive everything we do
              </Typography>
            </Box>
            <Box
              className="values-grid"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2.5,
              }}
            >
              {values.map((v, i) => (
                <Box
                  key={i}
                  className="value-card"
                  sx={{
                    background:
                      "linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))",
                    border: "1px solid rgba(199,211,0,0.15)",
                    borderRadius: "20px",
                    p: { xs: 3, md: 4 },
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "rgba(199,211,0,0.35)",
                      transform: "translateY(-4px)",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "14px",
                      background: "rgba(199,211,0,0.1)",
                      border: "1px solid rgba(199,211,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c7d300",
                      mb: 2.5,
                    }}
                  >
                    {v.icon}
                  </Box>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      mb: 1.2,
                    }}
                  >
                    {v.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.88rem",
                      lineHeight: 1.8,
                    }}
                  >
                    {v.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── TIMELINE ── */}
          <Box className="timeline-section" sx={{ mb: { xs: 8, md: 12 } }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  fontWeight: 900,
                  color: "#fff",
                  mb: 1,
                }}
              >
                Our{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg,#c7d300,#f5ff8a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Journey
                </Box>
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem" }}
              >
                Milestones that shaped who we are today
              </Typography>
            </Box>

            <Box sx={{ position: "relative", maxWidth: 800, mx: "auto" }}>
              {/* Vertical line */}
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: 20, md: "50%" },
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background:
                    "linear-gradient(180deg,#c7d300,rgba(199,211,0,0.1))",
                  transform: { md: "translateX(-50%)" },
                  zIndex: 0,
                }}
              />

              {milestones.map((m, i) => (
                <Box
                  key={i}
                  className="timeline-item"
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "row",
                      md: i % 2 === 0 ? "row" : "row-reverse",
                    },
                    gap: { xs: 3, md: 4 },
                    mb: 5,
                    position: "relative",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Dot */}
                  <Box
                    sx={{
                      position: { xs: "relative", md: "absolute" },
                      left: { md: "50%" },
                      transform: { md: "translateX(-50%)" },
                      zIndex: 2,
                      flexShrink: 0,
                      mt: { xs: 0, md: 0.5 },
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#c7d300,#9aa000)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 0 6px rgba(199,211,0,0.15)",
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#1a1a2e",
                          fontWeight: 900,
                          fontSize: "0.7rem",
                        }}
                      >
                        {m.year}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Card */}
                  <Box
                    sx={{
                      flex: 1,
                      ml: { xs: 0, md: i % 2 === 0 ? 0 : "auto" },
                      mr: { xs: 0, md: i % 2 === 0 ? "auto" : 0 },
                      maxWidth: { md: "42%" },
                      background:
                        "linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
                      border: "1px solid rgba(199,211,0,0.15)",
                      borderRadius: "16px",
                      p: 3,
                      backdropFilter: "blur(8px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "rgba(199,211,0,0.3)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#c7d300",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        mb: 0.8,
                      }}
                    >
                      {m.year}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "1rem",
                        mb: 0.8,
                      }}
                    >
                      {m.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.85rem",
                        lineHeight: 1.7,
                      }}
                    >
                      {m.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── TEAM ── */}
          <Box className="team-section" sx={{ mb: { xs: 8, md: 12 } }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  fontWeight: 900,
                  color: "#fff",
                  mb: 1,
                }}
              >
                Meet the{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg,#c7d300,#f5ff8a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Team
                </Box>
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem" }}
              >
                The passionate people behind every journey
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
              }}
            >
              {team.map((member, i) => (
                <Box
                  key={i}
                  className="team-card"
                  sx={{
                    flex: "1 1 200px",
                    maxWidth: 240,
                    background:
                      "linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "22px",
                    p: 4,
                    textAlign: "center",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "rgba(199,211,0,0.3)",
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg,${member.color},${member.color}99)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      color: "#1a1a2e",
                      mx: "auto",
                      mb: 2,
                      boxShadow: `0 8px 24px ${member.color}44`,
                      border: `2px solid ${member.color}`,
                    }}
                  >
                    {member.initials}
                  </Box>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      mb: 0.5,
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}
                  >
                    {member.role}
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "center",
                      gap: 0.4,
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon
                        key={s}
                        sx={{ fontSize: 13, color: "#c7d300" }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          
        </Box>
      </Box>
    </Box>
  );
}

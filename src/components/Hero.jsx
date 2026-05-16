import React, { useEffect, useRef } from "react";
import { Box, Typography, Button, Chip, Grid } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import LuggageIcon from "@mui/icons-material/Luggage";
// import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Plane from "../assets/airplane.png";
import bannerVdo from "../assets/bannerVdo.mp4";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: <PublicIcon />, value: "150+", label: "Destinations" },
  { icon: <LuggageIcon />, value: "10K+", label: "Happy Travellers" },
  { icon: <VerifiedIcon />, value: "98%", label: "Visa Approval" },
  // { icon: <HeadsetMicIcon />, value: "24/7", label: "Travel Support" },
];

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".hero-badge",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
      )
        .fromTo(
          ".hero-h1",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.2 },
          "-=0.5",
        )
        .fromTo(
          ".hero-sub",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.7",
        )
        .fromTo(
          ".hero-btns",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.7",
        )
        .fromTo(
          ".hero-stats",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
          "-=0.5",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      sx={{
        minHeight: "calc(100vh - 66px)",
        // maxHeight: "calc(100vh - 66px)",
        position: "relative",
        overflow: "hidden",
        marginTop: "66px",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          zIndex: 0,
        }}
      >
        <source src={bannerVdo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }} />

      {/* Content */}
      <Grid
        container
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1800,
          mx: "auto",
          px: { xs: 2, md: 4 },
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={7} lg={6}>
          {/* Badge */}
          <Chip
            className="hero-badge"
            icon={
              <img
                src={Plane}
                alt="Plane"
                style={{ width: 18, height: 18, objectFit: "contain" }}
              />
            }
            label="LOUFI HOLIDAYS & GLOBAL VISA"
            sx={{
              background: "rgb(255,255,255)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#272626",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              px: 1,
              mb: 3,
              "& .MuiChip-icon": { marginLeft: "8px" },
            }}
          />

          {/* Headline */}
          <Typography
            className="hero-h1"
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "4.5rem", lg: "5.5rem" },
              lineHeight: 1,
              fontWeight: 800,
              color: "#141414db",
              mb: 1,
            }}
          >
            Discover the World,
          </Typography>

          <Typography
            className="hero-h1"
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "4.5rem", lg: "5.5rem" },
              lineHeight: 1,
              fontWeight: 800,
              mb: 3,
              background: "linear-gradient(135deg, #c7d300, #f5ff8a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Travel Visa-Free
          </Typography>

          {/* Subtitle */}
          <Typography
            className="hero-sub"
            variant="body1"
            sx={{
              color: "#414141cc",
              fontSize: "1.1rem",
              lineHeight: 1.9,
              maxWidth: 550,
              mb: 4,
            }}
          >
            Your one-stop destination for handcrafted holiday packages and
            seamless global visa services — so you spend less time planning and
            more time exploring.
          </Typography>

          {/* Two CTA Buttons */}
          <Box
            className="hero-btns"
            sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 5 }}
          >
            {/* Holidays CTA */}
            <Button
              variant="contained"
              endIcon={
                <ArrowForwardIcon
                  className="ArroWICon"
                  sx={{
                    background: "#fff",
                    borderRadius: "50%",
                    color: "#c7d300",
                    p: "6px",
                    fontSize: "26px",
                  }}
                />
              }
              sx={{
                background: "linear-gradient(135deg, #c7d300, #c7d300)",
                color: "#fff",
                px: 2.5,
                py: 1.5,
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "23px",
                "&:hover": {
                  background: "linear-gradient(135deg, #dce84a, #c7d300)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 28px rgba(199,211,0,0.5)",
                },
              }}
            >
              Explore Holidays
            </Button>

            {/* Visa CTA */}
            <Button
              variant="contained"
              endIcon={
                <ArrowForwardIcon
                  className="ArroWICon"
                  sx={{
                    background: "#ffffff",
                    borderRadius: "50%",
                    color: "#272626",
                    p: "6px",
                    fontSize: "26px",
                  }}
                />
              }
              sx={{
                background: "linear-gradient(135deg, #0a0a0a, #0a0a0a)",
                color: "#ffffff",
                px: 2.5,
                py: 1.5,
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "23px",
                "&:hover": {
                  borderColor: "#c7d300",
                  color: "#c7d300",
                  backgroundColor: "#fff",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Apply for Visa
            </Button>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 30,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {/* Mouse */}
            {/* <Box
              sx={{
                width: 28,
                height: 46,
                border: "2px solid #fff",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                paddingTop: "6px",
                position: "relative",
              }}
            >
           
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#c7d300",
                  animation: "scrollDot 1.5s infinite",

                  "@keyframes scrollDot": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(0)",
                    },

                    "30%": {
                      opacity: 1,
                    },

                    "100%": {
                      opacity: 0,
                      transform: "translateY(14px)",
                    },
                  },
                }}
              />
            </Box> */}
          </Box>
          {/* Stats */}
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 4 }}>
            {stats.map((s, i) => (
              <Box
                key={i}
                className="hero-stats"
                sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "12px",
                    background: "rgb(255,255,255)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: i < 3 ? "#c7d300" : "#c7d300",
                  }}
                >
                  {React.cloneElement(s.icon, { sx: { fontSize: "28px" } })}
                </Box>
                <Box>
                  <Typography
                    sx={{ color: "#000", fontWeight: 700, fontSize: "1rem" }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    sx={{ color: "rgba(0,0,0,0.52)", fontSize: "0.85rem" }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

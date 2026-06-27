import { useState, useCallback } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const destinations = [
  {
    id: 1,
    name: "Thailand",
    type: "international",
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    id: 2,
    name: "Kerala",
    type: "domestic",
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779527166/ChatGPT_Image_May_23_2026_02_34_58_PM_1_mlkqia.png",
  },
  {
    id: 3,
    name: "Himachal Pradesh",
    type: "domestic",
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779527166/ChatGPT_Image_May_23_2026_02_34_58_PM_1_mlkqia.png",
  },
  {
    id: 4,
    name: "UAE",
    type: "international",
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779527166/ChatGPT_Image_May_23_2026_02_34_58_PM_1_mlkqia.png",
  },
  {
    id: 5,
    name: "Switzerland",
    type: "international",
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779527166/ChatGPT_Image_May_23_2026_02_34_58_PM_1_mlkqia.png",
  },
  {
    id: 6,
    name: "Maldives",
    type: "international",
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779527166/ChatGPT_Image_May_23_2026_02_34_58_PM_1_mlkqia.png",
  },
  {
    id: 7,
    name: "Bali",
    type: "international",
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779527166/ChatGPT_Image_May_23_2026_02_34_58_PM_1_mlkqia.png",
  },
  {
    id: 8,
    name: "Rajasthan",
    type: "domestic",
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/f_auto,q_auto/v1779527166/ChatGPT_Image_May_23_2026_02_34_58_PM_1_mlkqia.png",
  },
];

const SLOTS = [
  { x: -475, y: 59, scale: 0.85, opacity: 0.4, z: 1, rot: -15 },
  { x: -250, y: 8, scale: 0.95, opacity: 0.72, z: 2, rot: -10 },
  { x: 0, y: -22, scale: 1.0, opacity: 1.0, z: 5, rot: 0 },
  { x: 250, y: 8, scale: 0.95, opacity: 0.72, z: 2, rot: 10 },
  { x: 475, y: 59, scale: 0.85, opacity: 0.4, z: 1, rot: 15 },
];

function getSlot(index, current, total) {
  const diff = (((index - current) % total) + total) % total;
  if (diff === 0) return 2;
  if (diff === 1) return 3;
  if (diff === total - 1) return 1;
  if (diff === 2) return 4;
  if (diff === total - 2) return 0;
  return -1;
}

function DestCard({ dest, slot, onClick, onSeeMore }) {
  const s = SLOTS[slot];
  const isCenter = slot === 2;

  return (
    <Box
      onClick={!isCenter ? onClick : undefined}
      sx={{
        position: "absolute",
        width: 230,
        textAlign: "center",
        cursor: isCenter ? "default" : "pointer",
        pointerEvents: "auto",
        transform: `translateX(${s.x}px) translateY(${s.y}px) scale(${s.scale}) rotate(${s.rot}deg)`,
        opacity: s.opacity,
        zIndex: s.z,
        transition:
          "transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s ease",
        "&:hover .img-inner": !isCenter ? { transform: "scale(1.06)" } : {},
      }}
    >
      {/* Oval image */}
      <Box
        sx={{
          width: 230,
          height: 300,
          borderRadius: "60px",
          overflow: "hidden",
          mx: "auto",
          position: "relative",
          border: isCenter ? "3px solid #c7d300" : "3px solid transparent",
          boxShadow: isCenter ? "0 24px 60px rgba(0,0,0,0.18)" : "none",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <Box
          className="img-inner"
          component="img"
          src={dest.image}
          alt={dest.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
          }}
        />
      </Box>

      {/* Name */}
      <Typography
        sx={{
          mt: 1.5,
          fontWeight: 800,
          color: "#1a1a2e",
          fontSize: isCenter ? "1.15rem" : "0.95rem",
          transition: "font-size 0.3s ease",
        }}
      >
        {dest.name}
      </Typography>

      {/* Center card only — type badge + See More */}
      {isCenter && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            mt: 1,
          }}
        >
          {/* Type badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              position: "absolute",
              bottom: "100px",
              gap: 0.8,
              px: 1.8,
              py: 0.6,
              borderRadius: "10px",
              background: dest.type === "domestic" ? "#d32f2f" : "#0d47a1",
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#fff",
                animation: "blink 1.2s ease-in-out infinite",
                "@keyframes blink": {
                  "0%,100%": { opacity: 1 },
                  "50%": { opacity: 0.3 },
                },
              }}
            />
            <Typography
              sx={{
                fontSize: "0.62rem",
                fontWeight: 900,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              {dest.type === "domestic" ? "Domestic" : "International"}
            </Typography>
          </Box>

          {/* See More button */}
          <Box
            onClick={(e) => {
              e.stopPropagation();
              onSeeMore(dest);
            }}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.8,
              px: 2.2,
              py: 0.75,
              borderRadius: "22px",
              background: "linear-gradient(135deg, #c7d300, #9aa000)",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(199,211,0,0.4)",
              transition: "all 0.28s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 10px 26px rgba(199,211,0,0.55)",
                background: "linear-gradient(135deg, #dce84a, #c7d300)",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#1a1a2e",
                letterSpacing: "0.02em",
              }}
            >
              See More
            </Typography>
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 9, color: "#1a1a2e" }} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default function TrendingDestinations() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const N = destinations.length;

  const goTo = useCallback((idx) => setCurrent(((idx % N) + N) % N), [N]);

  const handleSeeMore = (dest) => {
    navigate(`/destinations/${dest.type}`);
  };

  return (
    <Box
      sx={{
        background: "#ffffff",
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        py: { xs: 6, md: 8 },
        px: 2,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2.2,
            py: 0.8,
            borderRadius: "999px",
            border: "1.5px solid #c7d300",
            background: "rgba(199,211,0,0.10)",
            mb: 2,
          }}
        >
          <FlightTakeoffIcon sx={{ fontSize: 15, color: "#8a9400" }} />
          <Typography
            sx={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: "#6b7200",
            }}
          >
            Trending Destinations
          </Typography>
        </Box>

        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "1.9rem", md: "2.8rem" },
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#1a1a2e",
          }}
        >
          Destinations You'll{" "}
          <Box component="span" sx={{ color: "#8ab200", fontWeight: 900 }}>
            Love
          </Box>
        </Typography>

        <Typography
          sx={{ color: "#666", fontSize: "0.92rem", mt: 1, lineHeight: 1.7 }}
        >
          Explore places that travellers can't stop talking about.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.2,
            mt: 2,
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 2,
              borderRadius: "2px",
              background: "#c7d300",
            }}
          />
          <FlightTakeoffIcon sx={{ fontSize: 18, color: "#8a9400" }} />
          <Box
            sx={{
              width: 50,
              height: 2,
              borderRadius: "2px",
              background: "#c7d300",
            }}
          />
        </Box>
      </Box>

      {/* Carousel */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 380, md: 460 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
        }}
      >
        <IconButton
          onClick={() => goTo(current - 1)}
          sx={{
            position: "absolute",
            left: { xs: 0, md: 8 },
            top: "38%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 42,
            height: 42,
            background: "#fff",
            border: "1.5px solid rgba(199,211,0,0.5)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            color: "#6b7200",
            "&:hover": {
              background: "#c7d300",
              color: "#1a1a2e",
              borderColor: "#c7d300",
            },
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
        </IconButton>

        {destinations.map((dest, i) => {
          const slot = getSlot(i, current, N);
          if (slot === -1) return null;
          return (
            <DestCard
              key={dest.id}
              dest={dest}
              slot={slot}
              onSeeMore={handleSeeMore}
              onClick={() => {
                if (slot === 1) goTo(current - 1);
                else if (slot === 3) goTo(current + 1);
                else if (slot === 0) goTo(current - 2);
                else if (slot === 4) goTo(current + 2);
              }}
            />
          );
        })}

        <IconButton
          onClick={() => goTo(current + 1)}
          sx={{
            position: "absolute",
            right: { xs: 0, md: 8 },
            top: "38%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 42,
            height: 42,
            background: "#fff",
            border: "1.5px solid rgba(199,211,0,0.5)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            color: "#6b7200",
            "&:hover": {
              background: "#c7d300",
              color: "#1a1a2e",
              borderColor: "#c7d300",
            },
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>

      {/* Dots */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.9, mt: 1 }}>
        {destinations.map((_, i) => (
          <Box
            key={i}
            onClick={() => goTo(i)}
            sx={{
              width: i === current ? 22 : 8,
              height: 8,
              borderRadius: i === current ? "4px" : "50%",
              background: i === current ? "#8ab200" : "rgba(199,211,0,0.35)",
              cursor: "pointer",
              transition:
                "width 0.3s ease, background 0.3s ease, border-radius 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

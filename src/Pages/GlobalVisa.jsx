import { useState } from "react";
import { Box, Typography, Button, Grid, InputBase, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";
import DescriptionIcon from "@mui/icons-material/Description";
import PublicIcon from "@mui/icons-material/Public";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// ─── Data ─────────────────────────────────────────────────────────────────────

const visaTypes = [
  {
    icon: "🏖️",
    title: "Tourist Visa",
    subtitle: "Leisure & Sightseeing",
    desc: "Perfect for leisure travel, family vacations, and sightseeing trips. Covers short stays for individuals, couples, and families.",
    time: "5–10 working days",
    docs: ["Passport", "Photos", "Bank Statement", "Hotel Booking"],
    fee: "₹3,000+",
    color: "#e8f5e9",
    accent: "#2e7d32",
    tag: "Most Popular",
    tagColor: "#2e7d32",
  },
  {
    icon: "💼",
    title: "Business Visa",
    subtitle: "Corporate & Conferences",
    desc: "For attending meetings, conferences, trade shows, or exploring business opportunities abroad. Requires employer letter.",
    time: "3–7 working days",
    docs: [
      "Passport",
      "Employer Letter",
      "Bank Statement",
      "Invitation Letter",
    ],
    fee: "₹5,500+",
    color: "#e3f2fd",
    accent: "#1565c0",
    tag: "Fast Track",
    tagColor: "#1565c0",
  },
  {
    icon: "🎓",
    title: "Student Visa",
    subtitle: "Higher Education",
    desc: "For degree programmes, language courses, and academic exchange. Valid for the full duration of your study period.",
    time: "10–20 working days",
    docs: ["Admission Letter", "Passport", "IELTS/TOEFL", "Financial Proof"],
    fee: "₹7,000+",
    color: "#f3e5f5",
    accent: "#6a1b9a",
    tag: "Long Stay",
    tagColor: "#6a1b9a",
  },
  {
    icon: "🛂",
    title: "Work Permit",
    subtitle: "Employment Abroad",
    desc: "Employment authorisation for skilled professionals moving abroad. Requires job offer and employer sponsorship.",
    time: "15–30 working days",
    docs: [
      "Job Offer Letter",
      "Passport",
      "Qualification Docs",
      "Police Clearance",
    ],
    fee: "₹9,000+",
    color: "#fff3e0",
    accent: "#e65100",
    tag: "Documentation Heavy",
    tagColor: "#e65100",
  },
  {
    icon: "🌐",
    title: "Immigration",
    subtitle: "Permanent Residency",
    desc: "Long-term settlement and PR applications. We assist with points-based systems, family reunification, and skilled migrant visas.",
    time: "30–90 working days",
    docs: ["Passport", "IELTS", "Financial Proof", "Skills Assessment"],
    fee: "₹15,000+",
    color: "#fce4ec",
    accent: "#880e4f",
    tag: "Expert Guided",
    tagColor: "#880e4f",
  },
  {
    icon: "⚡",
    title: "Express Visa",
    subtitle: "Urgent Processing",
    desc: "Last-minute travel? We fast-track your application with priority processing and dedicated handling for UAE, Thailand & more.",
    time: "24–72 hours",
    docs: ["Passport", "Photos", "Tickets", "Hotel Proof"],
    fee: "₹4,500+",
    color: "#fffde7",
    accent: "#f57f17",
    tag: "24hr Available",
    tagColor: "#f57f17",
  },
];

const countries = [
  {
    name: "Dubai / UAE",
    subtitle: "Land of Luxury",
    flag: "🇦🇪",
    type: "E-Visa",
    time: "2–4 days",
    price: "₹6,900",
    popular: true,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "Thailand",
    subtitle: "Land of Smiles",
    flag: "🇹🇭",
    type: "E-Visa",
    time: "3–5 days",
    price: "₹3,200",
    popular: true,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "Singapore",
    subtitle: "The Lion City",
    flag: "🇸🇬",
    type: "Sticker",
    time: "5–7 days",
    price: "₹3,280",
    popular: true,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "Malaysia",
    subtitle: "Truly Asia",
    flag: "🇲🇾",
    type: "E-Visa",
    time: "3–5 days",
    price: "₹2,800",
    popular: true,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "Schengen / Europe",
    subtitle: "26 Countries, One Visa",
    flag: "🇪🇺",
    type: "Sticker",
    time: "10–15 days",
    price: "₹9,500",
    popular: true,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "United Kingdom",
    subtitle: "Land of History",
    flag: "🇬🇧",
    type: "Online",
    time: "15–21 days",
    price: "₹14,000",
    popular: false,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "United States",
    subtitle: "Land of Opportunity",
    flag: "🇺🇸",
    type: "Sticker",
    time: "30–60 days",
    price: "USD 185",
    popular: false,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "Australia",
    subtitle: "Land Down Under",
    flag: "🇦🇺",
    type: "E-Visa",
    time: "7–14 days",
    price: "₹12,000",
    popular: false,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "Japan",
    subtitle: "Land of the Rising Sun",
    flag: "🇯🇵",
    type: "Sticker",
    time: "5–7 days",
    price: "₹4,500",
    popular: false,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "Maldives",
    subtitle: "Paradise on Earth",
    flag: "🇲🇻",
    type: "Free VOA",
    time: "On arrival",
    price: "Free",
    popular: false,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "Canada",
    subtitle: "The Great White North",
    flag: "🇨🇦",
    type: "Online",
    time: "20–45 days",
    price: "₹18,000",
    popular: false,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
  {
    name: "Switzerland",
    subtitle: "Heart of Europe",
    flag: "🇨🇭",
    type: "Sticker",
    time: "10–15 days",
    price: "₹10,500",
    popular: false,
    image:
      "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png",
  },
];

const steps = [
  {
    num: "01",
    icon: <PublicIcon sx={{ fontSize: 28, color: "#c7d300" }} />,
    title: "Choose Country",
    desc: "Select your destination and visa type from our list.",
  },
  {
    num: "02",
    icon: <DescriptionIcon sx={{ fontSize: 28, color: "#c7d300" }} />,
    title: "Submit Documents",
    desc: "Upload your documents securely through WhatsApp or email.",
  },
  {
    num: "03",
    icon: <SupportAgentIcon sx={{ fontSize: 28, color: "#c7d300" }} />,
    title: "Expert Review",
    desc: "Our visa specialists verify and process your application.",
  },
  {
    num: "04",
    icon: <FlightTakeoffIcon sx={{ fontSize: 28, color: "#c7d300" }} />,
    title: "Visa Delivered",
    desc: "Receive your approved visa at your doorstep or via email.",
  },
];

const whyUs = [
  {
    icon: <VerifiedIcon sx={{ fontSize: 32, color: "#c7d300" }} />,
    title: "99% Approval Rate",
    desc: "Expert handling with near-zero rejection history.",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 32, color: "#c7d300" }} />,
    title: "Fast Turnaround",
    desc: "Express processing options available for urgent travel.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 32, color: "#c7d300" }} />,
    title: "Dedicated Support",
    desc: "Personal visa advisor from application to approval.",
  },
  {
    icon: <CheckCircleOutlinedIcon sx={{ fontSize: 32, color: "#c7d300" }} />,
    title: "End-to-End Help",
    desc: "Document checklist, form filling, and embassy follow-up.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GlobalVisa() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = countries.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All"
        ? true
        : filter === "Popular"
          ? c.popular
          : filter === "E-Visa"
            ? c.type === "E-Visa"
            : filter === "On Arrival"
              ? c.type === "Free VOA"
              : true;
    return matchSearch && matchFilter;
  });

  const typeColor = (type) => {
    if (type === "E-Visa") return { bg: "#e3f2fd", color: "#1565c0" };
    if (type === "Free VOA") return { bg: "#e8f5e9", color: "#2e7d32" };
    if (type === "Online") return { bg: "#f3e5f5", color: "#6a1b9a" };
    return { bg: "#f5f5f5", color: "#555" };
  };

  return (
    <Box sx={{ background: "#fff", overflowX: "hidden" }}>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          pt: { xs: 14, md: 16 },
          pb: { xs: 8, md: 10 },
          px: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(199,211,0,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(199,211,0,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2.2,
              py: 0.8,
              borderRadius: "999px",
              border: "1.5px solid rgba(199,211,0,0.4)",
              background: "rgba(199,211,0,0.08)",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#c7d300",
                animation: "pulse 1.5s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%,100%": { opacity: 1 },
                  "50%": { opacity: 0.3 },
                },
              }}
            />
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "#c7d300",
              }}
            >
              Global Visa Services
            </Typography>
          </Box>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            Your Visa,{" "}
            <Box component="span" sx={{ color: "#c7d300" }}>
              Sorted.
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.65)",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.8,
              mb: 5,
              maxWidth: 560,
              mx: "auto",
            }}
          >
            Tourist, business, student or express — we handle your visa from
            document prep to doorstep delivery.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              background: "#fff",
              borderRadius: "16px",
              px: 2.5,
              py: 1.2,
              maxWidth: 520,
              mx: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            <SearchIcon sx={{ color: "#9aa000", fontSize: 22 }} />
            <InputBase
              placeholder="Search a country... e.g. Dubai, UK, Canada"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: "0.92rem", color: "#1a1a2e" }}
            />
            <Button
              component="a"
              href="https://wa.me/917736062244"
              target="_blank"
              sx={{
                background: "#c7d300",
                color: "#1a1a2e",
                borderRadius: "10px",
                px: 2.5,
                py: 0.9,
                fontWeight: 800,
                fontSize: "0.82rem",
                textTransform: "none",
                whiteSpace: "nowrap",
                "&:hover": { background: "#dce84a" },
              }}
            >
              Apply Now
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 3, md: 6 },
              mt: 5,
              flexWrap: "wrap",
            }}
          >
            {[
              ["50+", "Countries Covered"],
              ["99%", "Approval Rate"],
              ["24hr", "Express Option"],
              ["5000+", "Visas Processed"],
            ].map(([val, lbl]) => (
              <Box key={lbl} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    fontWeight: 900,
                    color: "#c7d300",
                    lineHeight: 1,
                  }}
                >
                  {val}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.5)",
                    mt: 0.3,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {lbl}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── VISA TYPES — REDESIGNED ───────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 7, md: 10 },
          px: { xs: 2, md: 6 },
          background: "#f9f9f6",
        }}
      >
        <Box sx={{ maxWidth: 1600, mx: "auto" }}>
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#9aa000",
                mb: 1,
              }}
            >
              What We Offer
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: 900,
                color: "#1a1a2e",
              }}
            >
              Visa Types We Handle
            </Typography>
            <Typography
              sx={{
                color: "#888",
                fontSize: "0.92rem",
                mt: 1,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              From quick tourist visas to complex immigration — we cover every
              type of travel need.
            </Typography>
          </Box>

          <Grid
            container
            spacing={3}
            className="hello"
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              justifyContent: "center",
            }}
          >
            {visaTypes.map((v) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={v.title}
                sx={{ display: "flex" }}
              >
                <Box
                  sx={{
                    background: "#fff",
                    borderRadius: "22px",
                    border: `1.5px solid ${v.accent}22`,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.32s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: `0 20px 50px ${v.accent}28`,
                      borderColor: v.accent + "66",
                    },
                  }}
                >
                  {/* Top color strip */}
                  <Box sx={{ background: v.color, px: 2.5, pt: 2.5, pb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1.5,
                      }}
                    >
                      <Box sx={{ fontSize: "2rem", lineHeight: 1 }}>
                        {v.icon}
                      </Box>
                      <Box
                        sx={{
                          px: 1.2,
                          py: 0.35,
                          borderRadius: "6px",
                          background: v.tagColor,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.58rem",
                            fontWeight: 900,
                            color: "#fff",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {v.tag}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "1.05rem",
                        color: "#1a1a2e",
                        lineHeight: 1.2,
                      }}
                    >
                      {v.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: v.accent,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        mt: 0.3,
                      }}
                    >
                      {v.subtitle}
                    </Typography>
                  </Box>

                  {/* Body */}
                  <Box
                    sx={{
                      px: 2.5,
                      pt: 2,
                      pb: 2.5,
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        color: "#666",
                        lineHeight: 1.65,
                        mb: 2,
                      }}
                    >
                      {v.desc}
                    </Typography>

                    {/* Docs */}
                    <Typography
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        color: "#bbb",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        mb: 0.8,
                      }}
                    >
                      Documents Needed
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.6,
                        mb: 2,
                      }}
                    >
                      {v.docs.map((d) => (
                        <Box
                          key={d}
                          sx={{
                            px: 1,
                            py: 0.3,
                            borderRadius: "5px",
                            background: v.color,
                            border: `1px solid ${v.accent}33`,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.66rem",
                              fontWeight: 700,
                              color: v.accent,
                            }}
                          >
                            {d}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Footer */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        pt: 1.5,
                        borderTop: "1px solid #f0f0f0",
                        mt: "auto",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.6 }}
                      >
                        <AccessTimeIcon
                          sx={{ fontSize: 13, color: v.accent }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.73rem",
                            fontWeight: 700,
                            color: v.accent,
                          }}
                        >
                          {v.time}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography sx={{ fontSize: "0.63rem", color: "#aaa" }}>
                          Starting from
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.88rem",
                            fontWeight: 900,
                            color: "#1a1a2e",
                          }}
                        >
                          {v.fee}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Apply btn — always visible */}
                    <Button
                      component="a"
                      href="https://wa.me/917736062244"
                      target="_blank"
                      fullWidth
                      sx={{
                        mt: 1.8,
                        background: v.accent,
                        color: "#fff",
                        borderRadius: "10px",
                        py: 0.9,
                        fontWeight: 800,
                        fontSize: "0.8rem",
                        textTransform: "none",
                        "&:hover": { filter: "brightness(1.12)" },
                      }}
                    >
                      Apply via WhatsApp →
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* ── COUNTRY GRID — REDESIGNED (photo cards like riya.travel) ─ */}
      <Box
        sx={{ py: { xs: 7, md: 10 }, px: { xs: 2, md: 6 }, background: "#fff" }}
      >
        <Box sx={{ maxWidth: 1600, mx: "auto" }}>
          {/* Header row with filters on right */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 2,
              mb: 5,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#9aa000",
                  mb: 0.5,
                }}
              >
                Popular Destinations
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.4rem" },
                  fontWeight: 900,
                  color: "#1a1a2e",
                  lineHeight: 1.1,
                }}
              >
                Visa{" "}
                <Box component="span" sx={{ color: "#c7d300" }}>
                  Destinations
                </Box>
              </Typography>
              <Typography
                sx={{ fontSize: "0.78rem", color: "#e65100", mt: 0.5 }}
              >
                * Additional service fee + GST applicable over displayed cost.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {["All", "Popular", "E-Visa", "On Arrival"].map((f) => (
                <Chip
                  key={f}
                  label={f}
                  onClick={() => setFilter(f)}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    borderRadius: "8px",
                    background: filter === f ? "#1a1a2e" : "transparent",
                    color: filter === f ? "#c7d300" : "#666",
                    border:
                      filter === f ? "1.5px solid #1a1a2e" : "1.5px solid #ddd",
                    "&:hover": {
                      background: filter === f ? "#1a1a2e" : "rgba(0,0,0,0.05)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Photo cards grid */}
          <Grid container spacing={2.5} sx={{justifyContent:"center"}}>
            {filtered.map((c) => {
              const tc = typeColor(c.type);
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={c.name}>
                  <Box
                    component="a"
                    href="https://wa.me/917736062244"
                    target="_blank"
                    sx={{
                      display: "block",
                      textDecoration: "none",
                      borderRadius: "18px",
                      overflow: "hidden",
                      border: "1.5px solid #cfcccc",
                      transition: "all 0.3s ease",
                      background: "#fff",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.13)",
                        borderColor: "#c7d300",
                      },
                      "&:hover .country-img": { transform: "scale(1.07)" },
                    }}
                  >
                    {/* Image */}
                    <Box
                      sx={{
                        height: 180,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Box
                        className="country-img"
                        component="img"
                        src={c.image}
                        alt={c.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.5s ease",
                        }}
                        onError={(e) => {
                          e.target.style.background = "#e0e0e0";
                        }}
                      />
                      {/* Flag circle */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 12,
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.4rem",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        }}
                      >
                        {c.flag}
                      </Box>
                      {/* Popular badge */}
                      {c.popular && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            px: 1.2,
                            py: 0.4,
                            borderRadius: "6px",
                            background: "#c7d300",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.6rem",
                              fontWeight: 900,
                              color: "#1a1a2e",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                            }}
                          >
                            Popular
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Info */}
                    <Box sx={{ px: 2.2, pt: 2, pb: 2.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 0.6,
                          mb: 0.4,
                        }}
                      >
                        <LocationOnIcon
                          sx={{
                            fontSize: 15,
                            color: "#1a1a2e",
                            mt: "2px",
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontWeight: 900,
                            fontSize: "1rem",
                            color: "#1a1a2e",
                            lineHeight: 1.2,
                          }}
                        >
                          {c.name}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: "#999",
                          mb: 1.5,
                          ml: "21px",
                        }}
                      >
                        {c.subtitle}
                      </Typography>

                      <Box
                        sx={{
                          width: "100%",
                          height: "1px",
                          background: "#f0f0f0",
                          mb: 1.5,
                        }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.7,
                          }}
                        >
                          {/* visa type badge */}
                          <Box
                            sx={{
                              px: 1,
                              py: 0.3,
                              borderRadius: "5px",
                              background: tc.bg,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.62rem",
                                fontWeight: 800,
                                color: tc.color,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                              }}
                            >
                              {c.type}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.4,
                            }}
                          >
                            <AccessTimeIcon
                              sx={{ fontSize: 11, color: "#aaa" }}
                            />
                            <Typography
                              sx={{ fontSize: "0.68rem", color: "#aaa" }}
                            >
                              {c.time}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography
                            sx={{ fontSize: "0.65rem", color: "#aaa" }}
                          >
                            Starting from
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.9rem",
                              fontWeight: 900,
                              color: "#c7000b",
                            }}
                          >
                            {c.price}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          {filtered.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography sx={{ color: "#999", fontSize: "0.95rem" }}>
                No countries found. Try a different search.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 7, md: 10 },
          px: { xs: 2, md: 6 },
          background: "#1a1a2e",
        }}
      >
        <Box sx={{ maxWidth: 1600, mx: "auto" }}>
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#c7d300",
                mb: 1,
              }}
            >
              Simple Process
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: 900,
                color: "#fff",
              }}
            >
              How It Works
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{justifyContent:"center"}}>
            {steps.map((s, i) => (
              <Grid item xs={12} sm={6} md={3} key={s.num}>
                <Box sx={{ position: "relative", textAlign: "center" }}>
                  {i < steps.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: "none", md: "block" },
                        position: "absolute",
                        top: 28,
                        left: "60%",
                        width: "80%",
                        height: "1.5px",
                        background:
                          "linear-gradient(90deg, rgba(199,211,0,0.4), rgba(199,211,0,0.08))",
                        zIndex: 0,
                      }}
                    />
                  )}
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "16px",
                        background: "rgba(199,211,0,0.1)",
                        border: "1.5px solid rgba(199,211,0,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      {s.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 900,
                        color: "#c7d300",
                        letterSpacing: "0.12em",
                        mb: 0.5,
                      }}
                    >
                      STEP {s.num}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "1rem",
                        color: "#fff",
                        mb: 0.8,
                      }}
                    >
                      {s.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.7,
                      }}
                    >
                      {s.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 7, md: 10 },
          px: { xs: 2, md: 6 },
          background: "#f9f9f6",
        }}
      >
        <Box sx={{ maxWidth: 1800, mx: "auto" }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#9aa000",
                mb: 1,
              }}
            >
              Our Edge
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: 900,
                color: "#1a1a2e",
              }}
            >
              Why Choose Loufi for Visa?
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{justifyContent:"center"}}>
            {whyUs.map((w) => (
              <Grid item xs={12} sm={6} md={3} key={w.title} sx={{}}>
                <Box
                  sx={{
                    background: "#fff",
                    borderRadius: "20px",
                    p: 3.5,
                    border: "1.5px solid rgba(0,0,0,0.06)",
                    height: "100%",
                    transition: "all 0.3s",
                    justifyContent:"center",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 16px 40px rgba(199,211,0,0.12)",
                      borderColor: "rgba(199,211,0,0.4)",
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{w.icon}</Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: "#1a1a2e",
                      mb: 0.8,
                    }}
                  >
                    {w.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.82rem", color: "#777", lineHeight: 1.7 }}
                  >
                    {w.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* ── DOCUMENT CHECKLIST ────────────────────────────────────── */}
      <Box
        sx={{
          py: 5,
          px: { xs: 2, md: 6 },
          background: "#fff",
          borderTop: "1px solid #f0f0f0",
       
        }}
      >
        <Box sx={{ maxWidth: 1100, mx: "auto" ,   }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9aa000",
              mb: 2,
              textAlign: "center",
            }}
          >
            General Document Checklist
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
            }}
          >
            {[
              "Valid Passport (6+ months)",
              "Recent Passport Photos",
              "Confirmed Flight Tickets",
              "Hotel Booking Proof",
              "Bank Statements (3 months)",
              "Travel Insurance",
              "Visa Application Form",
              "Cover Letter",
            ].map((doc) => (
              <Box
                key={doc}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  px: 1.8,
                  py: 0.7,
                  borderRadius: "8px",
                  background: "#f9f9f6",
                  border: "1px solid #eee",
                }}
              >
                <CheckCircleOutlinedIcon
                  sx={{ fontSize: 15, color: "#c7d300" }}
                />
                <Typography
                  sx={{ fontSize: "0.78rem", color: "#444", fontWeight: 600 }}
                >
                  {doc}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "0.75rem",
              color: "#aaa",
              mt: 2,
            }}
          >
            * Requirements vary by country. Our team will send you a
            personalised checklist.
          </Typography>
        </Box>
      </Box>

      {/* ── CTA BANNER ────────────────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 7, md: 9 },
          px: 3,
          textAlign: "center",
          background: "linear-gradient(135deg, #c7d300 0%, #9aa000 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        <Box sx={{ position: "relative" }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              fontWeight: 900,
              color: "#1a1a2e",
              mb: 1.5,
            }}
          >
            Ready to Apply?
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "rgba(0,0,0,0.6)",
              mb: 4,
              maxWidth: 480,
              mx: "auto",
            }}
          >
            Chat with our visa experts on WhatsApp — free consultation and
            document checklist in minutes.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              component="a"
              href="https://wa.me/917736062244"
              target="_blank"
              startIcon={<WhatsAppIcon />}
              sx={{
                background: "#1a1a2e",
                color: "#fff",
                borderRadius: "16px",
                px: 4,
                py: 1.5,
                fontWeight: 800,
                fontSize: "0.92rem",
                textTransform: "none",
                "&:hover": { background: "#111" },
              }}
            >
              Chat on WhatsApp
            </Button>
            <Button
              endIcon={<ArrowForwardIosIcon sx={{ fontSize: 13 }} />}
              sx={{
                background: "rgba(0,0,0,0.12)",
                color: "#1a1a2e",
                borderRadius: "16px",
                px: 4,
                py: 1.5,
                fontWeight: 800,
                fontSize: "0.92rem",
                textTransform: "none",
                border: "1.5px solid rgba(0,0,0,0.15)",
                "&:hover": { background: "rgba(0,0,0,0.2)" },
              }}
            >
              View All Countries
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

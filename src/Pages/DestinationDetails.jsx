import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const domesticDestinations = [
  { state: "Kerala", places: ["Munnar", "Alleppey", "Wayanad", "Kovalam", "Thekkady", "Varkala", "Kochi", "Thrissur", "Kumarakom", "Bekal", "Kozhikode", "Sabarimala"], image: "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png", tag: "God's Own Country" },
  { state: "Himachal Pradesh", places: ["Manali", "Shimla", "Dharamshala", "Spiti Valley", "Kasol", "Kullu", "Dalhousie", "Khajjiar", "Bir Billing", "Chail"], image: "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png", tag: "Land of Mountains" },
  { state: "Rajasthan", places: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Pushkar", "Ranthambore", "Bikaner", "Ajmer", "Mount Abu", "Chittorgarh"], image: "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png", tag: "Land of Royals" },
  { state: "Goa", places: ["North Goa", "South Goa", "Calangute", "Baga", "Anjuna", "Palolem", "Vagator", "Arambol", "Colva", "Old Goa"], image: "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png", tag: "Beach Paradise" },
  { state: "Jammu & Kashmir", places: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Leh", "Ladakh", "Kargil", "Vaishno Devi", "Patnitop", "Dal Lake"], image: "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png", tag: "Heaven on Earth" },
  { state: "Uttarakhand", places: ["Rishikesh", "Haridwar", "Nainital", "Mussoorie", "Jim Corbett", "Auli", "Kedarnath", "Badrinath", "Chopta", "Lansdowne"], image: "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png", tag: "Dev Bhoomi" },
  { state: "Tamil Nadu", places: ["Chennai", "Ooty", "Kodaikanal", "Madurai", "Kanyakumari", "Rameswaram", "Mahabalipuram", "Coimbatore", "Vellore", "Thanjavur"], image: "https://res.cloudinary.com/dzuyrsn7t/image/upload/w_400,f_auto,q_auto/v1780573726/ThailandDestination_onmsrr.png", tag: "Temple Land" },
  { state: "Karnataka", places: ["Coorg", "Bangalore", "Mysore", "Hampi", "Gokarna", "Chikmagalur", "Dandeli", "Kabini", "Udupi", "Belur"], image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700&q=80", tag: "Garden State" },
  { state: "Maharashtra", places: ["Mumbai", "Pune", "Lonavala", "Mahabaleshwar", "Aurangabad", "Ajanta & Ellora", "Nashik", "Alibaug", "Matheran", "Lavasa"], image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=700&q=80", tag: "Land of Forts" },
  { state: "Andaman & Nicobar", places: ["Port Blair", "Havelock Island", "Neil Island", "Ross Island", "Baratang", "Diglipur", "Radhanagar Beach", "Cellular Jail"], image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=700&q=80", tag: "Island Bliss" },
  { state: "Northeast India", places: ["Sikkim", "Meghalaya", "Assam", "Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram", "Tripura"], image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80", tag: "Seven Sisters" },
  { state: "Gujarat", places: ["Rann of Kutch", "Gir Forest", "Somnath", "Dwarka", "Ahmedabad", "Surat", "Vadodara", "Saputara", "Palitana", "Diu"], image: "https://images.unsplash.com/photo-1595073752055-28db3dbe2a04?w=700&q=80", tag: "Vibrant Gujarat" },
];

const internationalDestinations = [
  { region: "Middle East", places: ["Dubai", "Abu Dhabi", "Sharjah", "Qatar", "Bahrain", "Oman", "Jordan", "Saudi Arabia", "Kuwait", "Israel"], image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80", tag: "Desert Dreams" },
  { region: "Southeast Asia", places: ["Thailand", "Bali", "Singapore", "Malaysia", "Vietnam", "Cambodia", "Philippines", "Indonesia", "Myanmar", "Laos"], image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=80", tag: "Exotic Asia" },
  { region: "Europe", places: ["Switzerland", "France", "Italy", "Spain", "Greece", "Turkey", "Germany", "Austria", "Netherlands", "Portugal", "UK", "Czech Republic"], image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80", tag: "Old World Charm" },
  { region: "Maldives & Indian Ocean", places: ["Maldives", "Mauritius", "Seychelles", "Sri Lanka", "Reunion Island", "Zanzibar", "Madagascar"], image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=700&q=80", tag: "Island Paradise" },
  { region: "East Asia", places: ["Japan", "China", "South Korea", "Hong Kong", "Macau", "Taiwan", "Mongolia"], image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80", tag: "Far East Magic" },
  { region: "Americas", places: ["USA", "Canada", "Mexico", "Brazil", "Peru", "Argentina", "Costa Rica", "Cuba", "Colombia", "Chile"], image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=700&q=80", tag: "New World" },
  { region: "Africa", places: ["Kenya", "Tanzania", "South Africa", "Egypt", "Morocco", "Ethiopia", "Rwanda", "Zimbabwe", "Namibia", "Uganda"], image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=700&q=80", tag: "Wild Africa" },
  { region: "Australia & Pacific", places: ["Australia", "New Zealand", "Fiji", "Bora Bora", "Tahiti", "Vanuatu", "Papua New Guinea", "Cook Islands"], image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=700&q=80", tag: "Down Under" },
  { region: "Central Asia", places: ["Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Azerbaijan", "Armenia", "Georgia"], image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=700&q=80", tag: "Silk Road" },
  { region: "South Asia", places: ["Nepal", "Bhutan", "Pakistan", "Bangladesh", "Myanmar"], image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80", tag: "Himalayan Region" },
];

// ── Premium Destination Card ──────────────────────────────────
function DestCard({ item, isInternational }) {
  const name = isInternational ? item.region : item.state;

  return (
    <Box
      className="dest-card"
      sx={{
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        height: 420,
        cursor: "pointer",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        transition: "all 0.4s cubic-bezier(0.34,1.1,0.64,1)",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.28)",
        },
        "&:hover .card-img": { transform: "scale(1.1)" },
        "&:hover .card-name": { transform: "translateY(-2px)" },
      }}
    >
      {/* Full bleed image */}
      <Box
        className="card-img"
        component="img"
        src={item.image}
        alt={name}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.6s ease",
          display: "block",
        }}
      />

      {/* Persistent gradient */}
      <Box className="card-content" sx={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        transition: "background 0.4s ease",
      }} />

      {/* Tag top-left */}
      <Box sx={{
        position: "absolute", top: 16, left: 16,
        px: 1.4, py: 0.5, borderRadius: "10px",
        background: "rgba(199,211,0,0.92)",
        backdropFilter: "blur(4px)",
        zIndex: 3,
      }}>
        <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, color: "#1a1a2e", letterSpacing: "0.04em" }}>{item.tag}</Typography>
      </Box>

      {/* Places count top-right */}
      <Box sx={{
        position: "absolute", top: 16, right: 16,
        px: 1.4, py: 0.5, borderRadius: "10px",
        background: "rgba(0,0,0,0.55)",
        border: "1px solid rgba(199,211,0,0.4)",
        backdropFilter: "blur(6px)",
        zIndex: 3,
      }}>
        <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#c7d300" }}>{item.places.length} Places</Typography>
      </Box>

      {/* Bottom content */}
      <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 2.5, zIndex: 3 }}>

        {/* Name */}
        <Typography className="card-name" sx={{
          color: "#fff", fontWeight: 900, fontSize: "1.35rem",
          lineHeight: 1.2, mb: 1.2,
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          transition: "transform 0.3s ease",
        }}>
          {name}
        </Typography>

        {/* Places — always visible */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7, mb: 1.8 }}>
          {item.places.map((p, i) => (
            <Box key={i} sx={{
              px: 1, py: 0.35, borderRadius: "6px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.22)",
              backdropFilter: "blur(4px)",
            }}>
              <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>{p}</Typography>
            </Box>
          ))}
        </Box>

        {/* Book button — always visible */}
        <Button
          component="a"
          href={`https://wa.me/917736062244?text=Hi! I'm interested in ${name} packages. Please share details.`}
          target="_blank"
          startIcon={<WhatsAppIcon sx={{ fontSize: "15px !important" }} />}
          fullWidth
          sx={{
            background: "linear-gradient(135deg,#25D366,#1ea952)",
            color: "#fff",
            borderRadius: "12px",
            py: 1.1,
            fontWeight: 700,
            fontSize: "0.82rem",
            textTransform: "none",
            boxShadow: "0 4px 18px rgba(37,211,102,0.35)",
            "&:hover": { background: "linear-gradient(135deg,#20ba5a,#1a9946)", transform: "translateY(-1px)" },
            transition: "all 0.25s ease",
          }}
        >
          Enquire on WhatsApp
        </Button>
      </Box>
    </Box>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function DestinationDetails({ initialTab = "domestic", onBack }) {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const orb1    = useRef(null);
  const orb2    = useRef(null);
  const planeRef= useRef(null);

  const [activeTab, setActiveTab] = useState(initialTab);
  const [search, setSearch]       = useState("");

  useEffect(() => { setActiveTab(initialTab); }, [initialTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const ctx = gsap.context(() => {
      // Hero content parallax
      gsap.to(heroRef.current, {
        yPercent: 25, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Orbs parallax
      gsap.to(orb1.current, { y: -80, ease: "none", scrollTrigger: { trigger: pageRef.current, start: "top top", end: "bottom top", scrub: 1.8 } });
      gsap.to(orb2.current, { y: -120, ease: "none", scrollTrigger: { trigger: pageRef.current, start: "top top", end: "bottom top", scrub: 2.5 } });

      // Plane float
      gsap.to(planeRef.current, { y: -16, x: 10, rotation: 4, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // Hero text entrance
      gsap.fromTo(".hero-in",
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.13, duration: 1, ease: "power3.out", delay: 0.1 }
      );

      // Stats bounce in
      gsap.fromTo(".stat-item",
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.65, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".stats-row", start: "top 90%" } }
      );

      // Cards stagger
      gsap.fromTo(".dest-card",
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, stagger: { amount: 0.7, from: "start" }, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".cards-grid", start: "top 83%" } }
      );

    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Re-animate on tab switch
  useEffect(() => {
    gsap.fromTo(".dest-card",
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, stagger: { amount: 0.55, from: "start" }, duration: 0.7, ease: "power3.out" }
    );
  }, [activeTab]);

  const data    = activeTab === "domestic" ? domesticDestinations : internationalDestinations;
  const nameKey = activeTab === "domestic" ? "state" : "region";

  const filtered = search.trim()
    ? data.filter(d =>
        d[nameKey].toLowerCase().includes(search.toLowerCase()) ||
        d.places.some(p => p.toLowerCase().includes(search.toLowerCase()))
      )
    : data;

  return (
    <Box ref={pageRef} sx={{ minHeight: "100vh", overflowX: "hidden" }}>

      {/* ══ DARK HERO ══ */}
      <Box sx={{
        background: "linear-gradient(145deg,#0d1117 0%,#111827 55%,#0d1117 100%)",
        position: "relative",
        overflow: "hidden",
        pt: "66px",
      }}>
        {/* Dot grid */}
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(199,211,0,0.07) 1px,transparent 1px)", backgroundSize: "28px 28px", zIndex: 0, pointerEvents: "none" }} />

        {/* Orbs */}
        <Box ref={orb1} sx={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(199,211,0,0.1) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
        <Box ref={orb2} sx={{ position: "absolute", bottom: 0, left: -100, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(199,211,0,0.07) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

        {/* Floating plane */}
        <Box ref={planeRef} sx={{ position: "absolute", top: 80, right: { xs: 20, md: 90 }, zIndex: 1, opacity: 0.15, pointerEvents: "none" }}>
          <FlightTakeoffIcon sx={{ fontSize: { xs: 64, md: 110 }, color: "#c7d300" }} />
        </Box>

        {/* Hero content */}
        <Box ref={heroRef} sx={{ position: "relative", zIndex: 2, textAlign: "center", px: { xs: 2, md: 4 }, pt: { xs: 5, md: 8 }, pb: { xs: 6, md: 9 } }}>

          {onBack && (
            <Button onClick={onBack} startIcon={<ArrowBackIcon />}
              sx={{ position: "absolute", top: 16, left: 16, color: "rgba(255,255,255,0.65)", textTransform: "none", fontWeight: 600, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", px: 2, py: 0.8, "&:hover": { background: "rgba(255,255,255,0.12)", color: "#fff" }, transition: "all 0.2s" }}>
              Back
            </Button>
          )}

          <Box className="hero-in" sx={{ display: "inline-flex", alignItems: "center", gap: 1.2, px: 2.2, py: 0.7, borderRadius: "30px", background: "rgba(199,211,0,0.1)", border: "1px solid rgba(199,211,0,0.3)", mb: 2.5 }}>
            <FlightTakeoffIcon sx={{ fontSize: 14, color: "#c7d300" }} />
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c7d300" }}>Explore Destinations</Typography>
          </Box>

          <Typography className="hero-in" sx={{ fontSize: { xs: "2.5rem", md: "4.2rem" }, fontWeight: 900, color: "#fff", lineHeight: 1.1, mb: 1.2 }}>
            Find Your Next
            <Box component="span" sx={{ display: "block", background: "linear-gradient(135deg,#c7d300,#f5ff8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Adventure
            </Box>
          </Typography>

          <Typography className="hero-in" sx={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", mb: 4 }}>
            Handpicked destinations across India and around the world
          </Typography>

          {/* Search */}
          <Box className="hero-in" sx={{ maxWidth: 520, mx: "auto", mb: 4 }}>
            <TextField fullWidth
              placeholder="Search destination, state or place..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#c7d300", fontSize: 20 }} /></InputAdornment> }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  backdropFilter: "blur(10px)",
                  "& fieldset": { borderColor: "rgba(199,211,0,0.25)" },
                  "&:hover fieldset": { borderColor: "rgba(199,211,0,0.5)" },
                  "&.Mui-focused fieldset": { borderColor: "#c7d300", borderWidth: "1.5px" },
                  "& input": { py: 1.5, fontSize: "0.92rem", color: "#fff" },
                  "& input::placeholder": { color: "rgba(255,255,255,0.3)" },
                },
              }}
            />
          </Box>

          {/* Tab toggle */}
          <Box className="hero-in" sx={{ display: "inline-flex", background: "rgba(255,255,255,0.06)", borderRadius: "18px", border: "1.5px solid rgba(199,211,0,0.18)", p: 0.7, gap: 0.6 }}>
            {[
              { key: "domestic",      icon: <LocationOnIcon sx={{ fontSize: "16px !important" }} />, label: "Domestic" },
              { key: "international", icon: <PublicIcon     sx={{ fontSize: "16px !important" }} />, label: "International" },
            ].map(tab => (
              <Button key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSearch(""); }}
                startIcon={tab.icon}
                sx={{
                  borderRadius: "13px", px: 3.5, py: 1.1,
                  fontWeight: 700, fontSize: "0.88rem", textTransform: "none",
                  transition: "all 0.3s ease",
                  background: activeTab === tab.key ? "linear-gradient(135deg,#c7d300,#9aa000)" : "transparent",
                  color: activeTab === tab.key ? "#1a1a2e" : "rgba(255,255,255,0.55)",
                  boxShadow: activeTab === tab.key ? "0 4px 18px rgba(199,211,0,0.35)" : "none",
                  "&:hover": { background: activeTab === tab.key ? "#dce84a" : "rgba(199,211,0,0.1)", color: activeTab === tab.key ? "#1a1a2e" : "#c7d300" },
                }}>
                {tab.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Stats — SEPARATE from hero, after it */}
        <Box className="stats-row" sx={{
         
          borderTop: "1px solid rgba(199,211,0,0.12)",
          py: 3, px: 3,
          display: "flex", justifyContent: "center",
          gap: { xs: 5, md: 10 },
          flexWrap: "wrap",
          position: "relative", zIndex: 2,
        }}>
          {[
            { label: activeTab === "domestic" ? "States & UTs" : "Regions", value: data.length },
            { label: "Total Places", value: data.reduce((a, b) => a + b.places.length, 0) + "+" },
            { label: "Showing Now",  value: filtered.length },
          ].map((s, i) => (
            <Box key={i} className="stat-item" sx={{ textAlign: "center" }}>
              <Typography sx={{ fontWeight: 900, fontSize: "2rem", background: "linear-gradient(135deg,#c7d300,#f5ff8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{s.value}</Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", mt: 0.4 }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ══ LIGHT CARDS SECTION ══ */}
      <Box sx={{
        background: "linear-gradient(160deg,#f8f9f2 0%,#ffffff 55%,#f2f5e8 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dot grid */}
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(199,211,0,0.16) 1px,transparent 1px)", backgroundSize: "30px 30px", zIndex: 0, pointerEvents: "none" }} />

        {/* Wave divider */}
        <Box sx={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" style={{ width: "100%", height: 50, display: "block" }}>
            <path d="M0,0 C480,50 960,0 1440,40 L1440,0 L0,0 Z" fill="#111827" />
          </svg>
        </Box>

        <Box className="cards-grid" sx={{ position: "relative", zIndex: 1, maxWidth: 1300, mx: "auto", px: { xs: 2, md: 4 }, pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 10 } }}>

          {/* Section heading */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <Box sx={{ width: 4, height: 28, borderRadius: "2px", background: "linear-gradient(180deg,#c7d300,#9aa000)", flexShrink: 0 }} />
            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.4rem", md: "1.9rem" }, color: "#1a1a2e", lineHeight: 1.1 }}>
                {activeTab === "domestic" ? "Explore India" : "Global Destinations"}
              </Typography>
              <Typography sx={{ color: "#999", fontSize: "0.85rem" }}>
                {filtered.length} destination{filtered.length !== 1 ? "s" : ""}{search ? ` matching "${search}"` : ""}
              </Typography>
            </Box>
          </Box>

          {filtered.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <FlightTakeoffIcon sx={{ fontSize: 60, color: "rgba(199,211,0,0.3)", mb: 2 }} />
              <Typography sx={{ fontSize: "1.1rem", color: "#aaa", fontWeight: 600 }}>No results for "{search}"</Typography>
            </Box>
          ) : (
            <Box sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)", lg: "repeat(4,1fr)" },
              gap: 3,
            }}>
              {filtered.map((item, i) => (
                <DestCard key={i} item={item} isInternational={activeTab === "international"} />
              ))}
            </Box>
          )}

          {/* Bottom CTA */}
          <Box sx={{ mt: 8, background: "linear-gradient(135deg,#1a1a2e,#111827)", borderRadius: "24px", p: { xs: 4, md: 5 }, display: "flex", alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: 3, position: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", top: -50, right: -50, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(199,211,0,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" }, fontWeight: 900, color: "#fff", mb: 0.5 }}>Can't find your destination?</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.88rem" }}>We cover 200+ destinations worldwide. Our experts will plan a custom package just for you.</Typography>
            </Box>
            <Button component="a" href="https://wa.me/917736062244" target="_blank"
              startIcon={<WhatsAppIcon />}
              sx={{ position: "relative", zIndex: 1, background: "#25D366", color: "#fff", borderRadius: "14px", px: 3.5, py: 1.4, fontWeight: 700, fontSize: "0.9rem", textTransform: "none", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 8px 24px rgba(37,211,102,0.3)", "&:hover": { background: "#20ba5a", transform: "translateY(-2px)" }, transition: "all 0.3s ease" }}>
              Chat with Us
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
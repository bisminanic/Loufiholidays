import { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NearMeIcon from "@mui/icons-material/NearMe";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID  = "service_yk2uxzi";
const EMAILJS_TEMPLATE_ID = "template_jkhnpqi";
const EMAILJS_PUBLIC_KEY  = "vq9vZ1URcyhDJI62d";

const infoCards = [
  {
    icon: <LocationOnIcon sx={{ fontSize: 26 }} />,
    title: "Visit Us",
    lines: ["Chakalakkal Junction, Perumanoor Road,", "Hilton Lane, Thevara, Ernakulam.", "Pin: 682013, Kerala, India"],
    action: { label: "Get Directions", href: "https://maps.google.com/?q=Thevara,Ernakulam,Kerala,India" },
    accent: "#c7d300",
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 26 }} />,
    title: "Call Us",
    lines: ["+91 77360 62244"],
    action: { label: "Call Now", href: "tel:+917736062244" },
    accent: "#c7d300",
  },
  {
    icon: <EmailIcon sx={{ fontSize: 26 }} />,
    title: "Email Us",
    lines: ["info@loufiholidays.com"],
    action: { label: "Send Email", href: "mailto:info@loufiholidays.com" },
    accent: "#c7d300",
  },
  {
    icon: <WhatsAppIcon sx={{ fontSize: 26 }} />,
    title: "WhatsApp",
    lines: ["+91 77360 62244", "Chat with us instantly"],
    action: { label: "Chat Now", href: "https://wa.me/917736062244" },
    accent: "#25D366",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 26 }} />,
    title: "Working Hours",
    lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sunday: 10:00 AM – 4:00 PM"],
    accent: "#c7d300",
  },
];

// Dark section input styles
const inputSx = {
  "& .MuiOutlinedInput-root": {
    background: "rgba(255,255,255,0.06)",
    borderRadius: "14px",
    color: "#fff",
    fontSize: "0.9rem",
    "& fieldset": { borderColor: "rgba(199,211,0,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(199,211,0,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#c7d300", borderWidth: "2px" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.35)", fontSize: "0.875rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#c7d300" },
  "& input": { color: "#fff" },
  "& .MuiInputBase-inputMultiline": { color: "#fff" },
};

export default function ContactUs() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const bgCircle1 = useRef(null);
  const bgCircle2 = useRef(null);
  const bgCircle3 = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(heroRef.current, {
        yPercent: 28,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      // Blobs parallax
      gsap.to(bgCircle1.current, { y: -80, x: 30, ease: "none", scrollTrigger: { trigger: pageRef.current, start: "top top", end: "bottom top", scrub: 1.5 } });
      gsap.to(bgCircle2.current, { y: -120, x: -40, ease: "none", scrollTrigger: { trigger: pageRef.current, start: "top top", end: "bottom top", scrub: 2 } });
      gsap.to(bgCircle3.current, { y: -60, ease: "none", scrollTrigger: { trigger: pageRef.current, start: "top top", end: "bottom top", scrub: 1 } });
      // Entrance
      gsap.fromTo(".c-badge, .c-h1, .c-sub", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 1.1, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".info-card", { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: ".info-cards-row", start: "top 82%" } });
      gsap.fromTo(".form-box", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".form-box", start: "top 80%" } });
      gsap.fromTo(".map-box", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".map-box", start: "top 80%" } });
      gsap.fromTo(".cta-strip", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.4)", scrollTrigger: { trigger: ".cta-strip", start: "top 85%" } });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
      return;
    }
    setFormStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: form.name,
        subscriber_email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        to_email: "info@loufiholidays.com",
      }, EMAILJS_PUBLIC_KEY);
      setFormStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setShowModal(true);
    } catch (err) {
      console.error(err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <Box ref={pageRef} sx={{ minHeight: "100vh",  position: "relative", overflow: "hidden" }}>

      {/* ── SUCCESS MODAL ── */}
      {showModal && (
        <Box onClick={() => setShowModal(false)} sx={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
          <Box onClick={(e) => e.stopPropagation()}
            sx={{ background: "#fff", border: "2px solid rgba(199,211,0,0.3)", borderRadius: "28px", p: { xs: 4, md: 5 }, maxWidth: 440, width: "100%", textAlign: "center", position: "relative", boxShadow: "0 32px 80px rgba(0,0,0,0.15)", animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)", "@keyframes popIn": { from: { opacity: 0, transform: "scale(0.85) translateY(20px)" }, to: { opacity: 1, transform: "scale(1) translateY(0)" } } }}>
            <Box component="button" onClick={() => setShowModal(false)} sx={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex" }}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box sx={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(199,211,0,0.12)", border: "2px solid rgba(199,211,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3, animation: "pulse 2s ease-in-out infinite", "@keyframes pulse": { "0%,100%": { boxShadow: "0 0 0 0 rgba(199,211,0,0.3)" }, "50%": { boxShadow: "0 0 0 14px rgba(199,211,0,0)" } } }}>
              <CheckCircleIcon sx={{ fontSize: 42, color: "#c7d300" }} />
            </Box>
            <Typography sx={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1a2e", mb: 1 }}>Message Sent! 🎉</Typography>
            <Typography sx={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.7, mb: 3.5 }}>
              Thanks for reaching out to <Box component="span" sx={{ color: "#9aa000", fontWeight: 700 }}>Loufi Holidays</Box>. Our team will get back to you within 24 hours.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3.5 }}>
              <Box sx={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
              <FlightTakeoffIcon sx={{ color: "#c7d300", fontSize: 18 }} />
              <Box sx={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
            </Box>
            <Button onClick={() => setShowModal(false)} variant="contained" fullWidth
              sx={{ background: "linear-gradient(135deg, #c7d300, #9aa000)", color: "#1a1a2e", borderRadius: "14px", py: 1.4, fontWeight: 700, textTransform: "none", boxShadow: "0 8px 24px rgba(199,211,0,0.3)", "&:hover": { background: "linear-gradient(135deg, #dce84a, #c7d300)" } }}>
              Explore Holiday Packages →
            </Button>
          </Box>
        </Box>
      )}

      {/* ════════════════════════════════
          LIGHT SECTION — Hero + Cards
      ════════════════════════════════ */}
      <Box sx={{ background: "linear-gradient(160deg, #f8f9f2 0%, #ffffff 50%, #f2f5e8 100%)", position: "relative", overflow: "hidden", pb: { xs: 8, md: 10 } }}>

        {/* Light blobs */}
        <Box ref={bgCircle1} sx={{ position: "absolute", top: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,211,0,0.18) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
        <Box ref={bgCircle2} sx={{ position: "absolute", top: 200, left: -150, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,211,0,0.1) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
        <Box ref={bgCircle3} sx={{ position: "absolute", bottom: 0, right: 100, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(154,160,0,0.08) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
        {/* Dot grid */}
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, rgba(199,211,0,0.18) 1px, transparent 1px)`, backgroundSize: "32px 32px", zIndex: 0, pointerEvents: "none" }} />

        {/* Hero */}
        <Box ref={heroRef} sx={{ position: "relative", zIndex: 1, textAlign: "center", pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 8 }, px: 2 }}>
          <Box className="c-badge" sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, px: 2.5, py: 0.8, borderRadius: "30px", background: "rgba(199,211,0,0.15)", border: "1px solid rgba(199,211,0,0.35)", mb: 3 }}>
            <FlightTakeoffIcon sx={{ color: "#9aa000", fontSize: 18 }} />
            <Typography sx={{ color: "#7a8400", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Get In Touch</Typography>
          </Box>

          <Typography className="c-h1" sx={{ fontSize: { xs: "2.5rem", md: "4.2rem" }, fontWeight: 900, lineHeight: 1.1, color: "#1a1a2e", mb: 2 }}>
            Let's Plan Your
            <Box component="span" sx={{ display: "block", background: "linear-gradient(135deg, #9aa000, #c7d300)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Dream Journey
            </Box>
          </Typography>

          <Typography className="c-sub" sx={{ color: "#666", fontSize: "1rem", maxWidth: 520, mx: "auto", lineHeight: 1.8 }}>
            Have a question about a destination, visa, or package? Our experts are here to make your travel dreams a reality — reach out and we'll respond within 24 hours.
          </Typography>

          <Box sx={{ mt: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <Box sx={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #c7d300)" }} />
            <FlightTakeoffIcon sx={{ color: "#c7d300", fontSize: 20 }} />
            <Box sx={{ width: 60, height: 2, background: "linear-gradient(90deg, #c7d300, transparent)" }} />
          </Box>
        </Box>

        {/* Info Cards */}
        <Box className="info-cards-row" sx={{ position: "relative", zIndex: 1, maxWidth: 1800, mx: "auto", px: { xs: 2, md: 4 }, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
          {infoCards.map((card, i) => (
            <Box key={i} className="info-card"
              onClick={() => card.action && window.open(card.action.href, "_blank")}
              sx={{
                flex: { xs: "1 1 calc(50% - 8px)", md: "1 1 calc(20% - 12px)" },
                minWidth: { xs: 140, md: 180 }, maxWidth: { xs: "100%", md: 240 },
                background: "#fff",
                border: "1.5px solid rgba(199,211,0,0.25)",
                borderRadius: "20px", p: 3,
                cursor: card.action ? "pointer" : "default",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
                "&:hover": { borderColor: "#c7d300", transform: "translateY(-6px)", boxShadow: "0 16px 40px rgba(199,211,0,0.2)", background: "linear-gradient(145deg,#fff,#fafef0)" },
              }}>
              <Box sx={{ width: 48, height: 48, borderRadius: "12px", background: `rgba(${card.accent === "#25D366" ? "37,211,102" : "199,211,0"},0.12)`, border: `1.5px solid rgba(${card.accent === "#25D366" ? "37,211,102" : "199,211,0"},0.3)`, display: "flex", alignItems: "center", justifyContent: "center", color: card.accent, mb: 2 }}>
                {card.icon}
              </Box>
              <Typography sx={{ color: "#9aa000", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", mb: 1 }}>{card.title}</Typography>
              {card.lines.map((line, j) => (
                <Typography key={j} sx={{ color: "#555", fontSize: "0.82rem", lineHeight: 1.7 }}>{line}</Typography>
              ))}
              {card.action && (
                <Typography sx={{ color: card.accent, fontSize: "0.78rem", fontWeight: 700, mt: 1.5 }}>{card.action.label} →</Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* ════════════════════════════════
          DARK SECTION — Form + Map + CTA
      ════════════════════════════════ */}
      <Box sx={{ background: "linear-gradient(165deg, #0d1117 0%, #111827 50%, #0d1117 100%)", position: "relative", overflow: "hidden", pt: { xs: 8, md: 10 }, pb: { xs: 8, md: 10 } }}>

        {/* Dark dot grid */}
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, rgba(199,211,0,0.07) 1px, transparent 1px)`, backgroundSize: "28px 28px", zIndex: 0, pointerEvents: "none" }} />
        {/* Dark glow orbs */}
        <Box sx={{ position: "absolute", top: -100, right: -100, width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,211,0,0.07) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: 100, left: -100, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,211,0,0.05) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

        {/* Wave divider at top */}
        <Box sx={{ position: "absolute", top: -2, left: 0, right: 0, zIndex: 1, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }}>
            <path d="M0,0 C360,60 1080,0 1440,50 L1440,0 L0,0 Z" fill="#f2f5e8" />
          </svg>
        </Box>

        <Box sx={{ position: "relative", zIndex: 2, maxWidth: 1300, mx: "auto", px: { xs: 2, md: 4 } }}>

          {/* Section label */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, fontWeight: 800, color: "#fff", mb: 1 }}>
              Drop Us a{" "}
              <Box component="span" sx={{ background: "linear-gradient(135deg, #c7d300, #f5ff8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Message
              </Box>
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
              We typically reply within a few hours during business hours.
            </Typography>
          </Box>

          {/* Form + Map */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 4, alignItems: "stretch" }}>

            {/* FORM */}
            <Box className="form-box"
              sx={{
                flex: "1 1 55%",
                background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(199,211,0,0.18)",
                borderRadius: "28px",
                p: { xs: 3, md: 5 },
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
              }}>
              <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", mb: 0.5 }}>Send Us a Message</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem" }}>Fill in the form and we'll get back to you shortly.</Typography>
              </Box>
              <Box sx={{ height: 3, background: "linear-gradient(90deg, #c7d300, #9aa000, transparent)", borderRadius: "2px", mb: 4 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                  <TextField fullWidth label="Your Name *" name="name" value={form.name} onChange={handleChange} sx={inputSx} />
                  <TextField fullWidth label="Email Address *" name="email" type="email" value={form.email} onChange={handleChange} sx={inputSx} />
                </Box>
                <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                  <TextField fullWidth label="Phone Number" name="phone" value={form.phone} onChange={handleChange} sx={inputSx} />
                  <TextField fullWidth label="Subject" name="subject" value={form.subject} onChange={handleChange} sx={inputSx} />
                </Box>
                <TextField fullWidth label="Your Message *" name="message" value={form.message} onChange={handleChange} multiline rows={5} sx={inputSx} />

                {formStatus === "error" && (
                  <Typography sx={{ color: "#ff4d4f", fontSize: "0.82rem" }}>Please fill in Name, Email and Message fields.</Typography>
                )}

                <Button variant="contained" onClick={handleSubmit} disabled={formStatus === "sending"} endIcon={formStatus === "sending" ? null : <NearMeIcon />}
                  sx={{
                    alignSelf: "flex-start",
                    background: "linear-gradient(135deg, #c7d300, #9aa000)",
                    color: "#1a1a2e", borderRadius: "14px", px: 4, py: 1.5,
                    fontWeight: 700, fontSize: "0.95rem", textTransform: "none",
                    boxShadow: "0 8px 24px rgba(199,211,0,0.25)",
                    "&:hover": { background: "linear-gradient(135deg, #dce84a, #c7d300)", transform: "translateY(-2px)", boxShadow: "0 12px 30px rgba(199,211,0,0.4)" },
                    "&.Mui-disabled": { background: "#c7d300", color: "#1a1a2e", opacity: 0.7 },
                    transition: "all 0.3s ease",
                  }}>
                  {formStatus === "sending" ? "Sending…" : "Send Message"}
                </Button>
              </Box>
            </Box>

            {/* MAP */}
            <Box className="map-box"
              sx={{
                flex: "1 1 45%",
                borderRadius: "28px",
                overflow: "hidden",
                border: "1px solid rgba(199,211,0,0.2)",
                minHeight: { xs: 300, lg: "auto" },
                position: "relative",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}>
              <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 10, background: "rgba(13,17,23,0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(199,211,0,0.3)", borderRadius: "12px", px: 2, py: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon sx={{ color: "#c7d300", fontSize: 18 }} />
                <Typography sx={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>Loufi Holidays, Thevara</Typography>
              </Box>
              <iframe
                title="Loufi Holidays Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.167394564491!2d76.29557731455226!3d9.959823892913686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0872b3ffffffff%3A0x1!2sChakalakkal+Junction%2C+Perumanoor+Road%2C+Hilton+Lane%2C+Thevara%2C+Ernakulam%2C+Kerala+682013!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%" height="100%"
                style={{ border: 0, minHeight: "420px", display: "block", filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.05)" }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Box>

          {/* CTA Strip */}
          <Box className="cta-strip"
            sx={{
              mt: 6,
              background: "linear-gradient(135deg, rgba(199,211,0,0.12), rgba(199,211,0,0.04))",
              border: "1px solid rgba(199,211,0,0.2)",
              borderRadius: "24px",
              p: { xs: 4, md: 5 },
              display: "flex",
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(8px)",
            }}>
            <Box sx={{ position: "absolute", top: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,211,0,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography sx={{ fontSize: { xs: "1.3rem", md: "1.6rem" }, fontWeight: 800, color: "#fff", mb: 0.5 }}>Prefer to chat instantly?</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem" }}>Our travel experts are available on WhatsApp — get answers in minutes.</Typography>
            </Box>
            <Button component="a" href="https://wa.me/917736062244" target="_blank" rel="noopener noreferrer"
              startIcon={<WhatsAppIcon />} variant="contained"
              sx={{
                position: "relative", zIndex: 1,
                background: "#25D366", color: "#fff", borderRadius: "14px",
                px: 3.5, py: 1.5, fontWeight: 700, fontSize: "0.95rem",
                textTransform: "none", whiteSpace: "nowrap", flexShrink: 0,
                boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
                "&:hover": { background: "#20ba5a", transform: "translateY(-2px)", boxShadow: "0 12px 30px rgba(37,211,102,0.4)" },
                transition: "all 0.3s ease",
              }}>
              Chat on WhatsApp
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
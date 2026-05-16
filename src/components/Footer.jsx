import { Box, Typography, IconButton, Divider, Button } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import Logo from '../assets/loufibgblack.png';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
const quickLinks = ['Holiday Packages', 'Beach Escapes', 'Honeymoon Trips', 'Group Tours', 'Luxury Holidays', 'Weekend Getaways'];
const visaLinks = ['Tourist Visa', 'Business Visa', 'Student Visa', 'Work Permit', 'Express Visa', 'Visa Consultation'];
const destinations = ['Dubai', 'Thailand', 'Maldives', 'Bali', 'Switzerland', 'Singapore', 'Japan', 'Turkey'];
// ── EmailJS config ──────────────────────────────────────────

const EMAILJS_SERVICE_ID  = 'service_43k5e4v';
const EMAILJS_TEMPLATE_ID = 'template_jkhnpqi';
const EMAILJS_PUBLIC_KEY  = 'vq9vZ1URcyhDJI62d';
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
 
  const handleSubscribe = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          subscriber_email: email,       // used in your EmailJS template
          to_email: 'info@loufiholidays.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 4000);
  };
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(165deg, #0d1117 0%, #111827 50%, #0d1117 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <Box sx={{ height: 3, background: 'linear-gradient(90deg, transparent, #c7d300, #9aa000, #c7d300, transparent)' }} />

      {/* Decorative world map dot-grid background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(199,211,0,0.08) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Glowing orb top-right */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(199,211,0,0.07) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Newsletter Banner */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1300,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          pt: 8,
          pb: 6,
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, rgba(199,211,0,0.12) 0%, rgba(199,211,0,0.05) 100%)',
            border: '1px solid rgba(199,211,0,0.2)',
            borderRadius: '24px',
            p: { xs: 3, md: 5 },
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            mb: 6,
            backdropFilter: 'blur(8px)',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <FlightTakeoffIcon sx={{ color: '#c7d300', fontSize: 28 }} />
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: '#c7d300',
                  textTransform: 'uppercase',
                }}
              >
                Travel Insider
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 800, color: '#fff', lineHeight: 1.2, mb: 0.5 }}
            >
              Exclusive Deals, Delivered First
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
              Join 50,000+ travelers getting handpicked offers straight to their inbox.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              borderRadius: '16px',
              px: 1,
              py: 0.8,
              width: { xs: '100%', md: 420 },
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                disabled={status === 'sending' || status === 'success'}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '0.9rem',
                  color: '#1a1a2e',
                  paddingLeft: '12px',
                  paddingRight: '8px',
                }}
              />
            <Button
              variant="contained"
              endIcon={<SendIcon sx={{ fontSize: '15px !important' }} />}
              sx={{
                background: '#c7d300',
                color: '#111827',
                borderRadius: '12px',
                px: 2.2,
                py: 0.9,
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxShadow: 'none',
                '&:hover': { background: '#dce84a', boxShadow: 'none' },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>

        {/* Main Footer — flex row, no MUI Grid */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 0 },
            alignItems: 'flex-start',
          }}
        >
          {/* ── Col 1: Brand ── */}
          <Box sx={{ flex: '0 0 26%', pr: { md: 4 } }}>
            <Box sx={{ mb: 2 }}>
              <img src={Logo} alt="Loufi" style={{ height: 48, width: 'auto' }} />
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.9, fontSize: '0.875rem', mb: 3 }}>
              Your trusted partner for extraordinary holidays and seamless global visa services. We craft journeys that turn dreams into lifelong memories.
            </Typography>

            {/* Contact info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4, mb: 3 }}>
              {[
                { icon: <LocationOnIcon sx={{ fontSize: 15 }} />, text: 'Chakalakkal junction,perumanoor road, Hilton lane, Thevara, Ernakulam. Pin:682013' },
                { icon: <PhoneIcon sx={{ fontSize: 15 }} />, text: '+91 77360 62244' },
                { icon: <EmailIcon sx={{ fontSize: 15 }} />, text: 'info@loufiholidays' },
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 30, height: 30, borderRadius: '8px', background: 'rgba(199,211,0,0.1)', border: '1px solid rgba(199,211,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c7d300', flexShrink: 0 }}>
                    {item.icon}
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{item.text}</Typography>
                </Box>
              ))}
            </Box>

            {/* Social Icons */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {[
                { Icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/loufiholidays?igsh=MW44NG41Zmk3bnA3cw==' },
                { Icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com' },
                { Icon: TwitterIcon, label: 'Twitter', href: 'https://www.twitter.com' },
                { Icon: YouTubeIcon, label: 'YouTube', href: 'https://www.youtube.com' },
                { Icon: WhatsAppIcon, label: 'WhatsApp', href: 'https://wa.me/917736062244' },
              ].map(({ Icon, label, href }) => (
                <IconButton key={label} aria-label={label} component="a" href={href} target="_blank" rel="noopener noreferrer" sx={{ width: 36, height: 36, background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', '&:hover': { background: 'rgba(199,211,0,0.12)', color: '#c7d300', borderColor: 'rgba(199,211,0,0.3)', transform: 'translateY(-3px)' }, transition: 'all 0.25s ease' }}>
                  <Icon sx={{ fontSize: 17 }} />
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* ── Col 2: Holidays ── */}
          <Box sx={{ flex: '0 0 22%', px: { md: 3 } }}>
            <Typography sx={{ color: '#c7d300', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', mb: 2.5 }}>
              Holidays
            </Typography>
            {quickLinks.map((link) => (
              <Box key={link} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.4, cursor: 'pointer' }}>
                <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: '#c7d300', opacity: 0.4, flexShrink: 0 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.865rem', '&:hover': { color: '#c7d300' }, transition: 'color 0.2s ease' }}>
                  {link}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* ── Col 3: Visa Services ── */}
          <Box sx={{ flex: '0 0 22%', px: { md: 3 } }}>
            <Typography sx={{ color: '#c7d300', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', mb: 2.5 }}>
              Visa Services
            </Typography>
            {visaLinks.map((link) => (
              <Box key={link} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.4, cursor: 'pointer' }}>
                <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: '#c7d300', opacity: 0.4, flexShrink: 0 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.865rem', '&:hover': { color: '#c7d300' }, transition: 'color 0.2s ease' }}>
                  {link}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* ── Col 4: Top Destinations ── */}
          <Box sx={{ flex: '1 1 30%', pl: { md: 3 } }}>
            <Typography sx={{ color: '#c7d300', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', mb: 2.5 }}>
              Top Destinations
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3.5 }}>
              {destinations.map((dest) => (
                <Box key={dest} sx={{ px: 1.4, py: 0.55, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s ease', '&:hover': { background: 'rgba(199,211,0,0.1)', borderColor: 'rgba(199,211,0,0.3)', color: '#c7d300', transform: 'translateY(-2px)' } }}>
                  {dest}
                </Box>
              ))}
            </Box>

            {/* Trust badges */}
            <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1.5 }}>
              Trusted & Certified
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {['IATA', 'ATOL', 'ISO 9001'].map((badge) => (
                <Box key={badge} sx={{ px: 1.4, py: 0.5, borderRadius: '6px', border: '1px solid rgba(199,211,0,0.25)', background: 'rgba(199,211,0,0.05)', fontSize: '0.72rem', fontWeight: 700, color: '#c7d300', letterSpacing: '0.06em' }}>
                  {badge}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 5 }} />

        {/* Bottom bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem' }}>
            © 2025 Loufi Holidays & Global Visa. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
              <Typography
                key={i}
                sx={{
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  '&:hover': { color: '#c7d300' },
                  transition: 'color 0.2s ease',
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          <IconButton
            onClick={scrollToTop}
            aria-label="Scroll to top"
            sx={{
              width: 42, height: 42,
              background: 'linear-gradient(135deg, #c7d300, #9aa000)',
              color: '#111827',
              borderRadius: '12px',
              '&:hover': {
                background: 'linear-gradient(135deg, #dce84a, #c7d300)',
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(199,211,0,0.35)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowUpwardIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
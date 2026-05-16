import React, { useEffect, useRef } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Button, Avatar, AvatarGroup, Grid
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: 'Explorer Pack',
    tagline: 'For the curious wanderer',
    price: 799,
    duration: '5 Days',
    emoji: '🎒',
    gradient: 'linear-gradient(145deg, #1a1a2e, #2d2d4a)',
    highlight: '#c7d300',
    features: ['3-Star Hotels', 'Airport Transfers', 'City Tours', 'Travel Insurance'],
    popular: false,
    saving: null,
  },
  {
    name: 'Adventure Pack',
    tagline: 'Thrill-seekers rejoice',
    price: 1299,
    duration: '7 Days',
    emoji: '⛺',
    gradient: 'linear-gradient(145deg, #c7d300, #9aa000)',
    highlight: '#1a1a2e',
    features: ['4-Star Hotels', 'Adventure Activities', 'All Meals', 'Guided Tours', 'Travel Insurance', 'Priority Support'],
    popular: true,
    saving: '25%',
  },
  {
    name: 'Luxury Pack',
    tagline: 'Indulge in the extraordinary',
    price: 2999,
    duration: '10 Days',
    emoji: '👑',
    gradient: 'linear-gradient(145deg, #1a1a2e, #2d2d4a)',
    highlight: '#c7d300',
    features: ['5-Star Resorts', 'Private Transfers', 'Gourmet Dining', 'Spa Access', 'Concierge Service', 'Premium Lounge'],
    popular: false,
    saving: null,
  },
];

const whyUs = [
  { icon: '✈️', title: 'Best Price Guarantee', desc: "Find it cheaper? We'll match and beat it" },
  { icon: '🔒', title: 'Secure Booking', desc: 'Your payments are always protected' },
  { icon: '🌍', title: '200+ Destinations', desc: 'The world is your playground' },
  { icon: '⭐', title: '4.9/5 Rating', desc: 'Trusted by 100k+ happy travelers' },
];

export default function Packages() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pkg-header',
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.3, ease: 'power2.out',
          scrollTrigger: { trigger: '.pkg-header', start: 'top 85%' },
        }
      );
      gsap.fromTo(
        '.pkg-card',
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.28, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.pkg-cards', start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.why-item',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.22, duration: 1.0, ease: 'power2.out',
          scrollTrigger: { trigger: '.why-section', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="packages"
      sx={{
        py: { xs: 8, md: 14 },
        background: '#f8f9f0',
        px: { xs: 2, md: 4 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%', left: '50%',
          transform: 'translateX(-50%)',
          width: 800, height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(199,211,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ maxWidth: 1300, mx: 'auto' }}>
        {/* Header */}
        <Box className="pkg-header" sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="🎁 OUR PACKAGES"
            sx={{
              background: 'rgba(199,211,0,0.15)', color: '#7a8a00',
              fontWeight: 700, letterSpacing: '0.08em', mb: 2,
            }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, color: '#1a1a2e', mb: 2 }}>
            Choose Your{' '}
            <Box component="span" sx={{ color: '#c7d300' }}>Perfect Package</Box>
          </Typography>
          <Typography variant="body1" sx={{ color: '#888', maxWidth: 500, mx: 'auto' }}>
            Tailored travel experiences for every budget and style
          </Typography>
        </Box>

        {/* Package Cards */}
        <Grid container spacing={3} className="pkg-cards" alignItems="stretch">
          {packages.map((pkg) => (
            <Grid item xs={12} md={4} key={pkg.name}>
              <Card
                className="pkg-card"
                sx={{
                  height: '100%',
                  background: pkg.gradient,
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: pkg.popular
                      ? '0 24px 64px rgba(199,211,0,0.3)'
                      : '0 24px 64px rgba(0,0,0,0.2)',
                  },
                  border: pkg.popular ? `2px solid ${pkg.highlight}` : '2px solid transparent',
                }}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <Chip
                    icon={<LocalOfferIcon sx={{ fontSize: 14, color: '#1a1a2e !important' }} />}
                    label="MOST POPULAR"
                    sx={{
                      position: 'absolute',
                      top: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#c7d300',
                      color: '#1a1a2e',
                      fontWeight: 800,
                      fontSize: '0.7rem',
                      letterSpacing: '0.05em',
                      boxShadow: '0 4px 16px rgba(199,211,0,0.4)',
                      zIndex: 10,
                    }}
                  />
                )}

                <CardContent sx={{ p: 4 }}>
                  {/* Package Header */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ fontSize: '2.5rem', mb: 2 }}>{pkg.emoji}</Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: pkg.highlight }}>
                          {pkg.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: `${pkg.highlight}80`, mt: 0.5 }}>
                          {pkg.tagline}
                        </Typography>
                      </Box>
                      {pkg.saving && (
                        <Chip
                          label={`Save ${pkg.saving}`}
                          size="small"
                          sx={{
                            background: 'rgba(255,255,255,0.2)',
                            color: pkg.highlight,
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            border: `1px solid ${pkg.highlight}40`,
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Price */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                      <Typography variant="caption" sx={{ color: `${pkg.highlight}80` }}>from</Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 900,
                          color: pkg.highlight,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        ${pkg.price.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ color: `${pkg.highlight}80` }}>
                        / person
                      </Typography>
                    </Box>
                    <Chip
                      label={`📅 ${pkg.duration}`}
                      size="small"
                      sx={{
                        mt: 1,
                        background: `${pkg.highlight}15`,
                        color: pkg.highlight,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        border: `1px solid ${pkg.highlight}30`,
                      }}
                    />
                  </Box>

                  {/* Features */}
                  <Box sx={{ mb: 4 }}>
                    {pkg.features.map((feat) => (
                      <Box key={feat} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <CheckCircleIcon sx={{ fontSize: 18, color: pkg.highlight, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: `${pkg.highlight}cc`, fontWeight: 500 }}>
                          {feat}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* CTA */}
                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      background: pkg.popular
                        ? 'rgba(26,26,46,0.9)'
                        : 'linear-gradient(135deg, #c7d300, #9aa000)',
                      color: pkg.popular ? '#c7d300' : '#1a1a2e',
                      fontWeight: 700,
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '0.95rem',
                      boxShadow: 'none',
                      '&:hover': {
                        background: pkg.popular
                          ? '#c7d300'
                          : 'rgba(26,26,46,0.9)',
                        color: pkg.popular ? '#1a1a2e' : '#c7d300',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    Get This Package
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Why Us */}
        <Box className="why-section" sx={{ mt: 12 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, color: '#1a1a2e', mb: 6 }}>
            Why Choose <Box component="span" sx={{ color: '#c7d300' }}>TravelGo?</Box>
          </Typography>
          <Grid container spacing={3}>
            {whyUs.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <Box
                  className="why-item"
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    background: 'white',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 36px rgba(199,211,0,0.15)',
                      borderBottom: '3px solid #c7d300',
                    },
                  }}
                >
                  <Box sx={{ fontSize: '2.5rem', mb: 2 }}>{item.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#888', lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Avatar, Rating, Grid,
  TextField, Button, Chip, IconButton
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SendIcon from '@mui/icons-material/Send';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Travel Blogger',
    avatar: '👩‍🦰',
    rating: 5,
    text: 'TravelGo completely transformed how I plan my adventures. The packages are outstanding value and the 24/7 support made me feel safe throughout my solo trip to Southeast Asia.',
    destination: 'Bali, Indonesia',
    date: 'March 2025',
  },
  {
    name: 'Marcus Chen',
    role: 'Photographer',
    avatar: '👨‍💻',
    rating: 5,
    text: 'Booked the Luxury Pack for our honeymoon in the Maldives. Every single detail was perfect — from the overwater villa to the private dining. Worth every penny!',
    destination: 'Maldives',
    date: 'January 2025',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Digital Nomad',
    avatar: '👩‍💼',
    rating: 5,
    text: "As someone who travels constantly, I've tried many agencies. TravelGo stands out for their attention to detail and incredible destinations. Kyoto was magical!",
    destination: 'Kyoto, Japan',
    date: 'April 2025',
  },
  {
    name: 'James Patel',
    role: 'Adventure Seeker',
    avatar: '🧔',
    rating: 5,
    text: 'The Adventure Pack to Machu Picchu was life-changing. The guided tours, the accommodations, and the activities were all top-notch. Already planning my next trip!',
    destination: 'Peru',
    date: 'February 2025',
  },
];

export default function TestimonialsAndNewsletter() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-header',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: 'power2.out', scrollTrigger: { trigger: '.testimonial-header', start: 'top 85%' } }
      );
      gsap.fromTo(
        '.testimonial-card',
        { y: 80, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.22, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%' } }
      );
      gsap.fromTo(
        '.newsletter-box',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: '.newsletter-box', start: 'top 85%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = () => {
    if (email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => { setSubscribed(false); setEmail(''); }, 3000);
    }
  };

  return (
    <Box ref={sectionRef}>
      {/* Testimonials */}
      <Box
        id="experiences"
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #ffffff 0%, #f8f9f0 100%)',
          px: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 1300, mx: 'auto' }}>
          <Box className="testimonial-header" sx={{ textAlign: 'center', mb: 7 }}>
            <Chip
              label="💬 TESTIMONIALS"
              sx={{
                background: 'rgba(199,211,0,0.15)', color: '#7a8a00',
                fontWeight: 700, letterSpacing: '0.08em', mb: 2,
              }}
            />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, color: '#1a1a2e' }}>
              What Our{' '}
              <Box component="span" sx={{ color: '#c7d300' }}>Travelers Say</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: '#888', mt: 1 }}>
              Real stories from real adventures
            </Typography>
          </Box>

          <Grid container spacing={3} className="testimonials-grid">
            {testimonials.map((t, i) => (
              <Grid item xs={12} sm={6} key={t.name}>
                <Card
                  className="testimonial-card"
                  sx={{
                    height: '100%',
                    p: 1,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 48px rgba(199,211,0,0.15)',
                      borderLeft: '4px solid #c7d300',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <FormatQuoteIcon
                      sx={{
                        fontSize: 48, color: '#c7d300', opacity: 0.3,
                        position: 'absolute', top: 16, right: 16,
                      }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                      <Avatar
                        sx={{
                          width: 52, height: 52, fontSize: '1.5rem',
                          background: 'linear-gradient(135deg, #c7d300, #9aa000)',
                        }}
                      >
                        {t.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                          {t.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#999' }}>{t.role}</Typography>
                      </Box>
                    </Box>

                    <Rating
                      value={t.rating}
                      readOnly size="small"
                      sx={{ mb: 2, '& .MuiRating-iconFilled': { color: '#c7d300' } }}
                    />

                    <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8, mb: 2.5, fontStyle: 'italic' }}>
                      "{t.text}"
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={`📍 ${t.destination}`} size="small"
                        sx={{ background: 'rgba(199,211,0,0.1)', color: '#7a8a00', fontSize: '0.72rem', fontWeight: 600 }} />
                      <Chip label={t.date} size="small"
                        sx={{ background: '#f5f5f5', color: '#999', fontSize: '0.72rem' }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Stats Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
          py: 8, px: { xs: 2, md: 4 },
        }}
      >
        <Grid container spacing={2} sx={{ maxWidth: 1000, mx: 'auto' }} justifyContent="center">
          {[
            { val: '500K+', label: 'Happy Travelers' },
            { val: '200+', label: 'Destinations' },
            { val: '98%', label: 'Satisfaction Rate' },
            { val: '15+', label: 'Years Experience' },
          ].map((s) => (
            <Grid item xs={6} md={3} key={s.label}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #c7d300, #ffffff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.val}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5 }}>
                  {s.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Newsletter */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, background: '#f8f9f0' }}>
        <Box
          className="newsletter-box"
          sx={{
            maxWidth: 750,
            mx: 'auto',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
            borderRadius: 6,
            p: { xs: 4, md: 7 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative glows */}
          <Box sx={{
            position: 'absolute', width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(199,211,0,0.15) 0%, transparent 70%)',
            top: -100, right: -100, pointerEvents: 'none',
          }} />
          <Box sx={{
            position: 'absolute', width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(199,211,0,0.1) 0%, transparent 70%)',
            bottom: -80, left: -60, pointerEvents: 'none',
          }} />

          <Typography variant="h6" sx={{ color: '#c7d300', fontWeight: 700, mb: 1, letterSpacing: '0.1em' }}>
            ✈️ STAY INSPIRED
          </Typography>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            Get Exclusive Travel Deals
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 5, lineHeight: 1.7 }}>
            Subscribe to our newsletter and never miss a deal.
            Early access to flash sales, destination guides, and more.
          </Typography>

          {subscribed ? (
            <Box
              sx={{
                py: 2.5, px: 5, background: 'rgba(199,211,0,0.15)',
                borderRadius: 50, border: '1px solid rgba(199,211,0,0.3)',
                display: 'inline-flex', alignItems: 'center', gap: 1,
              }}
            >
              <Typography sx={{ color: '#c7d300', fontWeight: 700 }}>
                🎉 You're subscribed! Welcome aboard.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                maxWidth: 520, mx: 'auto',
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: 50,
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover fieldset': { borderColor: '#c7d300' },
                    '&.Mui-focused fieldset': { borderColor: '#c7d300', borderWidth: 2 },
                  },
                  '& input::placeholder': { color: 'rgba(255,255,255,0.4)' },
                  '& input': { color: 'white' },
                }}
              />
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubscribe}
                sx={{
                  background: 'linear-gradient(135deg, #c7d300, #9aa000)',
                  color: '#1a1a2e',
                  fontWeight: 700,
                  px: 4,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #d9e633, #c7d300)',
                    boxShadow: '0 8px 24px rgba(199,211,0,0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          )}

          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', mt: 3, display: 'block' }}>
            No spam, ever. Unsubscribe anytime.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

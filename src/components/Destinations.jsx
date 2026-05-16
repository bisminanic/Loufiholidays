import React, { useEffect, useRef, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Chip,
  Button, IconButton, Rating
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: 'Santorini',
    country: 'Greece',
    price: '$1,299',
    rating: 4.9,
    reviews: 2341,
    tag: 'Trending',
    emoji: '🏛️',
    bg: 'linear-gradient(145deg, #e8f4fd, #c8e6f7)',
    accent: '#4a9eca',
    description: 'White-washed cliffs, stunning sunsets, and crystalline waters',
    duration: '7 nights',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    price: '$1,849',
    rating: 4.8,
    reviews: 1892,
    tag: 'Culture',
    emoji: '⛩️',
    bg: 'linear-gradient(145deg, #fce4ec, #f8bbd0)',
    accent: '#e91e8c',
    description: 'Ancient temples, cherry blossoms, and timeless traditions',
    duration: '10 nights',
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    price: '$899',
    rating: 4.7,
    reviews: 3104,
    tag: 'Popular',
    emoji: '🌴',
    bg: 'linear-gradient(145deg, #e8f5e9, #c8e6c9)',
    accent: '#43a047',
    description: 'Lush rice terraces, vibrant culture, and spiritual serenity',
    duration: '8 nights',
  },
  {
    name: 'Maldives',
    country: 'Indian Ocean',
    price: '$2,499',
    rating: 5.0,
    reviews: 987,
    tag: 'Luxury',
    emoji: '🏝️',
    bg: 'linear-gradient(145deg, #e3f2fd, #bbdefb)',
    accent: '#1565c0',
    description: 'Overwater bungalows, pristine coral reefs, and pure bliss',
    duration: '6 nights',
  },
  {
    name: 'Machu Picchu',
    country: 'Peru',
    price: '$1,649',
    rating: 4.9,
    reviews: 1456,
    tag: 'Adventure',
    emoji: '🏔️',
    bg: 'linear-gradient(145deg, #fff8e1, #ffecb3)',
    accent: '#f9a825',
    description: 'Ancient Inca citadel rising above the clouds',
    duration: '9 nights',
  },
  {
    name: 'Amalfi Coast',
    country: 'Italy',
    price: '$1,399',
    rating: 4.8,
    reviews: 2187,
    tag: 'Romantic',
    emoji: '🍋',
    bg: 'linear-gradient(145deg, #f3e5f5, #e1bee7)',
    accent: '#8e24aa',
    description: 'Cliffside villages, azure seas, and la dolce vita',
    duration: '7 nights',
  },
];

const tagColors = {
  Trending: '#c7d300',
  Culture: '#e91e8c',
  Popular: '#43a047',
  Luxury: '#1565c0',
  Adventure: '#f9a825',
  Romantic: '#8e24aa',
};

export default function Destinations() {
  const sectionRef = useRef(null);
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);

  const toggleFav = (name) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dest-header',
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.3, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.dest-header',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.dest-card',
        { y: 100, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.dest-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="destinations"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #f8f9f0 0%, #ffffff 100%)',
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1300, mx: 'auto' }}>
        {/* Header */}
        <Box className="dest-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Chip
              label="🌍 TOP DESTINATIONS"
              sx={{
                background: 'rgba(199,211,0,0.15)',
                color: '#7a8a00',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                mb: 2,
              }}
            />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, color: '#1a1a2e' }}>
              Popular{' '}
              <Box component="span" sx={{ color: '#c7d300' }}>Destinations</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: '#888', mt: 1 }}>
              Handpicked destinations loved by thousands of travelers
            </Typography>
          </Box>
          <Button
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: '#1a1a2e',
              fontWeight: 600,
              border: '2px solid #e0e0e0',
              borderRadius: 50,
              px: 3, py: 1,
              '&:hover': { borderColor: '#c7d300', color: '#9aa000', background: 'rgba(199,211,0,0.05)' },
            }}
          >
            View All
          </Button>
        </Box>

        {/* Cards Grid */}
        <Grid container spacing={3} className="dest-grid">
          {destinations.map((dest, i) => (
            <Grid item xs={12} sm={6} md={4} key={dest.name}>
              <Card
                className="dest-card"
                onMouseEnter={() => setHoveredCard(dest.name)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  cursor: 'pointer',
                  background: dest.bg,
                  border: '1px solid transparent',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: hoveredCard === dest.name ? 'translateY(-10px) scale(1.02)' : 'none',
                  boxShadow: hoveredCard === dest.name
                    ? `0 20px 48px ${dest.accent}30`
                    : '0 4px 20px rgba(0,0,0,0.06)',
                  '&:hover': {
                    borderColor: dest.accent + '40',
                  },
                  overflow: 'visible',
                  position: 'relative',
                }}
              >
                {/* Emoji Illustration */}
                <Box
                  sx={{
                    height: 180,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: hoveredCard === dest.name ? '6rem' : '5rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {dest.emoji}
                  {/* Decorative circles */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: 120, height: 120,
                      borderRadius: '50%',
                      background: `${dest.accent}15`,
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </Box>

                {/* Tag */}
                <Chip
                  label={dest.tag}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16, left: 16,
                    background: tagColors[dest.tag] || '#c7d300',
                    color: dest.tag === 'Luxury' || dest.tag === 'Romantic' ? '#fff' : '#1a1a2e',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    boxShadow: `0 4px 12px ${(tagColors[dest.tag] || '#c7d300')}50`,
                  }}
                />

                {/* Favorite */}
                <IconButton
                  onClick={(e) => { e.stopPropagation(); toggleFav(dest.name); }}
                  sx={{
                    position: 'absolute',
                    top: 12, right: 12,
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:hover': { background: 'white', transform: 'scale(1.15)' },
                    transition: 'transform 0.2s ease',
                    width: 36, height: 36,
                  }}
                >
                  {favorites.has(dest.name)
                    ? <FavoriteIcon sx={{ fontSize: 18, color: '#e91e63' }} />
                    : <FavoriteBorderIcon sx={{ fontSize: 18, color: '#999' }} />
                  }
                </IconButton>

                <CardContent sx={{ pt: 0, pb: '16px !important' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a2e' }}>{dest.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 14, color: '#999' }} />
                        <Typography variant="caption" sx={{ color: '#888' }}>{dest.country}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: dest.accent }}>
                        {dest.price}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#aaa' }}>per person</Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ color: '#666', mb: 2, lineHeight: 1.6 }}>
                    {dest.description}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={dest.rating} precision={0.1} size="small" readOnly
                        sx={{ '& .MuiRating-iconFilled': { color: '#c7d300' } }}
                      />
                      <Typography variant="caption" sx={{ color: '#888' }}>
                        ({dest.reviews.toLocaleString()})
                      </Typography>
                    </Box>
                    <Chip
                      label={`📅 ${dest.duration}`}
                      size="small"
                      sx={{ background: 'rgba(0,0,0,0.06)', fontSize: '0.7rem' }}
                    />
                  </Box>

                  {hoveredCard === dest.name && (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        background: `linear-gradient(135deg, ${dest.accent}, ${dest.accent}cc)`,
                        color: 'white',
                        fontWeight: 700,
                        py: 1,
                        borderRadius: 3,
                        animation: 'fadeIn 0.25s ease',
                        '@keyframes fadeIn': { from: { opacity: 0, y: 10 }, to: { opacity: 1, y: 0 } },
                      }}
                    >
                      Book Now →
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

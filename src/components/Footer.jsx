
import { Box, Typography, Grid, IconButton, Divider } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const footerLinks = {
  Company: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'],
  Destinations: ['Europe', 'Asia Pacific', 'Americas', 'Africa', 'Middle East'],
  Support: ['Help Center', 'Safety Info', 'Cancellation', 'FAQ', 'Community'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #111120 100%)',
        color: 'white',
        pt: 10, pb: 4,
        px: { xs: 2, md: 4 },
        position: 'relative',
      }}
    >
      {/* Decorative top border */}
      <Box
        sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #c7d300, #9aa000, #c7d300)',
        }}
      />

      <Box sx={{ maxWidth: 1300, mx: 'auto' }}>
        <Grid container spacing={6}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <Box
                sx={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c7d300, #9aa000)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(199,211,0,0.3)',
                }}
              >
                <FlightIcon sx={{ fontSize: 22, color: '#1a1a2e', transform: 'rotate(45deg)' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#c7d300' }}>
                TravelGo
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, mb: 3, maxWidth: 300 }}>
              Making the world accessible, one adventure at a time. Discover, explore, and create lasting memories with TravelGo.
            </Typography>
            {/* Social Icons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[InstagramIcon, TwitterIcon, FacebookIcon, YouTubeIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    width: 38, height: 38,
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    '&:hover': {
                      background: 'rgba(199,211,0,0.15)',
                      color: '#c7d300',
                      borderColor: '#c7d300',
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.25s ease',
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} sm={3} md={2} key={title}>
              <Typography
                variant="overline"
                sx={{ color: '#c7d300', fontWeight: 700, letterSpacing: '0.12em', mb: 2, display: 'block' }}
              >
                {title}
              </Typography>
              {links.map((link) => (
                <Typography
                  key={link}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.45)',
                    mb: 1.2,
                    cursor: 'pointer',
                    display: 'block',
                    '&:hover': { color: '#c7d300', pl: 0.5 },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 6 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2025 TravelGo. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)' }}>
              Made with ❤️ for explorers everywhere
            </Typography>
            <IconButton
              onClick={scrollToTop}
              sx={{
                width: 40, height: 40,
                background: 'linear-gradient(135deg, #c7d300, #9aa000)',
                color: '#1a1a2e',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(199,211,0,0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

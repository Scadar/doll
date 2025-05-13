import { Box, Container, Grid, Typography, Link, IconButton, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t('navigation.home'),
      items: [
        { name: t('home.hero.title'), path: '/' },
        { name: t('home.benefits.title'), path: '/#benefits' },
        { name: t('home.popular.title'), path: '/#popular' },
        { name: t('home.testimonials.title'), path: '/#testimonials' },
      ],
    },
    {
      title: t('navigation.catalog'),
      items: [
        { name: t('catalog.categories.cartoons'), path: '/catalog?category=cartoons' },
        { name: t('catalog.categories.fairytales'), path: '/catalog?category=fairytales' },
        { name: t('catalog.categories.superheroes'), path: '/catalog?category=superheroes' },
        { name: t('catalog.categories.animals'), path: '/catalog?category=animals' },
      ],
    },
    {
      title: t('navigation.about'),
      items: [
        { name: t('about.history.title'), path: '/about#history' },
        { name: t('about.mission.title'), path: '/about#mission' },
        { name: t('about.team.title'), path: '/about#team' },
        { name: t('about.faq.title'), path: '/about#faq' },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} justifyContent="space-between">
            {/* Company info */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {t('common.appName')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('home.about.description')}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    color="primary"
                    aria-label="telegram"
                    component="a"
                    href="https://t.me/kukladoll"
                    target="_blank"
                  >
                    <TelegramIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="whatsapp"
                    component="a"
                    href="https://wa.me/79123456789"
                    target="_blank"
                  >
                    <WhatsAppIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="phone"
                    component="a"
                    href="tel:+79123456789"
                  >
                    <PhoneIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Grid>

            {/* Links */}
            {footerLinks.map((section) => (
              <Grid size={{xs: 6, sm: 3, md: 2}} key={section.title}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {section.title}
                </Typography>
                <Box>
                  {section.items.map((item) => (
                    <Box key={item.name} sx={{ mb: 0.5 }}>
                      <Link
                        component={RouterLink}
                        to={item.path}
                        color="text.secondary"
                        underline="hover"
                        sx={{ display: 'block' }}
                      >
                        {item.name}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}

            {/* Contact info */}
            <Grid size={{xs: 12, sm: 6, md: 3}}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {t('contacts.title')}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    г. Нефтекамск, ул. Ленина, 123
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Link href="tel:+79123456789" color="text.secondary" underline="hover">
                    +7 (912) 345-67-89
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Link href="mailto:info@kuklaprazdnik.ru" color="text.secondary" underline="hover">
                    info@kuklaprazdnik.ru
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Copyright */}
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} {t('common.appName')}. {t('common.rights')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

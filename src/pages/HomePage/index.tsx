import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia, Avatar, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StyleIcon from '@mui/icons-material/Style';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessIcon from '@mui/icons-material/Business';
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';

const HomePage = () => {
  const { t } = useTranslation();

  // Mock data for popular costumes
  const popularCostumes = [
    {
      id: 1,
      name: 'Микки Маус',
      image: '/src/assets/bear.png',
      category: 'cartoons',
      price: 2000,
    },
    {
      id: 2,
      name: 'Человек-паук',
      image: '/src/assets/blue_rabbit.png',
      category: 'superheroes',
      price: 2500,
    },
    {
      id: 3,
      name: 'Эльза',
      image: '/src/assets/pink_rabbit.png',
      category: 'fairytales',
      price: 2200,
    },
    {
      id: 4,
      name: 'Лев',
      image: '/src/assets/panda.png',
      category: 'animals',
      price: 1800,
    },
  ];

  // Mock data for testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Анна К.',
      text: 'Заказывали Микки Мауса на день рождения сына. Дети были в восторге! Костюм очень качественный, аниматор отработал на все 100%.',
      avatar: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      name: 'Сергей П.',
      text: 'Брали костюм Человека-паука на выпускной в детском саду. Все прошло отлично, доставили вовремя, костюм чистый и аккуратный.',
      avatar: 'https://via.placeholder.com/50',
    },
    {
      id: 3,
      name: 'Елена В.',
      text: 'Спасибо за отличный праздник! Ростовая кукла Эльзы превзошла все ожидания. Будем обращаться еще!',
      avatar: 'https://via.placeholder.com/50',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        className="hero fade-in"
        sx={{
          position: 'relative',
          backgroundImage: 'linear-gradient(135deg, #6C63FF 0%, #FF6B6B 100%)',
          color: 'white',
          py: { xs: 10, md: 16 },
          textAlign: 'center',
          overflow: 'hidden',
          borderRadius: { xs: '0 0 30px 30px', md: '0 0 50px 50px' },
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            right: -80,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0,
          }}
        />

        {/* Character images */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: -60, md: 40 },
            bottom: { xs: -40, md: -20 },
            width: { xs: 150, md: 200 },
            height: { xs: 150, md: 200 },
            zIndex: 1,
            transform: 'rotate(-5deg)',
            transition: 'all 0.5s ease',
            '&:hover': {
              transform: 'rotate(-5deg) translateY(-10px)',
            },
            display: { xs: 'none', sm: 'block' },

          }}
        >
          <img src="/src/assets/bear.png" alt="Character" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10%' }} />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            right: { xs: -60, md: 40 },
            bottom: { xs: -40, md: -20 },
            width: { xs: 150, md: 200 },
            height: { xs: 150, md: 200 },
            zIndex: 1,
            transform: 'rotate(5deg)',
            transition: 'all 0.5s ease',
            '&:hover': {
              transform: 'rotate(5deg) translateY(-10px)',
            },
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <img src="/src/assets/panda.png" alt="Character" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10%' }} />
        </Box>

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box className="scale-in" sx={{ mb: 4 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{
                fontWeight: 800,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 3,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 4,
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: 2,
                }
              }}
            >
              {t('home.hero.title')}
            </Typography>
            <Typography 
              variant="h5"
              sx={{
                fontWeight: 400,
                textShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                lineHeight: 1.5,
              }}
            >
              {t('home.hero.subtitle')}
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/catalog"
              sx={{
                mt: 2,
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                background: 'white',
                color: 'primary.main',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 25px rgba(0, 0, 0, 0.2)',
                  background: 'white',
                }
              }}
            >
              {t('home.hero.cta')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 10 }} id="benefits">
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              position: 'relative',
              mb: 6,
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                bgcolor: 'primary.main',
                borderRadius: 2
              }
            }}
          >
            {t('home.benefits.title')}
          </Typography>
          <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        color: 'primary.main'
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ fontSize: 40, mr: 1.5 }} />
                      <Typography variant="h5" component="h3" fontWeight="600">
                        {t('home.benefits.items.quality.title')}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {t('home.benefits.items.quality.description')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        color: 'primary.main'
                      }}
                    >
                      <StyleIcon sx={{ fontSize: 40, mr: 1.5 }} />
                      <Typography variant="h5" component="h3" fontWeight="600">
                        {t('home.benefits.items.variety.title')}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {t('home.benefits.items.variety.description')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        color: 'primary.main'
                      }}
                    >
                      <AttachMoneyIcon sx={{ fontSize: 40, mr: 1.5 }} />
                      <Typography variant="h5" component="h3" fontWeight="600">
                        {t('home.benefits.items.price.title')}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {t('home.benefits.items.price.description')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        color: 'primary.main'
                      }}
                    >
                      <LocalShippingIcon sx={{ fontSize: 40, mr: 1.5 }} />
                      <Typography variant="h5" component="h3" fontWeight="600">
                        {t('home.benefits.items.delivery.title')}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {t('home.benefits.items.delivery.description')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Popular Costumes Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }} id="popular">
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h3" component="h2">
              {t('home.popular.title')}
            </Typography>
            <Button component={RouterLink} to="/catalog" color="primary">
              {t('home.popular.viewAll')}
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              {popularCostumes.map((costume) => (
                <Grid key={costume.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={costume.image}
                      alt={costume.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h3">
                        {costume.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t(`catalog.categories.${costume.category}`)}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                        {costume.price} ₽/час
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Button
                        component={RouterLink}
                        to={`/catalog/${costume.id}`}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        {t('product.details')}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box 
        sx={{ 
          py: 10,
          bgcolor: 'background.paper',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            bgcolor: 'primary.main',
            opacity: 0.05,
            zIndex: 0
          }
        }} 
        id="testimonials"
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              position: 'relative',
              mb: 6,
              color: 'text.primary',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                bgcolor: 'primary.main',
                borderRadius: 2
              }
            }}
          >
            {t('home.testimonials.title')}
          </Typography>
          <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Grid container spacing={4}>
              {testimonials.map((testimonial) => (
                <Grid key={testimonial.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      borderRadius: 3,
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      transition: 'all 0.3s ease',
                      overflow: 'visible',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, pt: 5 }}>
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          top: -20,
                          left: 20,
                          bgcolor: 'primary.main',
                          color: 'white',
                          borderRadius: '50%',
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        <FormatQuoteIcon />
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: 3, 
                          fontStyle: 'italic',
                          lineHeight: 1.6,
                          color: 'text.primary'
                        }}
                      >
                        {testimonial.text}
                      </Typography>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          pt: 2,
                          borderTop: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        <Avatar 
                          src={testimonial.avatar} 
                          sx={{ 
                            mr: 2,
                            width: 50,
                            height: 50,
                            border: '2px solid',
                            borderColor: 'primary.main'
                          }} 
                        />
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: 600,
                            color: 'text.primary'
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box 
        sx={{ 
          py: 10, 
          bgcolor: 'background.paper',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            bgcolor: 'primary.main',
            opacity: 0.03,
            zIndex: 0
          }
        }}
        id="about"
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              position: 'relative',
              mb: 6,
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                bgcolor: 'primary.main',
                borderRadius: 2
              }
            }}
          >
            {t('home.about.title')}
          </Typography>

          <Card
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
              }
            }}
          >
            <Grid container>
              {/* Left side - Image */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Box
                  sx={{
                    height: '100%',
                    minHeight: { xs: 250, md: '100%' },
                    bgcolor: 'primary.main',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4
                  }}
                >
                  <BusinessIcon 
                    sx={{ 
                      fontSize: 180, 
                      color: 'white',
                      opacity: 0.2,
                      position: 'absolute',
                      transform: 'rotate(-15deg)'
                    }} 
                  />
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
                      {t('home.about.since', { year: '2010' })}
                    </Typography>
                    <Typography variant="body1">
                      {t('home.about.experience')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Right side - Content */}
              <Grid size={{ xs: 12, md: 7 }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        color: 'primary.main'
                      }}
                    >
                      <InfoIcon sx={{ mr: 1 }} /> {t('home.about.mission.title')}
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      {t('home.about.description')}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        color: 'primary.main'
                      }}
                    >
                      <HistoryIcon sx={{ mr: 1 }} /> {t('home.about.history.title')}
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      {t('home.about.history.description', { year: '2010' })}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 4, textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={RouterLink}
                      to="/about"
                      size="large"
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        '&:hover': {
                          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                        }
                      }}
                    >
                      {t('home.about.more')}
                    </Button>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;

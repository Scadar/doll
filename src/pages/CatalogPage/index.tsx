import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Drawer,
  useMediaQuery,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const CatalogPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State for filters
  const [category, setCategory] = useState('all');
  const [ageGroup, setAgeGroup] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mock data for costumes
  const [costumes, setCostumes] = useState([
    {
      id: 1,
      name: 'Микки Маус',
      image: '/src/assets/bear.png',
      category: 'cartoons',
      ageGroup: 'preschool',
      price: 2000,
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Человек-паук',
      image: '/src/assets/blue_rabbit.png',
      category: 'superheroes',
      ageGroup: 'school',
      price: 2500,
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Эльза',
      image: '/src/assets/pink_rabbit.png',
      category: 'fairytales',
      ageGroup: 'preschool',
      price: 2200,
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Лев',
      image: '/src/assets/panda.png',
      category: 'animals',
      ageGroup: 'toddlers',
      price: 1800,
      isFavorite: false,
    },
    {
      id: 5,
      name: 'Бэтмен',
      image: '/src/assets/bear.png',
      category: 'superheroes',
      ageGroup: 'school',
      price: 2700,
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Минни Маус',
      image: '/src/assets/blue_rabbit.png',
      category: 'cartoons',
      ageGroup: 'preschool',
      price: 2000,
      isFavorite: false,
    },
    {
      id: 7,
      name: 'Белоснежка',
      image: '/src/assets/pink_rabbit.png',
      category: 'fairytales',
      ageGroup: 'preschool',
      price: 2100,
      isFavorite: false,
    },
    {
      id: 8,
      name: 'Тигр',
      image: '/src/assets/panda.png',
      category: 'animals',
      ageGroup: 'toddlers',
      price: 1900,
      isFavorite: false,
    },
  ]);

  // Filter costumes based on selected filters
  const filteredCostumes = costumes.filter((costume) => {
    const matchesCategory = category === 'all' || costume.category === category;
    const matchesAgeGroup = ageGroup === 'all' || costume.ageGroup === ageGroup;
    const matchesSearch = costume.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesAgeGroup && matchesSearch;
  });

  // Sort costumes based on selected sort option
  const sortedCostumes = [...filteredCostumes].sort((a, b) => {
    switch (sortBy) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'new':
        return b.id - a.id; // Assuming newer items have higher IDs
      default: // 'popular'
        return 0; // No sorting for popular (would be based on a popularity metric in a real app)
    }
  });

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setCostumes(
      costumes.map((costume) =>
        costume.id === id ? { ...costume, isFavorite: !costume.isFavorite } : costume
      )
    );
  };

  // Toggle filter drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Filter component
  const FiltersComponent = () => (
    <Box sx={{ p: isMobile ? 3 : 0 }}>
      {isMobile && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('catalog.filters.title')}
          </Typography>
          <IconButton 
            onClick={toggleDrawer}
            sx={{
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'background.paper',
                transform: 'rotate(90deg)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Box sx={{ 
        mb: 4,
        p: !isMobile ? 3 : 0,
        borderRadius: !isMobile ? '16px' : 0,
        bgcolor: !isMobile ? 'background.paper' : 'transparent',
        boxShadow: !isMobile ? '0 4px 20px rgba(0, 0, 0, 0.06)' : 'none',
      }}>
        <Typography 
          variant="subtitle1" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            '&::before': {
              content: '""',
              display: 'inline-block',
              width: '4px',
              height: '16px',
              mr: 1.5,
              borderRadius: '2px',
              bgcolor: 'primary.main',
            }
          }}
        >
          {t('catalog.filters.category')}
        </Typography>
        <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            displayEmpty
            sx={{
              borderRadius: '12px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: '2px',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: '12px',
                  mt: 1,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                }
              }
            }}
          >
            <MenuItem value="all">{t('catalog.categories.all')}</MenuItem>
            <MenuItem value="cartoons">{t('catalog.categories.cartoons')}</MenuItem>
            <MenuItem value="fairytales">{t('catalog.categories.fairytales')}</MenuItem>
            <MenuItem value="superheroes">{t('catalog.categories.superheroes')}</MenuItem>
            <MenuItem value="animals">{t('catalog.categories.animals')}</MenuItem>
            <MenuItem value="mascots">{t('catalog.categories.mascots')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ 
        mb: 4,
        p: !isMobile ? 3 : 0,
        borderRadius: !isMobile ? '16px' : 0,
        bgcolor: !isMobile ? 'background.paper' : 'transparent',
        boxShadow: !isMobile ? '0 4px 20px rgba(0, 0, 0, 0.06)' : 'none',
      }}>
        <Typography 
          variant="subtitle1" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            '&::before': {
              content: '""',
              display: 'inline-block',
              width: '4px',
              height: '16px',
              mr: 1.5,
              borderRadius: '2px',
              bgcolor: 'secondary.main',
            }
          }}
        >
          {t('catalog.filters.age')}
        </Typography>
        <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
          <Select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value as string)}
            displayEmpty
            sx={{
              borderRadius: '12px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main',
                borderWidth: '2px',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: '12px',
                  mt: 1,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                }
              }
            }}
          >
            <MenuItem value="all">{t('catalog.ageGroups.all')}</MenuItem>
            <MenuItem value="toddlers">{t('catalog.ageGroups.toddlers')}</MenuItem>
            <MenuItem value="preschool">{t('catalog.ageGroups.preschool')}</MenuItem>
            <MenuItem value="school">{t('catalog.ageGroups.school')}</MenuItem>
            <MenuItem value="teens">{t('catalog.ageGroups.teens')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ 
        mb: 3,
        p: !isMobile ? 3 : 0,
        borderRadius: !isMobile ? '16px' : 0,
        bgcolor: !isMobile ? 'background.paper' : 'transparent',
        boxShadow: !isMobile ? '0 4px 20px rgba(0, 0, 0, 0.06)' : 'none',
      }}>
        <Typography 
          variant="subtitle1" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            '&::before': {
              content: '""',
              display: 'inline-block',
              width: '4px',
              height: '16px',
              mr: 1.5,
              borderRadius: '2px',
              background: 'linear-gradient(to bottom, #FF6B6B, #6C63FF)',
            }
          }}
        >
          {t('catalog.filters.sort.title')}
        </Typography>
        <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as string)}
            displayEmpty
            sx={{
              borderRadius: '12px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: '2px',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: '12px',
                  mt: 1,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                }
              }
            }}
          >
            <MenuItem value="popular">{t('catalog.filters.sort.popular')}</MenuItem>
            <MenuItem value="priceAsc">{t('catalog.filters.sort.priceAsc')}</MenuItem>
            <MenuItem value="priceDesc">{t('catalog.filters.sort.priceDesc')}</MenuItem>
            <MenuItem value="new">{t('catalog.filters.sort.new')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isMobile && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={toggleDrawer}
          sx={{ 
            mt: 3,
            py: 1.5,
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(255, 107, 107, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 15px rgba(255, 107, 107, 0.4)',
            }
          }}
        >
          {t('common.apply')}
        </Button>
      )}
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box 
        sx={{ 
          mb: 5,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -16,
            left: 0,
            width: '100px',
            height: '4px',
            background: 'linear-gradient(to right, #FF6B6B, #6C63FF)',
            borderRadius: '2px',
          }
        }}
        className="fade-in"
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: '2.2rem', md: '2.75rem' },
            letterSpacing: '-0.02em',
          }}
        >
          {t('catalog.title')}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ 
            maxWidth: '600px',
            mb: 2,
            fontSize: { xs: '1rem', md: '1.1rem' },
          }}
        >
          {t('catalog.subtitle', 'Выберите идеальный костюм для вашего праздника из нашей коллекции')}
        </Typography>
      </Box>

      {/* Search and filter bar */}
      <Box 
        sx={{ 
          mb: 5,
          p: { xs: 2, md: 3 },
          borderRadius: '16px',
          backgroundColor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        }}
        className="scale-in"
      >
        <Grid container spacing={3} alignItems="center">
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 0 0 3px rgba(108, 99, 255, 0.2)',
                  }
                }
              }}
            />
          </Grid>
          {isMobile && (
            <Grid size={{xs: 12}}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={toggleDrawer}
                sx={{
                  borderRadius: '12px',
                  py: 1.2,
                  borderWidth: '2px',
                  borderColor: 'primary.main',
                  '&:hover': {
                    borderWidth: '2px',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px rgba(108, 99, 255, 0.2)',
                  }
                }}
              >
                {t('common.filter')}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {/* Filters for desktop */}
        {!isMobile && (
          <Grid size={{xs: 12, md: 3, lg: 2}}>
            <FiltersComponent />
          </Grid>
        )}

        {/* Costumes grid */}
        <Grid size={{xs: 12, sm: 12, md: 9, lg: 10}}>
          {sortedCostumes.length > 0 ? (
            <Grid container spacing={3} justifyContent="center">
              {sortedCostumes.map((costume) => (
                <Grid key={costume.id} size={{xs: 12, sm: 6, md: 4, lg: 3}}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 25px rgba(0, 0, 0, 0.12)',
                      }
                    }}
                    className="scale-in"
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="220"
                        image={costume.image}
                        alt={costume.name}
                        sx={{ 
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: 'background.paper',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'background.paper',
                            transform: 'scale(1.1)',
                          },
                        }}
                        onClick={() => toggleFavorite(costume.id)}
                      >
                        {costume.isFavorite ? (
                          <FavoriteIcon color="primary" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {costume.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ 
                          bgcolor: 'rgba(108, 99, 255, 0.1)', 
                          px: 1.5, 
                          py: 0.5, 
                          borderRadius: '12px',
                          display: 'inline-block',
                          minWidth: '80px',
                          maxWidth: '120px',
                          textAlign: 'center',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {t(`catalog.categories.${costume.category}`)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ 
                          bgcolor: 'rgba(255, 107, 107, 0.1)', 
                          px: 1.5, 
                          py: 0.5, 
                          borderRadius: '12px',
                          display: 'inline-block',
                          minWidth: '80px',
                          maxWidth: '120px',
                          textAlign: 'center',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {t(`catalog.ageGroups.${costume.ageGroup}`)}
                        </Typography>
                      </Box>
                      <Typography variant="h6" color="primary" sx={{ 
                        mt: 2, 
                        fontWeight: 700,
                        fontSize: '1.4rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {costume.price} ₽/час
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 3, pt: 0 }}>
                      <Button
                        component={RouterLink}
                        to={`/catalog/${costume.id}`}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          borderRadius: '12px',
                          py: 1.2,
                          boxShadow: '0 4px 10px rgba(255, 107, 107, 0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 15px rgba(255, 107, 107, 0.4)',
                          }
                        }}
                      >
                        {t('product.details')}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 10,
                px: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
                bgcolor: 'background.paper',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
              }}
              className="fade-in"
            >
              <Box 
                sx={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(108, 99, 255, 0.1) 100%)',
                }}
              >
                <SearchIcon 
                  sx={{ 
                    fontSize: '3rem', 
                    color: 'primary.main',
                    opacity: 0.8
                  }} 
                />
              </Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  background: 'linear-gradient(to right, #FF6B6B, #6C63FF)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('catalog.noResults')}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ maxWidth: '500px', mb: 4 }}
              >
                {t('catalog.noResultsDescription', 'Попробуйте изменить параметры поиска или фильтры для получения результатов')}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setCategory('all');
                  setAgeGroup('all');
                  setSortBy('popular');
                  setSearchQuery('');
                }}
                sx={{
                  borderRadius: '12px',
                  py: 1.2,
                  px: 3,
                  borderWidth: '2px',
                  borderColor: 'primary.main',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderWidth: '2px',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px rgba(108, 99, 255, 0.2)',
                  }
                }}
              >
                {t('catalog.resetFilters', 'Сбросить фильтры')}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Mobile filter drawer */}
      <Drawer
        anchor="bottom"
        open={drawerOpen && isMobile}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            maxHeight: '85vh',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.15)',
            '&::before': {
              content: '""',
              display: 'block',
              width: '40px',
              height: '5px',
              borderRadius: '3px',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              margin: '12px auto',
            },
          },
        }}
        SlideProps={{
          timeout: 400,
        }}
      >
        <FiltersComponent />
      </Drawer>
    </Container>
  );
};

export default CatalogPage;

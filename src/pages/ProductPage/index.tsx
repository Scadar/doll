import { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
  Divider,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Breadcrumbs,
  Link,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import * as React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [duration, setDuration] = useState('2');
  const [contactMethod, setContactMethod] = useState('phone');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    additionalInfo: '',
  });

  // Mock data for the product
  const product = {
    id: Number(id),
    name: id === '1' ? 'Микки Маус' : id === '2' ? 'Человек-паук' : 'Эльза',
    images: [
      '/src/assets/bear.png',
      '/src/assets/blue_rabbit.png',
      '/src/assets/pink_rabbit.png',
    ],
    category: id === '1' ? 'cartoons' : id === '2' ? 'superheroes' : 'fairytales',
    ageGroup: id === '1' ? 'preschool' : id === '2' ? 'school' : 'preschool',
    description: 'Яркий и красочный костюм ростовой куклы, который подарит радость и незабываемые впечатления детям на празднике. Костюм выполнен из качественных материалов, безопасных для здоровья.',
    details: 'Размер: универсальный (подходит для роста 165-185 см)\nМатериал: гипоаллергенный плюш, полиэстер\nВес костюма: около 3 кг\nВремя непрерывного использования: до 2 часов',
    pricePerHour: id === '1' ? 2000 : id === '2' ? 2500 : 2200,
    pricePerDay: id === '1' ? 8000 : id === '2' ? 10000 : 9000,
    reviews: [
      {
        id: 1,
        name: 'Анна К.',
        text: 'Заказывали на день рождения сына. Дети были в восторге! Костюм очень качественный, аниматор отработал на все 100%.',
        rating: 5,
        date: '2023-05-15',
      },
      {
        id: 2,
        name: 'Сергей П.',
        text: 'Все прошло отлично, доставили вовремя, костюм чистый и аккуратный.',
        rating: 4,
        date: '2023-04-20',
      },
    ],
    similarProducts: [
      {
        id: id === '1' ? 6 : id === '2' ? 5 : 7,
        name: id === '1' ? 'Минни Маус' : id === '2' ? 'Бэтмен' : 'Белоснежка',
        image: '/src/assets/pink_rabbit.png',
        price: id === '1' ? 2000 : id === '2' ? 2700 : 2100,
      },
      {
        id: 4,
        name: 'Лев',
        image: '/src/assets/panda.png',
        price: 1800,
      },
      {
        id: 8,
        name: 'Тигр',
        image: '/src/assets/blue_rabbit.png',
        price: 1900,
      },
    ],
    // Mock unavailable dates
    unavailableDates: [
      dayjs().add(2, 'day').format('YYYY-MM-DD'),
      dayjs().add(3, 'day').format('YYYY-MM-DD'),
      dayjs().add(7, 'day').format('YYYY-MM-DD'),
    ],
  };

  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the booking data to the server
    console.log({
      productId: product.id,
      date: selectedDate?.format('YYYY-MM-DD'),
      duration,
      contactMethod,
      ...formData,
    });
    // Show a success message or redirect
    alert('Заявка успешно отправлена!');
  };

  // Check if a date is unavailable
  const isDateUnavailable = (date: Dayjs) => {
    return product.unavailableDates.includes(date.format('YYYY-MM-DD'));
  };

  // Main image and thumbnails
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {t('navigation.home')}
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/catalog"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {t('navigation.catalog')}
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
            <img
              src={mainImage}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {product.images.map((image, index) => (
              <Box
                key={index}
                onClick={() => setMainImage(image)}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: mainImage === image ? `2px solid ${theme.palette.primary.main}` : 'none',
                }}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {t(`catalog.categories.${product.category}`)} | {t(`catalog.ageGroups.${product.ageGroup}`)}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Tabs for Description, Details, Reviews */}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="product tabs"
                variant={isMobile ? 'fullWidth' : 'standard'}
              >
                <Tab label={t('product.description')} id="product-tab-0" />
                <Tab label={t('product.details')} id="product-tab-1" />
                <Tab label={t('product.reviews')} id="product-tab-2" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <Typography variant="body1">
                {product.description}
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                {product.details}
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              {product.reviews.map((review) => (
                <Box key={review.id} sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    {review.date}
                  </Typography>
                  <Typography variant="body2">{review.text}</Typography>
                </Box>
              ))}
            </TabPanel>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Pricing */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {t('product.price')}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {product.pricePerHour} ₽
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('product.perHour')}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {product.pricePerDay} ₽
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('product.perDay')}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Booking Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              {t('product.booking.title')}
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {t('product.booking.date')}
                </Typography>
                <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  shouldDisableDate={isDateUnavailable}
                  disablePast
                  sx={{ width: '100%' }}
                />
              </Box>
            </LocalizationProvider>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                {t('product.booking.duration')}
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value as string)}
                >
                  <MenuItem value="1">{t('product.booking.duration.hour1')}</MenuItem>
                  <MenuItem value="2">{t('product.booking.duration.hour2')}</MenuItem>
                  <MenuItem value="3">{t('product.booking.duration.hour3')}</MenuItem>
                  <MenuItem value="4">{t('product.booking.duration.hour4')}</MenuItem>
                  <MenuItem value="8">{t('product.booking.duration.day')}</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Typography variant="subtitle1" gutterBottom>
              {t('product.booking.contact')}
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label={t('product.booking.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label={t('product.booking.phone')}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label={t('product.booking.email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label={t('product.booking.additionalInfo')}
                  name="additionalInfo"
                  multiline
                  rows={3}
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                {t('product.booking.contactMethodTitle')}
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value as string)}
                >
                  <MenuItem value="phone">{t('product.booking.contactMethod.phone')}</MenuItem>
                  <MenuItem value="telegram">{t('product.booking.contactMethod.telegram')}</MenuItem>
                  <MenuItem value="whatsapp">{t('product.booking.contactMethod.whatsapp')}</MenuItem>
                  <MenuItem value="email">{t('product.booking.contactMethod.email')}</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              {t('product.booking.submit')}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Similar Products */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          {t('product.similar')}
        </Typography>
        <Grid container spacing={3}>
          {product.similarProducts.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {item.price} ₽/час
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    component={RouterLink}
                    to={`/catalog/${item.id}`}
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
  );
};

export default ProductPage;

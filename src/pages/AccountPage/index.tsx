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
  Tabs,
  Tab,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  Chip,
  Badge,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import * as React from "react";

// Import images
import bearImage from '../../assets/bear.png';
import blueRabbitImage from '../../assets/blue_rabbit.png';
import pinkRabbitImage from '../../assets/pink_rabbit.png';
import pandaImage from '../../assets/panda.png';

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
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const AccountPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (912) 345-67-89',
    address: 'г. Нефтекамск, ул. Ленина, 123, кв. 45',
  });

  // Mock orders data
  const orders = [
    {
      id: 'ORD-2023-001',
      date: '2023-05-15',
      status: 'completed',
      items: [
        {
          id: 1,
          name: 'Микки Маус',
          image: bearImage,
          price: 2000,
          duration: '2 часа',
        },
      ],
      total: 4000,
    },
    {
      id: 'ORD-2023-002',
      date: '2023-06-20',
      status: 'pending',
      items: [
        {
          id: 2,
          name: 'Человек-паук',
          image: blueRabbitImage,
          price: 2500,
          duration: '3 часа',
        },
      ],
      total: 7500,
    },
  ];

  // Mock favorites data
  const favorites = [
    {
      id: 1,
      name: 'Микки Маус',
      image: bearImage,
      category: 'cartoons',
      price: 2000,
    },
    {
      id: 3,
      name: 'Эльза',
      image: pinkRabbitImage,
      category: 'fairytales',
      price: 2200,
    },
    {
      id: 5,
      name: 'Бэтмен',
      image: pandaImage,
      category: 'superheroes',
      price: 2700,
    },
  ];

  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle profile edit
  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  // Handle profile on save
  const handleSaveProfile = () => {
    // In a real app, this would send the updated profile data to the server
    setIsEditing(false);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle remove from favorites
  const handleRemoveFavorite = (id: number) => {
    // In a real app, this would update the favorites in the database
    console.log(`Removed item ${id} from favorites`);
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would clear the authentication state and redirect to log in
    console.log('Logged out');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        {t('account.profile')}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, mb: isMobile ? 3 : 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main' }}
              >
                {userData.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" align="center">
                {userData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {userData.email}
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Navigation tabs for mobile */}
            {isMobile && (
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                aria-label="account tabs"
                sx={{ mb: 2 }}
              >
                <Tab icon={<PersonIcon />} label={t('account.profile')} id="account-tab-0" />
                <Tab icon={<HistoryIcon />} label={t('account.orders')} id="account-tab-1" />
                <Tab icon={<FavoriteIcon />} label={t('account.favorites')} id="account-tab-2" />
              </Tabs>
            )}

            {/* Navigation list for desktop */}
            {!isMobile && (
              <List>
                <ListItem
                  onClick={(e) => handleTabChange(e, 0)}
                  sx={{ cursor: 'pointer' }}
                >
                  <PersonIcon sx={{ mr: 2 }} />
                  <ListItemText primary={t('account.profile')} />
                </ListItem>
                <ListItem
                  onClick={(e) => handleTabChange(e, 1)}
                  sx={{ cursor: 'pointer' }}
                >
                  <HistoryIcon sx={{ mr: 2 }} />
                  <ListItemText primary={t('account.orders')} />
                  <Badge badgeContent={orders.length} color="primary" />
                </ListItem>
                <ListItem
                  onClick={(e) => handleTabChange(e, 2)}
                  sx={{ cursor: 'pointer' }}
                >
                  <FavoriteIcon sx={{ mr: 2 }} />
                  <ListItemText primary={t('account.favorites')} />
                  <Badge badgeContent={favorites.length} color="primary" />
                </ListItem>
                <ListItem sx={{ cursor: 'pointer' }}>
                  <SettingsIcon sx={{ mr: 2 }} />
                  <ListItemText primary={t('account.settings')} />
                </ListItem>
                <ListItem onClick={handleLogout} sx={{ cursor: 'pointer' }}>
                  <LogoutIcon sx={{ mr: 2 }} />
                  <ListItemText primary={t('account.logout')} />
                </ListItem>
              </List>
            )}
          </Paper>
        </Grid>

        {/* Main content */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Paper sx={{ p: 3 }}>
            {/* Profile Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">{t('account.profile')}</Typography>
                <Button
                  variant={isEditing ? 'contained' : 'outlined'}
                  color="primary"
                  startIcon={isEditing ? null : <EditIcon />}
                  onClick={isEditing ? handleSaveProfile : handleEditProfile}
                >
                  {isEditing ? t('common.save') : t('common.edit')}
                </Button>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.name')}
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.email')}
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.phone')}
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Адрес"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              {isEditing && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setIsEditing(false)}
                    sx={{ mr: 2 }}
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveProfile}
                  >
                    {t('common.save')}
                  </Button>
                </Box>
              )}
            </TabPanel>

            {/* Orders Tab */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h4" gutterBottom>{t('account.orders')}</Typography>

              {orders.length > 0 ? (
                <List>
                  {orders.map((order) => (
                    <Paper key={order.id} sx={{ mb: 3, overflow: 'hidden' }}>
                      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <Grid container alignItems="center">
                          <Grid size={{ xs: 12, sm: 4 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {order.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {order.date}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 4 }}>
                            <Chip
                              label={order.status === 'completed' ? 'Завершен' : 'В обработке'}
                              color={order.status === 'completed' ? 'success' : 'warning'}
                              size="small"
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: { sm: 'right' } }}>
                            <Typography variant="h6" color="primary">
                              {order.total} ₽
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Divider />
                      <Box sx={{ p: 2 }}>
                        {order.items.map((item) => (
                          <Grid container key={item.id} spacing={2} alignItems="center">
                            <Grid size={{ xs: 3, sm: 2 }}>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '100%', borderRadius: 4 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 9, sm: 6 }}>
                              <Typography variant="subtitle1">
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Продолжительность: {item.duration}
                              </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: { sm: 'right' } }}>
                              <Typography variant="subtitle1">
                                {item.price} ₽/час
                              </Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </Box>
                      <Divider />
                      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          variant="outlined"
                          component={RouterLink}
                          to={`/orders/${order.id}`}
                        >
                          Подробнее
                        </Button>
                        {order.status === 'completed' && (
                          <Button
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to={`/catalog/${order.items[0].id}`}
                          >
                            Заказать снова
                          </Button>
                        )}
                      </Box>
                    </Paper>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    У вас пока нет заказов
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/catalog"
                    sx={{ mt: 2 }}
                  >
                    Перейти в каталог
                  </Button>
                </Box>
              )}
            </TabPanel>

            {/* Favorites Tab */}
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h4" gutterBottom>{t('account.favorites')}</Typography>

              {favorites.length > 0 ? (
                <Grid container spacing={3}>
                  {favorites.map((item) => (
                    <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        <IconButton
                          aria-label="remove from favorites"
                          onClick={() => handleRemoveFavorite(item.id)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'background.paper',
                            '&:hover': {
                              bgcolor: 'background.paper',
                              color: 'error.main',
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
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
                          <Typography variant="body2" color="text.secondary">
                            {t(`catalog.categories.${item.category}`)}
                          </Typography>
                          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
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
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    У вас пока нет избранных товаров
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/catalog"
                    sx={{ mt: 2 }}
                  >
                    Перейти в каталог
                  </Button>
                </Box>
              )}
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountPage;

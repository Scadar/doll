import { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container, 
  Avatar, 
  Button, 
  Tooltip, 
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { selectTheme, toggleTheme } from '../../store/slices/themeSlice';
import * as React from "react";

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectTheme);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const pages = [
    { name: t('navigation.home'), path: '/' },
    { name: t('navigation.catalog'), path: '/catalog' },
    { name: t('navigation.about'), path: '/about' },
    { name: t('navigation.contacts'), path: '/contacts' },
    { name: t('navigation.blog'), path: '/blog' },
  ];

  const settings = [
    { name: t('account.profile'), path: '/account' },
    { name: t('account.orders'), path: '/account/orders' },
    { name: t('account.favorites'), path: '/account/favorites' },
    { name: t('account.logout'), path: '/logout' },
  ];

  return (
    <AppBar 
      position="static" 
      elevation={4}
      sx={{
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)' 
          : 'linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%)',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo for desktop */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              letterSpacing: '.1rem',
              color: 'primary.main',
              textDecoration: 'none',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '50%',
                height: '3px',
                bottom: -5,
                left: 0,
                backgroundColor: 'primary.main',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
              },
              '&:hover::after': {
                width: '100%',
              },
            }}
          >
            {t('common.appName')}
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      pl: 2,
                    },
                  }}
                >
                  <Typography 
                    textAlign="center"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 800,
              letterSpacing: '.05rem',
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            {t('common.appName')}
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  mx: 1.5, 
                  color: 'text.primary', 
                  display: 'block',
                  fontWeight: 600,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    backgroundColor: 'primary.main',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'primary.main',
                    transform: 'translateY(-2px)',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Theme toggle */}
          <Box sx={{ mr: 2 }}>
            <Tooltip title={t('common.theme.toggle')}>
              <IconButton 
                onClick={handleThemeToggle} 
                sx={{
                  color: 'text.secondary',
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                    transform: 'rotate(12deg)',
                  },
                }}
              >
                {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={t('navigation.account')}>
              <IconButton 
                onClick={handleOpenUserMenu} 
                sx={{ 
                  p: 0.5,
                  border: '2px solid',
                  borderColor: 'primary.light',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Avatar alt="User" src="/static/images/avatar/default.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ 
                mt: '45px',
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  boxShadow: (theme) => theme.palette.mode === 'dark' 
                    ? '0 8px 16px rgba(0, 0, 0, 0.5)' 
                    : '0 8px 16px rgba(0, 0, 0, 0.1)',
                  overflow: 'visible',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                  key={setting.name} 
                  onClick={handleCloseUserMenu}
                  component={RouterLink}
                  to={setting.path}
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      pl: 2,
                    },
                  }}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

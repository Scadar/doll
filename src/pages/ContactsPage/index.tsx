import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import * as React from "react";

const ContactsPage = () => {
  const { t } = useTranslation();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  });

  // Form validation
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
    consent: false,
  });

  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });

    // Clear error when user checks
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: false,
      });
    }
  };

  // Handle select change
  const handleSelectChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      name: !formData.name,
      email: !formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone: !formData.phone || !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, '')),
      message: !formData.message,
      consent: !formData.consent,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, this would send the form data to the server
      console.log('Form submitted:', formData);

      // Show a success message
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false,
      });
    }
  };

  // Handle a success message close
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        {t('contacts.title')}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Contact Information */}
        <Grid size={{xs: 12, md: 5}}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {t('common.appName')}
              </Typography>
              <Typography variant="body1">
                {t('contacts.description')}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body1">
                  {t('contacts.address')}: {t('contacts.addressValue')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body1">
                  {t('contacts.phone')}: <a href="tel:+79123456789" style={{ color: 'inherit', textDecoration: 'none' }}>{t('contacts.phoneValue')}</a>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body1">
                  {t('contacts.email')}: <a href="mailto:info@kuklaprazdnik.ru" style={{ color: 'inherit', textDecoration: 'none' }}>{t('contacts.emailValue')}</a>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AccessTimeIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body1">
                  {t('contacts.workingHours')}: {t('contacts.workingHoursValue')}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                {t('contacts.socialMedia')}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<TelegramIcon />}
                  href="https://t.me/kukladoll"
                  target="_blank"
                >
                  Telegram
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<WhatsAppIcon />}
                  href="https://wa.me/79123456789"
                  target="_blank"
                >
                  WhatsApp
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Form */}
        <Grid size={{xs: 12, md: 7}}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
              {t('contacts.form.title')}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid size={{xs: 12}}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.name')}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    helperText={errors.name ? t('contacts.form.validation.name') : ''}
                    required
                  />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.email')}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    helperText={errors.email ? t('contacts.form.validation.email') : ''}
                    required
                  />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.phone')}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    helperText={errors.phone ? t('contacts.form.validation.phone') : ''}
                    required
                  />
                </Grid>
                <Grid size={{xs: 12}}>
                  <FormControl fullWidth>
                    <InputLabel id="subject-label">{t('contacts.form.subject')}</InputLabel>
                    <Select
                      labelId="subject-label"
                      name="subject"
                      value={formData.subject}
                      onChange={handleSelectChange}
                      label={t('contacts.form.subject')}
                    >
                      <MenuItem value="booking">{t('contacts.form.subject.booking')}</MenuItem>
                      <MenuItem value="info">{t('contacts.form.subject.info')}</MenuItem>
                      <MenuItem value="partnership">{t('contacts.form.subject.partnership')}</MenuItem>
                      <MenuItem value="other">{t('contacts.form.subject.other')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{xs: 12}}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.message')}
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    error={errors.message}
                    helperText={errors.message ? t('contacts.form.validation.message') : ''}
                    required
                  />
                </Grid>
                <Grid size={{xs: 12}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="consent"
                        checked={formData.consent}
                        onChange={handleCheckboxChange}
                        color="primary"
                      />
                    }
                    label={t('contacts.form.consent')}
                  />
                  {errors.consent && (
                    <Typography variant="caption" color="error">
                      {t('contacts.form.validation.consent')}
                    </Typography>
                  )}
                </Grid>
                <Grid size={{xs: 12}}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    {t('contacts.form.submit')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Map */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          {t('contacts.map')}
        </Typography>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2, height: 400, overflow: 'hidden' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33277.309846711!2d54.23347005!3d56.08750765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43e17a7b5bc3fdc1%3A0x9f47e2d5e2f1f6f0!2z0J3QtdGE0YLQtdC60LDQvNGB0LosINCg0LXRgdC_LiDQkdCw0YjQutC-0YDRgtC-0YHRgtCw0L0!5e0!3m2!1sru!2sru!4v1621345678901!5m2!1sru!2sru"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={t('contacts.mapTitle')}
          ></iframe>
        </Paper>
      </Box>

      {/* Success message */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          {t('contacts.form.success')}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactsPage;

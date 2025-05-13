import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Paper,
  Avatar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import images
import bearImage from '../../assets/bear.png';
import blueRabbitImage from '../../assets/blue_rabbit.png';
import pinkRabbitImage from '../../assets/pink_rabbit.png';
import pandaImage from '../../assets/panda.png';

const AboutPage = () => {
  const { t } = useTranslation();

  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: 'Анна Иванова',
      position: 'Директор',
      image: bearImage,
      description: 'Основатель компании с опытом работы в event-индустрии более 10 лет.',
    },
    {
      id: 2,
      name: 'Сергей Петров',
      position: 'Менеджер по работе с клиентами',
      image: blueRabbitImage,
      description: 'Отвечает за взаимодействие с клиентами и организацию мероприятий.',
    },
    {
      id: 3,
      name: 'Елена Смирнова',
      position: 'Дизайнер костюмов',
      image: pinkRabbitImage,
      description: 'Создает и поддерживает в идеальном состоянии все наши костюмы.',
    },
    {
      id: 4,
      name: 'Дмитрий Козлов',
      position: 'Аниматор',
      image: pandaImage,
      description: 'Профессиональный аниматор с опытом работы более 5 лет.',
    },
  ];

  // Mock data for advantages
  const advantages = [
    {
      id: 1,
      title: 'Качество костюмов',
      description: 'Все наши костюмы изготовлены из высококачественных материалов и регулярно проходят чистку и дезинфекцию.',
    },
    {
      id: 2,
      title: 'Большой выбор',
      description: 'У нас есть более 50 различных костюмов персонажей из популярных мультфильмов, сказок и компьютерных игр.',
    },
    {
      id: 3,
      title: 'Гибкие условия аренды',
      description: 'Мы предлагаем аренду на час, несколько часов или на целый день с возможностью доставки.',
    },
    {
      id: 4,
      title: 'Профессиональные аниматоры',
      description: 'При необходимости мы можем предоставить профессиональных аниматоров, которые сделают ваш праздник незабываемым.',
    },
  ];

  // Mock data for FAQ
  const faqItems = [
    {
      id: 1,
      question: 'Как заказать ростовую куклу?',
      answer: 'Вы можете заказать ростовую куклу через наш сайт, выбрав нужного персонажа, дату и время аренды, или позвонив нам по телефону.',
    },
    {
      id: 2,
      question: 'Какой размер у ростовых кукол?',
      answer: 'Наши ростовые куклы подходят для людей ростом от 165 до 185 см. Если у вас есть особые требования, пожалуйста, сообщите нам заранее.',
    },
    {
      id: 3,
      question: 'Можно ли заказать доставку костюма?',
      answer: 'Да, мы предлагаем услугу доставки по городу Нефтекамск. Стоимость доставки зависит от района.',
    },
    {
      id: 4,
      question: 'Нужно ли вносить предоплату?',
      answer: 'Да, для бронирования костюма необходимо внести предоплату в размере 30% от стоимости аренды. Остальную сумму вы оплачиваете при получении костюма.',
    },
    {
      id: 5,
      question: 'Что делать, если костюм не подошел?',
      answer: 'Если костюм не подошел по размеру или другим параметрам, пожалуйста, сообщите нам об этом сразу. Мы постараемся предложить альтернативный вариант или вернем предоплату.',
    },
    {
      id: 6,
      question: 'Как происходит возврат костюма?',
      answer: 'Костюм необходимо вернуть в том же состоянии, в котором вы его получили, в согласованное время. При возврате мы проверяем состояние костюма.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        {t('about.title')}
      </Typography>

      {/* History Section */}
      <Box id="history" sx={{ mb: 8, scrollMarginTop: '80px' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          {t('about.history.title')}
        </Typography>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="body1">
            {t('about.history.content')}
          </Typography>
          <Typography variant="body1">
            Компания "КуклаПраздник" начала свою деятельность с небольшой коллекции из 10 костюмов. Сегодня наш ассортимент насчитывает более 50 различных персонажей, и мы продолжаем расширять его, следя за новыми трендами и пожеланиями наших клиентов.
          </Typography>
          <Typography variant="body1">
            За годы работы мы провели сотни мероприятий и помогли создать незабываемые впечатления для тысяч детей и их родителей в Нефтекамске и окрестностях.
          </Typography>
        </Paper>
      </Box>

      {/* Mission Section */}
      <Box id="mission" sx={{ mb: 8, scrollMarginTop: '80px' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          {t('about.mission.title')}
        </Typography>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          <Typography variant="h5" align="center">
            {t('about.mission.content')}
          </Typography>
          <Typography variant="body1" align="center">
            Мы стремимся сделать каждый детский праздник особенным, ярким и запоминающимся, предоставляя качественные костюмы любимых персонажей по доступным ценам.
          </Typography>
        </Paper>
      </Box>

      {/* Team Section */}
      <Box id="team" sx={{ mb: 8, scrollMarginTop: '80px' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          {t('about.team.title')}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid key={member.id} size={{xs: 12, sm: 6, md: 3}}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ width: 120, height: 120 }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3" align="center">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
                      {member.position}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2">
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Advantages Section */}
      <Box id="advantages" sx={{ mb: 8, scrollMarginTop: '80px' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          {t('about.advantages.title')}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {advantages.map((advantage) => (
              <Grid key={advantage.id} size={{xs: 12, sm: 6, md: 6}}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {advantage.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {advantage.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* FAQ Section */}
      <Box id="faq" sx={{ scrollMarginTop: '80px' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          {t('about.faq.title')}
        </Typography>
        <Box sx={{ mt: 3 }}>
          {faqItems.map((item) => (
            <Accordion key={item.id} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-content-${item.id}`}
                id={`faq-header-${item.id}`}
              >
                <Typography variant="h6">{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default AboutPage;

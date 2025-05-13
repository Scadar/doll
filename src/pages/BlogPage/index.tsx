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
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  InputBase,
  IconButton,
  Pagination,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import * as React from "react";

const BlogPage = () => {
  const { t } = useTranslation();

  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Mock data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'Как организовать незабываемый детский праздник с ростовыми куклами',
      excerpt: 'Советы и идеи для организации яркого и запоминающегося детского праздника с использованием ростовых кукол.',
      content: 'Полный текст статьи...',
      image: '/src/assets/bear.png',
      date: '2023-05-15',
      author: 'Анна Иванова',
      category: 'советы',
      tags: ['детский праздник', 'организация', 'идеи'],
    },
    {
      id: 2,
      title: 'Топ-10 самых популярных персонажей для детских праздников',
      excerpt: 'Рейтинг самых востребованных ростовых кукол для детских мероприятий в Нефтекамске в этом году.',
      content: 'Полный текст статьи...',
      image: '/src/assets/blue_rabbit.png',
      date: '2023-04-20',
      author: 'Сергей Петров',
      category: 'рейтинги',
      tags: ['персонажи', 'популярное', 'тренды'],
    },
    {
      id: 3,
      title: 'Фотоотчет с городского праздника в парке культуры',
      excerpt: 'Яркие моменты с праздника в городском парке, где наши ростовые куклы создавали атмосферу веселья и радости.',
      content: 'Полный текст статьи...',
      image: '/src/assets/pink_rabbit.png',
      date: '2023-03-10',
      author: 'Елена Смирнова',
      category: 'мероприятия',
      tags: ['фотоотчет', 'городской праздник', 'парк'],
    },
    {
      id: 4,
      title: 'Как выбрать ростовую куклу для тематического праздника',
      excerpt: 'Рекомендации по выбору подходящего персонажа для различных тематических мероприятий.',
      content: 'Полный текст статьи...',
      image: '/src/assets/panda.png',
      date: '2023-02-25',
      author: 'Анна Иванова',
      category: 'советы',
      tags: ['выбор персонажа', 'тематический праздник', 'рекомендации'],
    },
    {
      id: 5,
      title: 'Новые костюмы в нашей коллекции: герои популярных мультфильмов',
      excerpt: 'Представляем новые ростовые куклы персонажей из самых популярных мультфильмов этого года.',
      content: 'Полный текст статьи...',
      image: '/src/assets/bear.png',
      date: '2023-01-15',
      author: 'Дмитрий Козлов',
      category: 'новости',
      tags: ['новинки', 'мультфильмы', 'персонажи'],
    },
  ];

  // Extract unique categories and tags
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  const tags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter posts based on search, category, and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === null || post.category === selectedCategory;

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  // Pagination
  const postsPerPage = 3;
  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1); // Reset to the first page on category change
  };

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setCurrentPage(1); // Reset to the first page on tag change
  };

  // Handle page change
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        {t('blog.title')}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Main content */}
        <Grid size={{xs: 12, md: 8}}>
          {/* Blog posts */}
          {displayedPosts.length > 0 ? (
            <>
              {displayedPosts.map((post) => (
                <Card key={post.id} sx={{ mb: 4 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent>
                    <Typography variant="h4" component="h2" gutterBottom>
                      {post.title}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {post.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {post.author}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip 
                      label={post.category} 
                      color="primary" 
                      size="small" 
                      sx={{ mb: 2 }}
                      onClick={() => handleCategoryClick(post.category)}
                    />

                    <Typography variant="body1">
                      {post.excerpt}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {post.tags.map((tag) => (
                          <Chip 
                            key={tag} 
                            label={tag} 
                            size="small" 
                            variant="outlined"
                            onClick={() => handleTagClick(tag)}
                          />
                        ))}
                      </Box>
                      <Button 
                        variant="contained" 
                        color="primary"
                        component={RouterLink}
                        to={`/blog/${post.id}`}
                      >
                        {t('blog.readMore')}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {/* Pagination */}
              {pageCount > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination 
                    count={pageCount} 
                    page={currentPage} 
                    onChange={handlePageChange} 
                    color="primary" 
                  />
                </Box>
              )}
            </>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" color="text.secondary">
                Нет статей, соответствующих вашему запросу
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSelectedTag(null);
                }}
                sx={{ mt: 2 }}
              >
                Сбросить фильтры
              </Button>
            </Paper>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid size={{xs: 12, md: 4}}>
          {/* Search */}
          <Paper component="form" onSubmit={handleSearch} sx={{ p: 1, mb: 4, display: 'flex' }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Поиск в блоге"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          {/* Categories */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {t('blog.categories')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              {categories.map((category) => (
                <ListItem 
                  key={category} 
                  disablePadding 
                  sx={{ 
                    py: 0.5,
                    bgcolor: selectedCategory === category ? 'action.selected' : 'transparent',
                    borderRadius: 1,
                  }}
                >
                  <ListItemText
                      slotProps={{
                        primary: {
                          sx: {
                            cursor: 'pointer',
                            fontWeight: selectedCategory === category ? 'bold' : 'normal',
                          },
                          role: "button",
                          tabIndex: 0,
                          onKeyDown: (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleCategoryClick(category);
                            }
                          }
                        }
                      }}
                      onClick={() => handleCategoryClick(category)}
                  />

                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Tags */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {t('blog.tags')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tags.map((tag) => (
                <Chip 
                  key={tag} 
                  label={tag} 
                  onClick={() => handleTagClick(tag)}
                  color={selectedTag === tag ? 'primary' : 'default'}
                />
              ))}
            </Box>
          </Paper>

          {/* Recent posts */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              {t('blog.recentPosts')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              {blogPosts.slice(0, 3).map((post) => (
                <ListItem key={post.id} disablePadding sx={{ py: 1 }}>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body1" 
                        component={RouterLink} 
                        to={`/blog/${post.id}`}
                        sx={{ 
                          textDecoration: 'none', 
                          color: 'text.primary',
                          '&:hover': { color: 'primary.main' },
                          display: 'block',
                          fontWeight: 'medium',
                        }}
                      >
                        {post.title}
                      </Typography>
                    }
                    secondary={post.date}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogPage;

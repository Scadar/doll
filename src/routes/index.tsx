import {createBrowserRouter, Navigate, type RouteObject} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import ProductPage from '../pages/ProductPage';
import AboutPage from '../pages/AboutPage';
import ContactsPage from '../pages/ContactsPage';
import BlogPage from '../pages/BlogPage';
import AccountPage from '../pages/AccountPage';
import NotFoundPage from '../pages/NotFoundPage';

// Define routes
const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'catalog/:id',
        element: <ProductPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contacts',
        element: <ContactsPage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'account',
        element: <AccountPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

// Create router
export const router = createBrowserRouter(routes);
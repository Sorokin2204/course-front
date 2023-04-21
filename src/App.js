import { useRoutes } from 'react-router';
import AdvertAdd from './components/site/AdvertAdd/AdvertAdd';
import AdvertEdit from './components/site/AdvertEdit/AdvertEdit';

import SiteLayout from './components/site/SiteLayout/SiteLayout';
import AdminLogin from './pages/admin/AdminLogin/AdminLogin';
import AccountPage from './pages/site/AccountPage';
import CategoryPage from './pages/site/CategoryPage';

import HomePage from './pages/site/HomePage';
import SingleAdvertPage from './pages/site/SingleAdvertPage';

function App() {
  let routes = useRoutes([
    {
      path: '/',
      element: (
        <SiteLayout>
          <HomePage />
        </SiteLayout>
      ),
    },
    {
      path: '/item/add',
      element: (
        <SiteLayout>
          <AdvertAdd />
        </SiteLayout>
      ),
    },
    {
      path: '/item/:id',
      element: (
        <SiteLayout>
          <SingleAdvertPage />
        </SiteLayout>
      ),
    },
    {
      path: '/login',
      element: (
        <SiteLayout>
          <AdminLogin />
        </SiteLayout>
      ),
    },
    {
      path: '/account',
      element: (
        <SiteLayout>
          <AccountPage />
        </SiteLayout>
      ),
    },

    {
      path: '/item/edit/:id',
      element: (
        <SiteLayout>
          <AdvertEdit />
        </SiteLayout>
      ),
    },
    {
      path: '/category/:id',
      element: (
        <SiteLayout>
          <CategoryPage />
        </SiteLayout>
      ),
    },
  ]);

  return routes;
}

export default App;

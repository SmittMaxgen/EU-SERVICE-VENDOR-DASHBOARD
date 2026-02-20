import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ✅ your new pages
const ServicesPage = Loadable(lazy(() => import('../page/servicePage')));
const VendorServicesPage = Loadable(lazy(() => import('../page/vendorServicePage')));
const SubCategoryPage = Loadable(lazy(() => import('../page/SubCategoriesPage')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    // ✅ Services routes
    {
      path: 'services',
      children: [
        {
          path: '', // /services
          element: <ServicesPage />
        }
      ]
    },

    // ✅ Vendor Services routes
    {
      path: 'vendor-services',
      children: [
        {
          path: '', // /vendor-services
          element: <VendorServicesPage />
        }
      ]
    },

    {
      path: 'typography',
      element: <UtilsTypography />
    },
    {
      path: 'color',
      element: <UtilsColor />
    },
    {
      path: 'shadow',
      element: <UtilsShadow />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    },
    {
      path: '/vendor-services',
      element: <VendorServicesPage />
    },
    {
      path: '/services',
      element: <ServicesPage />
    },
    {
      path: 'subcategory/:id', // /subcategory/1
      element: <SubCategoryPage />
    }
  ]
};

export default MainRoutes;

import Layout from '@components/template/Layout';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@components/template/auth/ProtectedRoute';
import { ROUTES } from '@constants/routes';

const MainPage = lazy(() =>
  import('@pages/MainPage').then((module) => ({ default: module.default })),
);
const LoginPage = lazy(() =>
  import('@pages/LoginPage').then((module) => ({ default: module.default })),
);
const TransactionsPage = lazy(() =>
  import('@pages/TransactionsPage').then((module) => ({
    default: module.default,
  })),
);
const KeyManagementPage = lazy(() =>
  import('@pages/KeyManagementPage').then((module) => ({
    default: module.default,
  })),
);
const SignupPage = lazy(() =>
  import('@pages/SignupPage').then((module) => ({ default: module.default })),
);

const routes = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: ROUTES.MAIN,
    element: <Layout />,
    children: [
      {
        path: ROUTES.MAIN,
        element: (
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.TRANSACTIONS,
        element: (
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.KEY_MANAGEMENT,
        element: (
          <ProtectedRoute>
            <KeyManagementPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
export const router = createBrowserRouter(routes);

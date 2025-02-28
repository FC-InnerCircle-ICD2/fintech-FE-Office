import { useAuthStore } from '@store/authStore';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { auth } = useAuthStore();
  const location = useLocation();

  if (!auth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

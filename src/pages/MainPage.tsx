import { Navigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

const MainPage = () => {
  return <Navigate to={ROUTES.TRANSACTIONS} replace />;
};

export default MainPage;

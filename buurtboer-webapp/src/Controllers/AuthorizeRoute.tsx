import { Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
  element: React.ReactElement;
  path: string;
  isAuthenticated: boolean;
}

const AuthorizeRoute: React.FC<AuthRouteProps> = ({ element, path, isAuthenticated }) => {
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/Login" replace={true} state={{ from: path }} />
  );
};

export default AuthorizeRoute;

/* eslint-disable react/prop-types */
import { useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedComponent = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(['user', 'account', 'priority']);

  useEffect(() => {
    const isAuthenticated = cookies['account'] && cookies['priority'];
    const isInLogin = location.pathname?.includes('login');

    if (!isAuthenticated && !isInLogin) {
      navigate('/login');
    }
  }, [cookies, location.pathname, navigate]);

  const protectedComponent = useCallback(() => {
    const isAuthenticated = cookies['account'] && cookies['priority'];
    const isInLogin = location.pathname?.includes('login');
    if (!isAuthenticated && !isInLogin) {
      return null;
    } else {
      return <>{children}</>;
    }
  }, [children, cookies, location.pathname]);

  return <>{protectedComponent()}</>;
};

export default ProtectedComponent;

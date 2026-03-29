import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export default function ProtectedRoute({ children }) {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
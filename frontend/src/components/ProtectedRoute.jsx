<<<<<<< HEAD
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return children;
=======
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return children;
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
}
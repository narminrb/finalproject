// import { getAccessToken } from "@/http/auth/token";
// import { Navigate } from "react-router-dom";
// // import { getAccessToken } from "../utils/token";

// export default function ProtectedRoute({ children }) {
//   const token = getAccessToken();
//   return token ? children : <Navigate to="/login" />;
// }

import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../../api/axios';

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    api.get('/auth/check')
      .then(res => {
        if (res.data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;


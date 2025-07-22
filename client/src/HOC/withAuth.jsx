import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const withAuth = (Component) => {
  return function AuthWrapper(props) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await api.get("/auth/verify");
          setLoading(false);
        } catch {
          navigate("/login");
        }
      };
      checkAuth();
    }, [navigate]);

    return loading ? <div>Loading...</div> : <Component {...props} />;
  };
};

export default withAuth;

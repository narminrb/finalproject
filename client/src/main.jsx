// import 'remixicon/fonts/remixicon.css'
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import 'remixicon/fonts/remixicon.css'
import './i18n.js'
import { AuthProvider } from './context/AuthContext.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
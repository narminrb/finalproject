import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';
// import { logout } from '@/http/auth';
// import { jwtDecode } from 'jwt-decode';

const AdminSidebar = ({ isMobile = false, onClose = () => {} }) => {
  // const [loading, setLoading] = React.useState(false);
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   setLoading(true);
  //   const accessToken = localStorage.getItem("accessToken");
  //   const refreshToken = localStorage.getItem("refreshToken");

  //   let email = null;
  //   if (accessToken) {
  //     try {
  //       const decoded = jwtDecode(accessToken);
  //       email = decoded?.email || decoded?.sub || decoded?.username;
  //     } catch (err) {
  //       console.error("Token decode failed:", err);
  //     }
  //   }

  //   if (!email || !refreshToken) {
  //     alert("Çıxış etmək mümkün olmadı. Məlumatlar tapılmadı.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     await logout({ email, refreshToken });
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("refreshToken");
  //     localStorage.removeItem("email");
  //     navigate("/login");
  //   } catch (err) {
  //     console.error("Logout failed:", err.response?.data || err.message);
  //     alert("Çıxış zamanı xəta baş verdi.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div
      className={`
        ${isMobile ? 'fixed top-0 left-0 z-50 h-full w-[280px] bg-white transition-transform duration-300' : ''}
        ${isMobile ? 'translate-x-0' : ''}
        lg:static
      `}
    >
      <div className="admin-panel flex text-black">
        <div className={clsx(styles.sidebar)}>
          <div className={clsx(styles.side)}></div>
          <div className={clsx(styles.smth)}>
            <nav className={clsx(styles.nav)}>
              <NavLink
                to="/admin/"
                end
                className={({ isActive }) =>
                  clsx(styles.items, isActive && styles.active)
                }
                onClick={onClose}
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles.items, isActive && styles.active)
                }
                to="/admin/shop"
                onClick={onClose}
              >
                Shop
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles.items, isActive && styles.active)
                }
                to="/admin/blog"
                onClick={onClose}
              >
                Blog
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles.items, isActive && styles.active)
                }
                to="/admin/aboutus"
                onClick={onClose}
              >
                About Us
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles.items, isActive && styles.active)
                }
                to="/admin/contactus"
                onClick={onClose}
              >
                Contact Us
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles.items, isActive && styles.active)
                }
                to="/admin/drawing"
                onClick={onClose}
              >
                Drawing
              </NavLink>
            </nav>

            {/* If you want a logout button later, you can add it back:
            <div
              className={clsx(styles.exit)}
              onClick={handleLogout}
              role="button"
              tabIndex={0}
              aria-disabled={loading}
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
              <Exit />
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;


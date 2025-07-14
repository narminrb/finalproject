import React from 'react'
import { NavLink } from 'react-router-dom';
import HeaderIcons from '../../components/HeaderIcons';

const Header = () => {
  return (
    <div>
        <nav className="bg-[#101e36]  border-gray-200 py-7 dark:bg-gray-900">
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <a href="/" className="flex items-center">
            <img src="https://xstore.b-cdn.net/demos/2/artmaxy/wp-content/uploads/sites/23/2019/06/logo-footer.png" alt="" />
        </a>
        <div className="flex items-center lg:order-2">
  <HeaderIcons />
</div>

        <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-6 lg:mt-0 uppercase">
  <li>
    <NavLink
      to="/"
      className={({ isActive }) =>
        `block py-2 ${isActive ? 'text-[#74a8b5]' : 'text-white hover:text-[#74a8b5]'}`
      }
    >
      Home
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/drawing"
      className={({ isActive }) =>
        `block py-2  ${isActive ? 'text-[#74a8b5]' : 'text-white hover:text-[#74a8b5]'}`
      }
    >
      Drawing
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/shop"
      className={({ isActive }) =>
        `block py-2  ${isActive ? 'text-[#74a8b5]' : 'text-white hover:text-[#74a8b5]'}`
      }
    >
      Shop
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/blog"
      className={({ isActive }) =>
        `block py-2  ${isActive ? 'text-[#74a8b5]' : 'text-white hover:text-[#74a8b5]'}`
      }
    >
      Blog
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/aboutus"
      className={({ isActive }) =>
        `block py-2  ${isActive ? 'text-[#74a8b5]' : 'text-white hover:text-[#74a8b5]'}`
      }
    >
      About Us
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/contactus"
      className={({ isActive }) =>
        `block py-2  ${isActive ? 'text-[#74a8b5]' : 'text-white hover:text-[#74a8b5]'}`
      }
    >
      Contact Us
    </NavLink>
  </li>
</ul>

        </div>
    </div>
</nav>
    </div>
  )
}

export default Header
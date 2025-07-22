// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";

// const Login = () => {
//   const [data, setData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setData({ ...data, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/login", data);
//       navigate("/");
//     } catch (err) {
//       alert(err.response.data.message);
//     }
//   };

//   return (
//     <div className="container max-w-screen-xl mx-auto px-3 relative">
//         <form id="loginForm" className="space-y-6" onSubmit={handleSubmit}>
//      <div>
//          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//          <input type="email"  name="email" id="email" onChange={handleChange} required
//              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
//      </div>

//      <div>
//          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//          <input type="password"  name="password" id="password" required onChange={handleChange}
//              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
//      </div>

//      <button type="submit"
//          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//          Sign in
//      </button>
//  </form>
//      </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import './styles.css'

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="bg-gray-800 min-h-screen pt-[5%] relative flex items-center overflow-hidden justify-center">
      <div className="top-blue w-[250px] h-[250px] bg-blue-400 rounded-full absolute top-[10%] left-[50%]"></div>
      <div className="bottom-pink w-[280px] h-[280px] rounded-full absolute top-[50%] left-[12%] lg:left-[30%]"></div>
      <div className="top-orange w-[300px] h-[300px] rounded-full absolute top-[5%] left-[5%] md:left-[23%] lg:left-[30%]"></div>
      
      <div className="container-login w-[350px] sm:w-[350px] m-auto text-center p-8 text-white z-10" style={{ backdropFilter: 'blur(20px)' }}>
            <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png" 
        alt="user avatar"
        className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full"
        />


        <p><span className="text-xl sm:text-2xl">Login Here</span></p>

        <hr className="my-4" />
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            name="email"
            placeholder="Email..."
            value={data.email}
            onChange={handleChange}
            className="w-full mb-4 p-2 text-base sm:text-lg text-black .input-regist"
          />
          <input 
            type="password"
            name="password"
            placeholder="Password..."
            value={data.password}
            onChange={handleChange}
            className="w-full mb-4 p-2 text-base sm:text-lg text-black .input-regist"
          />
          <button 
            type="submit"
            className="p-2 sm:text-lg bg-blue-500 rounded-2xl m-8 w-36 mx-auto sm:w-48 hover:bg-gradient-to-r hover:from-orange-500 hover:via-pink-500 hover:to-pink-700"
          >
            Login
          </button>
        </form>
        <p>If you're new here, click to <a href="/register" className="underline hover:text-pink-300">SignUp</a></p>
      </div>
    </section>
  );
};

export default Login;

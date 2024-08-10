// src/components/Navbar.js

import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";

const Navbar = ({setIsAdmin}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("profile");
  useAxiosInterceptor();
  const handleLogout = async () => {
    try {
      await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        headers: { Authorization: token },
      }
    );
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    localStorage.removeItem("isAdmin");
    navigate("/auth/login");
    } catch (error) {
      console.log(error.message)
      navigate("/auth/login");
    }
    
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={()=>token && navigate("/products")}
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Bakar
          </span>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {token ? (
                <>
              {setIsAdmin && <li>
                <span
                  className="block py-2 px-3 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-700 md:p-0 dark:text-white md:dark:text-teal-500"

                  onClick={()=>navigate("/auth/users")}
                >
                  Kullanıcılar
                </span>
              </li>}
              <li>
                <span
                  className="block py-2 px-3 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-700 md:p-0 dark:text-white md:dark:text-teal-500"
                >
                  {username}
                </span>
              </li>
              <li>
                <button
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  onClick={handleLogout}
                >
                  Çıkış
                </button>
              </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/auth/login"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  >
                    Giriş
                  </a>
                </li>
                <li>
                  <a
                    href="/auth/register"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  >
                    Kayıt Ol
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

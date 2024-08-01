// src/components/Navbar.js

import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("profile");
  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/logout",
      {},
      {
        headers: { Authorization: token },
      }
    );
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    navigate("/login");
  };

  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {token ? (
                <>
              <li>
                <span
                  class="block py-2 px-3 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-700 md:p-0 dark:text-white md:dark:text-teal-500"
                >
                  {username}
                </span>
              </li>
              <li>
                <button
                  class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/login"
                    class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  >
                    Register
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

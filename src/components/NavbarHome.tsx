import { useEffect } from "react";
import logo from "@/assets/Logo.png";
import { CiShoppingCart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { listedParam } from "@/constant/listed.param";
import CartItemStore from "@/store/cartItem.store";
import useAuthStore from "../store/auth.store";
import userStore from "../store/user.store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Swal from "sweetalert2";
import CartItem from "./CartItem";

const NavbarHome = () => {
  const { logout } = useAuthStore();
  const { user, getUser, deleteUser } = userStore();
  const navigate = useNavigate();
  const { countCartItem, getCountCartItem, carts } = CartItemStore();

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, []);

  useEffect(() => {
    getCountCartItem();
  }, [carts]);

  const handleLogout = () => {
    logout();
    deleteUser();
    navigate(listedParam.home);
    Swal.fire({
      title: "Logged out!",
      text: "You have been successfully logged out.",
      icon: "success",
    });
  };

  const trigerLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will need to sign in again to access your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  return (
    <div className="w-full">
      <div className="navbar bg-white shadow-sm w-full px-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <Link to={listedParam.home}>
                <li>
                  <a>Home</a>
                </li>
              </Link>
              <Link to={listedParam.market}>
                <li>
                  <a>Marketplace</a>
                </li>
              </Link>
              <Link to={listedParam.rankedCollectors}>
                <li>
                  <a>Top Collector</a>
                </li>
              </Link>
              {/* <Link to={listedParam.home}>
                <li>
                  <a>Event</a>
                </li>
              </Link> */}
            </ul>
          </div>
          <a className="">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Link to={listedParam.home}>
              <li>
                <a>Home</a>
              </li>
            </Link>
            <Link to={listedParam.market}>
              <li>
                <a>Marketplace</a>
              </li>
            </Link>
            <Link to={listedParam.rankedCollectors}>
              <li>
                <a>Top Collector</a>
              </li>
            </Link>
            {/* <Link to={listedParam.home}>
              <li>
                <a>Event</a>
              </li>
            </Link> */}
          </ul>
        </div>
        <div className="navbar-end flex gap-2">
          {user ? (
            <div className="flex gap-2">
              {countCartItem > 0 && (
                <Popover>
                  <PopoverTrigger>
                    {" "}
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle"
                      id="cart-button"
                    >
                      <div className="indicator">
                        <p className="text-2xl">
                          <CiShoppingCart />
                        </p>
                        <span className="badge badge-sm badge-primary indicator-item">
                          {countCartItem}
                        </span>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-86 mr-9 mt-3 border-0 rounded-xl shadow-lg p-4 bg-base-100 transition-all duration-200 ease-in-out hover:shadow-xl">
                    <CartItem />
                  </PopoverContent>
                </Popover>
              )}

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user?.profilePic
                          ? `${
                              import.meta.env.VITE_REACT_API_URL
                            }/api/download?path=${user?.profilePic}`
                          : "https://imgs.search.brave.com/XmWo89rrDH7sV2NOJzKw5vMt4FrPmtc6_nK7g0VHrMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzYwLzI2LzA4/LzM2MF9GXzU2MDI2/MDg4MF9PMVYzUW0y/Y05PNUhXak42Nm1C/aDJOcmxQSE5IT1V4/Vy5qcGc"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <Link to={listedParam.profile}>
                    <li>
                      <a className="justify-between">Profile</a>
                    </li>
                  </Link>

                  <li onClick={trigerLogout}>
                    <a className="text-red-500 font-bold">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to={listedParam.signin}>
                <button className="btn btn-outline btn-primary">Sign In</button>
              </Link>
              <Link to={listedParam.signup}>
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarHome;

import { listedParam } from "@/constant/listed.param";
import userStore from "@/store/user.store";
import useAuthStore from "@/store/auth.store";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NavbarAdmin = () => {
  const { logout } = useAuthStore();
  const { deleteUser } = userStore();

  const navigate = useNavigate();
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
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
      {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
    </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://imgs.search.brave.com/LqdQm2h9x6zDjOyuiGWjgL1ouowM5Rx-kSZ1XyXKAug/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvYXZhdGFyLXBy/b2ZpbGUtcGljdHVy/ZS1pY29uLWJsdWUt/YmFja2dyb3VuZC1m/bGF0LWRlc2lnbi1z/dHlsZS1yZXNvdXJj/ZXMtZ3JhcGhpYy1l/bGVtZW50LWRlc2ln/bl85OTE3MjAtNjUz/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li onClick={trigerLogout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;

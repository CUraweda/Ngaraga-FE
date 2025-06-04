import NavbarHome from "../NavbarHome";
import { Outlet } from "react-router-dom";
import FooterHome from "../FooterHome";

const LayoutHome = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-base-200">
        <div className="w-full flex top-0 z-10 sticky">
          <NavbarHome />
        </div>

        <div className="w-full min-h-screen">
         
          <Outlet />
        </div>
        <div className="w-full bottom-0 mt-10">
          <FooterHome />
        </div>
      </div>
    </div>
  );
};

export default LayoutHome;

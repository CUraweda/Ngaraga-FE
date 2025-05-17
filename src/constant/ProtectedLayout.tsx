import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedLayout({ children }: { children: ReactNode }) {
 
  const [isAuthenticated, setAuth] = useState(true);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setAuth(false);
      navigate("/");
    } else if (token) {
      setAuth(true);
    }
  }, [token, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col">
        <p>Anda tidak memiliki akses ke halaman ini</p>
        <button
          className="btn btn-ghost bg-emeraldGreen text-white"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedLayout;

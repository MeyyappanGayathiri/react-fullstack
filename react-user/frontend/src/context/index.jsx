import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


export const UserContext = createContext(null);

const callUserAuthApi = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/user/auth",
      {},
      { withCredentials: true }
    );
    
    return response?.data;
  };

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUserCookie = async () => {
      const data = await callUserAuthApi();


      if (data?.userInfo) {
        setUser(data?.userInfo);
      }

      return data?.success
        ? navigate(
            location.pathname === "/register" || location.pathname === "/"
              ? "home"
              : `${location.pathname}`
          )
        : navigate(location.pathname === "/register" || location.pathname === "/" ? `${location.pathname}` : '/');
    };

    verifyUserCookie();
  }, [navigate, location.pathname]);

  return (
    <UserContext.Provider
      value={{
        setLoading,
        loading,
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import axios from "axios";


function Header() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await callLogoutApi();

    if (response?.success) {
      setUser(null);
      navigate("/");
    }
  }

const callLogoutApi = async (req, res) => {
    const response = await axios.post(
      "http://localhost:8000/api/user/logout",
      {},
      { withCredentials: true }
    );
  
    return response?.data;
  };




  return (
    <header className="bg-gray-100">
      <div className="container mx-auto h-16">
        <div className="flex h-[64px] items-center w-full justify-between">
          <div className="w-auto">
            <h1>Admin Panel</h1>
          </div>
          <div className="flex gap-4">
            <Link className="text-black text-xl font-bold" to={"/home"}>
            User List
            </Link>
          </div>
          <div>
            <LogOut
              onClick={handleLogout}
              color="#000"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
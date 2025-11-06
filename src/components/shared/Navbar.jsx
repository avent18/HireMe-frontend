/** @format */
import React from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl">
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl shadow-lg 
                      bg-white/20 backdrop-blur-xl border border-white/30">
        {/* Brand */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-white drop-shadow-md">
            Hire<span className="text-amber-400">Mee</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-white font-medium">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link to="/admin/companies" className="hover:text-amber-300">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/admin/jobs" className="hover:text-amber-300">
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="hover:text-amber-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-amber-300">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-amber-300">
                  Browse
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Auth buttons / Avatar */}
        {!user ? (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-white text-black hover:bg-white/20"
              >
                LogIn
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                SignUp
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer ring-2 ring-amber-400">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-4">
              <div className="flex gap-3 items-center mb-3">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
                <div>
                  <h4 className="font-semibold">{user?.fullname}</h4>
                  <p className="text-sm text-gray-500">
                    {user?.profile?.bio || "No bio"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-gray-700">
                {user.role === "student" && (
                  <div className="flex items-center gap-2">
                    <User2 size={18} />
                    <Link to="/profile">
                      <Button variant="link" className="text-gray-700">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <LogOut size={18} />
                  <Button
                    onClick={logoutHandler}
                    variant="link"
                    className="text-red-600"
                  >
                    LogOut
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;

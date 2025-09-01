import React from "react";
import { assets } from "./../assets/assets/assets";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";

const Navbar = () => {
  const navigate = useNavigate();
  const { logoutUser } = UserData();
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold ">
        <div className="flex items-center gap-2">
          <img
            src={assets.arrow_left}
            alt=""
            className="w-8 p-2 bg-black rounded-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <img
            src={assets.arrow_right}
            alt=""
            className="w-8 p-2 bg-black rounded-2xl cursor-pointer"
            onClick={() => navigate(+1)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Install App
          </p>
          <p
            className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer"
            onClick={logoutUser}
          >
            Logout
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">All</p>
        <p className="bg-black text-white px-4 py-1 rounded-2xl cursor-pointer hidden md:block">Music</p>
        <p className="bg-black text-white px-4 py-1 rounded-2xl cursor-pointer hidden md:block">Podcasts</p>
        <p className="bg-black text-white px-4 py-1 rounded-2xl cursor-pointer md:hidden" onClick={()=>navigate("/playlist")}>PlayList</p>
      </div>
    </>
  );
};

export default Navbar;

import React from "react";
import logo from "../assets/images/logo.png";
import signup from "../assets/icons/signup.png";
import login from "../assets/icons/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Header = ({ showBackButton }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-[51px] py-1.5 px-2 sticky top-0 z-40 flex justify-between items-center text-sm bg-primary">
      {showBackButton && (
          <button
            onClick={handleGoBack}
            className=" cursor-pointer ml-2 -mr-20"
          >
            <FontAwesomeIcon icon={faAngleLeft} className=" text-black text-4xl" />
          </button>
        )}
      <div>
        <Link to="/home"><img src={logo} alt="logo" width={84} height={26} /></Link>
      </div>
      <div className="flex space-x-2">
        <Link
          to="/signup"
          target="_blank"
          className="px-3 py-4 font-bold rounded flex gap-3 justify-center items-center bg-primary-dark text-white h-[26px] text-lg self-center"
        >
          <span>
            <img src={signup} alt="signup" className="w-5" />
          </span>
          SignUp
        </Link>
        <Link
          to="/login"
          className="px-3 py-4 font-bold rounded flex gap-3 justify-center items-center bg-[#e20000] text-white h-[26px] text-lg self-center"
        >
          <span>
            <img src={login} alt="login" className="w-5" />
          </span>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usernameIcon from "../assets/icons/user-login.png";
import passwordIcon from "../assets/icons/pass-login.png";
import validationIcon from "../assets/icons/shield (1).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";



const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1); // Navigate to the previous page
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const email = e.target[0].value;
  //   const password = e.target[1].value;

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     window.location.reload()
  //   } catch (err) {
  //     setErr(true);
  //   }
  // };
  return (
    <div className=" fixed left-0 right-0 top-0 bottom-0 z-50 max-w-[480px] mx-auto login-bg">
      <div className="w-full h-full bg-white rounded-t-xl py-6 flex items-center flex-col fixed top-[45%] left-0 right-0 max-w-[480px] mx-auto">
        <div className="formWrapper w-5/6">
          <h2 className=" text-center text-3xl text-black">LOGIN</h2>

          <form  className="flex flex-col gap-y-6 mt-3 sm:mt-6">
            <div className="relative">
              <input
                className="px-[10px] h-14 pl-12 rounded-lg w-full border border-gray-400 text-lg"
                type="email"
                placeholder="Email"
              />
              <img src={usernameIcon} className="absolute w-5 h-5 text-gray-400 left-3 top-[18px]" alt="email" />
            </div>
            <div className="relative">
              <input className="px-[10px] h-14 pl-12 rounded-lg w-full border border-gray-400 text-lg" type="password" placeholder="Password" />
              <img src={passwordIcon} className="absolute w-5 h-5 text-gray-400 left-3 top-[18px]" alt="email" />
            </div>
            <div className="relative">
              <input className="px-[10px] h-14 pl-12 rounded-lg w-full border border-gray-400 text-lg" type="password" placeholder="Validation Code" />
              <img src={validationIcon} className="absolute w-5 h-5 text-gray-400 left-3 top-[18px]" alt="validate" />
              <p className=" text-black font-bold text-4xl absolute right-2 top-1">12345</p>
            </div>
            <button className=" h-14 text-base font-bold bg-primary rounded text-black flex items-center justify-center w-1/2 mx-auto">Log In</button>
            {err && <span className="text-red-200">Something went wrong</span>}
          </form>
        </div>
      </div>
      <div onClick={goToPreviousPage} className=" w-9 h-9 rounded-full bg-white absolute left-2 top-2 flex items-center justify-center cursor-pointer">
        <FontAwesomeIcon icon={faArrowLeft} className=" text-[#1e1e1e] text-lg" />
      </div>
    </div>
  );
};

export default Login;

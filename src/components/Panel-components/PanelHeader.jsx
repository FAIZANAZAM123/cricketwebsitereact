import React from "react";
import logo from "../../assets/images/logo-cropped-orange.png";

const PanelHeader = ()=> {
  return(
    <div className=" w-full bg-[#1e1e1e] px-4 lg:px-40 h-[74px] flex justify-center">
      <div className=" flex justify-between items-center w-full">
        <div>
          <img src={logo} alt=" logo" className=" w-24" />
        </div>
        <div className=" flex items-center gap-4 text-white font-semibold text-base">
          <div>Username</div>
          <div>Credit</div>
        </div>
      </div>
    </div>
  )
}

export default PanelHeader
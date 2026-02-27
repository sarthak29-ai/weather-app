import React,{ memo } from "react";

const Logo = () => {
  return (
    <div className="sm:w-[160px] sm:h-[32px] w-[140px] h-auto">
      <img src="./src/assets/images/logo.svg" height="60" width="293" alt="wheather now logo image"/>
    </div>
  )
}

export default memo(Logo);
import React from "react";
import { logoIconList } from "../constants/index.js";

const LogoSection = () => {
  return (
    <div className="md:my-20 my-10 overflow-hidden relative">
      <div className="marquee h-32 flex items-center">
        <div className="marquee-box flex gap-10 whitespace-nowrap animate-marquee">
          {logoIconList.concat(logoIconList).map((icon, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center flex-none"
            >
              <img src={icon.imgPath} alt={icon.name} className="h-16 w-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSection;

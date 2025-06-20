import React from "react";

const Logo = ({className}) => {
  return (
    <h2 className={`font-logo text-xl md:text-2xl font-bold text-dark select-none ${className}`}>
      Blog by Ahsanul
    </h2>
  );
};

export default Logo;

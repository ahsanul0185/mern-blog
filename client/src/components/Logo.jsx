import React from "react";
import {twMerge} from "tailwind-merge";

const Logo = ({className}) => {
  return (
    <h2 className={twMerge(`font-logo text-xl md:text-2xl font-bold text-dark dark:text-gray-200 select-none`, className)}>
      Blog by Ahsanul
    </h2>
  );
};

export default Logo;

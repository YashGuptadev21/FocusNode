import clsx from "clsx";
import React from "react";
import Loading from "./Loader";

const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
  <button 
  type={type || "button"}
  className={clsx("px-3 py-2 outline-none rounded" , className)}
  onClick={onClick}
  aria-label={label}
  title={label}
  >
   
    <span>{label}</span>
    {icon && icon}
    </button>
    )
};

export default Button;

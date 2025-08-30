import React from "react";
import { FiUser } from "react-icons/fi";

export default function Avatar({ url, name, size = "md" }) {
  
  const sizeMap = {
    sm: "h-8 w-8",   
    md: "h-12 w-12", 
    lg: "h-16 w-16", 
    xl: "h-20 w-20", 
  };

  const sizeClass = sizeMap[size] || sizeMap.md;

  if (url)
    return (
      <img
        src={url}
        alt={name}
        className={`${sizeClass} rounded-xl object-cover`}
      />
    );

  return (
    <div className={`${sizeClass} rounded-xl grid place-items-center bg-white/10`}>
      <FiUser className="text-gray-400" size={20} />
    </div>
  );
}

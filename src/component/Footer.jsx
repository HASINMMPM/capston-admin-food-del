import React, { useContext } from "react";
import { Context } from "./Global/ContextList";

const Footer = () => {
  const { id } = useContext(Context);
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center  bg-primary w-full text-sm md:text-xl ">
      <p className="text-slate-100 ml-2">
        User ID: <span className="text-white">{id}</span>{" "}
      </p>
    </footer>
  );
};

export default Footer;

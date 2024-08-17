import React from "react";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosRestaurant } from "react-icons/io";
import { MdPendingActions } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";

const Sidebar = () => {
  const AdminIcon = () => <GrUserAdmin />;
  const resIcon = () => <IoIosRestaurant />;
  const resPendingIcon = () => <MdPendingActions />;
  const ShoppingCartIcon = () => <FaBoxOpen />;
  const foods = () => <IoFastFoodSharp />;

  const sideItems = [
    { label: "All Admins", icon: AdminIcon, href: "/alladmin" },
    { label: "Restaurent", icon: resIcon, href: "/allrestaurent" },
    {
      label: "Pending Restaurent",
      icon: resPendingIcon,
      href: "/verifyrestaurent",
    },
    { label: "Orders", icon: ShoppingCartIcon, href: "/orders" },
    { label: "All Foods", icon: foods, href: "/allfoods" },
  ];
  return (
    <div className=" w-16 lg:w-64  container">
   
      <aside
    
        className="  h-screen  bg-secondary"
      
      >
        <div className="h-full px-3 py-4 lg:py-16 overflow-y-auto  dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sideItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className=" gap-4 px-4 py-2 text-sm text-gray-900  hover:shadow-lg flex items-center duration-300"
                >
                  <span className="mr-0 md:mr-3  text-xl">
                    <item.icon />
                  </span>
                  <span className="hidden lg:block">
                  {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    
    </div>
  );
};

export default Sidebar;

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const list = [
    { name: "Products", link: "/products", icon: "/images/products-logo.svg" },
    {
      name: "Add Product",
      link: "/addProduct",
      icon: "/images/add-new-plus-logo.svg",
    },
  ];
  return (
    <div
      className={`transition-all duration-1000 ease-in relative bg-gradient-to-t from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-screen bg-black/30 shadow-lg shadow-black/50 ${
        isOpen ? "w-fit" : "w-[240px]"
      } rounded-lg p-4`}
    >
      <nav className="flex flex-col text-black text-lg font-bold gap-5 h-full">
        {list.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            tabIndex="0"
            className="w-full cursor-pointer hover:bg-black/40 focus:bg-black/40 focus:text-white rounded-xl p-4 flex flex-row gap-2 items-center"
          >
            <Image src={item.icon} alt={item.name} width={30} height={30} />
            <span className={isOpen ? "hidden" : ""}>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="absolute top-5 -right-4 shadow-lg hover:scale-110 flex justify-center items-center rounded-full p-2 bg-gradient-to-t from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Image
            src={"/images/collapse-left.svg"}
            alt="collapse"
            width={30}
            height={30}
            className={isOpen ? "rotate-180" : ""}
          />
        </button>
      </div>
    </div>
  );
};

export default SideBar;

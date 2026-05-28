"use client";

import { useEffect, useState } from "react";
import { getMenuByLocation } from "@/lib/wordpress";

export default function Header({ menuItems }: any) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`site-header header-element ${
        isSticky ? "sticky" : ""
      }`}
    >
      <div className="logo">
        <a href="/">
          <img
            src="https://grey-moose-264563.hostingersite.com/wp-content/uploads/2026/05/attachment7-1.png"
            alt="Port St. Mary's Marina"
            className="logo-img"
          />
        </a>
      </div>

      <nav>
        {menuItems?.map((item: any) => (
          <a
            key={item.ID || item.id}
            href={item.url}
            target={item.target || "_self"}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </header>
  );
}
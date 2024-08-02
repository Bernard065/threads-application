"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="footer">
      <div className="footer_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`footer_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                height={24}
                width={24}
                alt={link.label}
              />
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;

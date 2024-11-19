"use client";
import { Link } from "../../routing";
import Image from "next/image";
import React from "react";
import { usePathname } from "../../routing";
import User from "../icons/User.svg";
import Project from "../icons/Project.svg";
import Home from "../icons/Home.svg";
import { UserCog } from "lucide-react";
import { useTranslations } from "next-intl";

const navItems = [
  {
    link: "/Contractor",
    text: "Home",
    icon: <Home />,
  },
  {
    link: "/Contractor/ProjectDetails",
    text: "ProjectDetails",
    icon: <Project />,
  },
  {
    link: "/Contractor/WorkerDirectory",
    text: "WorkerDetails",
    icon: <User />,
  },
  {
    link: "/Contractor/Profile",
    text: "Profile",
    icon: <UserCog />,
  },
];

function AdminNav() {
  const pathName = usePathname();
  const t = useTranslations("AdminNav");
  return (
    <div className="px-6 py-4 w-full">
      <div className="flex items-center justify-around ">
        {navItems.map((item, key) => {
          const isActive =
            pathName === item.link ||
            (pathName.startsWith(item.link) && item.link !== "/Contractor");

          return (
            <Link
              key={key}
              href={item.link}
              className={`flex gap-1 flex-col items-center justify-center ${
                isActive
                  ? "text-primary stroke-primary"
                  : "text-inactive stroke-inactive"
              }`}
            >
              {item.icon}
              <p className="text-xs text-nowrap"> {t(item.text)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default AdminNav;

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

function WorkerNav() {
  const t = useTranslations("WorkerNav");
  const pathName = usePathname();

  const navItems = [
    {
      link: "/Worker",
      text: t("Home"),
      icon: <Home />,
    },
    {
      link: "/Worker/ProjectDetails",
      text: t("ProjectDetails"),
      icon: <Project />,
    },
    {
      link: "/Worker/WorkerDetails",
      text: t("WorkerDetails"),
      icon: <User />,
    },
    {
      link: "/Worker/Profile",
      text: t("Profile"),
      icon: <UserCog />,
    },
  ];

  return (
    <div className="px-6 py-4 w-full">
      <div className="flex items-center justify-around gap-6">
        {navItems.map((item, key) => {         
          const isActive =
            pathName === item.link ||
            (pathName.startsWith(item.link) && item.link !== "/Worker");

          return (
            <Link
              key={key}
              href={item.link}
              className={`flex gap-1 max-w-11 flex-col items-center justify-center ${
                isActive
                  ? "text-primary stroke-primary"
                  : "text-inactive stroke-inactive"
              }`}
            >
              {item.icon}
              <p className="text-xs text-nowrap">{item.text}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default WorkerNav;
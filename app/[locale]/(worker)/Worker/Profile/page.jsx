"use client";
import Image from "next/image";
import { Link } from "../../../../../routing";
import { ChevronRight } from "@mui/icons-material";
import { useState, useEffect } from "react";
import ProfileEdit from "../../../../icons/ProfileEdit";
import ChangeLanguage from "../../../../icons/ChangeLanguage";
import HelpCenter from "../../../../icons/HelpCenter";
import Logout from "../../../../icons/Logout";
import Privacy from "../../../../icons/Privacy";
import Rate from "../../../../icons/Rate";
import { useTranslations } from "next-intl";
import { logout } from "../../../../server/login";
import { useRouter } from "../../../../../routing";
import { getUser } from "../../../../server/user";

export default function Profile() {
  const [user, setUser1] = useState(null);

  const t = useTranslations("Profile");
  const router = useRouter();

  useEffect(() => {
    const getUser2 = async () => {
      const user = await getUser();
      console.log(user);
      setUser1(user);
    };
    getUser2();
  }, []);

  return (
    <main className="w-screen">
      <section className="nmdx:hidden flex flex-col h-full w-full px-6 py-8">
        <div className="mt-4 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Image
            src={user ? `${user.photoURL}` : ""}
            alt="Profile"
            width={100}
            height={100}
            className="h-32 w-32 object-cover rounded-full"
          />
          <div>
            <p className="text-3xl font-bold">
              {user ? user.fullName : "Loading ..."}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Link
              href="/Worker/Profile/ChangeLanguage"
              className="flex gap-3 items-center py-3"
            >
              <ChangeLanguage />
              <h1 className="font-bold flex-1">Change Language</h1>
              <ChevronRight />
            </Link>
            <button
              className="flex gap-3 items-center py-3"
              onClick={async () => {
                const { status, message } = await logout();
                if (status == "success") {
                  router.push("/");
                } else {
                  alert(message);
                }
              }}
            >
              <Logout />
              <h1 className="font-bold flex-1 text-[#F05A5A] text-start ">
                {t("LogOut")}
              </h1>
              <ChevronRight />
            </button>
          </div>
          <div className="py-8"></div>
        </div>
      </section>

      <section className="nmdx:flex h-screen flex-col justify-center text-center dark:text-white dark:bg-slate-900 w-full px-4 hidden">
        <span className="md:text-3xl sm:text-2xl text-xl uppercase font-semibold">
          Sorry This Part Of The Site Is Underdevelopment
        </span>
        <span className="md:text-lg text-xs uppercase mt-4">
          Please Use A Mobile Or Use Chrome Dev Tools To Switch To Mobile Screen
        </span>
      </section>
    </main>
  );
}

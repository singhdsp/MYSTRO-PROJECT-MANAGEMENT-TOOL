"use client";
import { Link } from "../../../../../../routing";
import { ArrowBackIosRounded } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "../../../../../../routing";

const LanguageSwitcher = () => {
  const router = useRouter();
  const handleChangeLanguage = (lang) => {
    // Set the new locale and navigate to the current path with the new locale
    router.replace("/Contractor", { locale: lang });
  };
  return (
    <main className="h-screen w-screen">
      <section className="nmdx:hidden h-full w-full pt-4 pb-10">
        <div className="h-full w-full flex flex-col">
          <div className="py-4 flex text-4xl items-center px-6 justify-between border-b border-[#E9ECF2]">
            <Link
              href="/Contractor/Profile"
              className="flex items-center justify-center z-50"
            >
              <ArrowBackIosRounded />
            </Link>
            <h1 className="text-xl font-bold w-full text-center -ml-9">
              Change Language
            </h1>
          </div>
          <div className="py-8 flex flex-col gap-4 notranslate">
            <div
              onClick={() => handleChangeLanguage("de")}
              className="flex px-8 py-4 items-center gap-4 border-b hover:border-b-black cursor-pointer"
            >
              <div>
                <Image
                  src={`/locales/de.png`}
                  alt="Flag"
                  width={24}
                  height={16}
                />
              </div>
              <h1 className="font-bold">German</h1>
            </div>
          </div>
          <div className="py-8 flex flex-col gap-4 notranslate">
            <div
              onClick={() => handleChangeLanguage("en")}
              className="flex px-8 py-4 items-center gap-4 border-b hover:border-b-black cursor-pointer"
            >
              <div>
                <Image
                  src={`/locales/en.png`}
                  alt="Flag"
                  width={24}
                  height={16}
                />
              </div>
              <h1 className="font-bold">English</h1>
            </div>
          </div>
          <div className="py-8 flex flex-col gap-4 notranslate">
            <div
              onClick={() => handleChangeLanguage("fr")}
              className="flex px-8 py-4 items-center gap-4 border-b hover:border-b-black cursor-pointer"
            >
              <div>
                <Image
                  src={`/locales/fr.png`}
                  alt="Flag"
                  width={24}
                  height={16}
                />
              </div>
              <h1 className="font-bold">French</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="nmdx:flex flex-col justify-center text-center dark:text-white dark:bg-slate-900 h-full w-full px-4 hidden">
        <span className="md:text-3xl sm:text-2xl text-xl uppercase font-bold">
          Sorry This Part Of The Site Is Underdevelopment
        </span>
        <span className="md:text-lg text-xs uppercase mt-4">
          Please Use A Mobile Or Use Chrome Dev Tools To Switch To Mobile Screen
        </span>
      </section>
    </main>
  );
};

export default LanguageSwitcher;

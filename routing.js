import {createSharedPathnamesNavigation} from 'next-intl/navigation';
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    // A list of all locales that are supported
    locales: ["en", "de", "fr"],

    // Used when no locale matches
    defaultLocale: "en",

    localePrefix: "as-needed",
  });

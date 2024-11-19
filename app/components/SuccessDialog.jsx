"use client";
import React from "react";
import Image from "next/image";
import Overlay from "./Overlay";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRouter } from "../../routing";
import { useTranslations } from "next-intl";

function SuccessDialog({ isOpen, setIsOpen }) {
  const router = useRouter();
  const t = useTranslations("SuccessDialog");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
   
    return () => clearTimeout(timer);
  }, []);

  return (
    <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="py-6">
            <svg
              width="150px"
              height="150px"
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Transparent or White Background */}
              <rect width="120" height="120" fill="white" fillOpacity="0.0" />

              {/* Circle Progress */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#00e400"
                strokeWidth="5"
                strokeDasharray="314"
                strokeDashoffset="314"
                strokeLinecap="round"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="314"
                  to="0"
                  dur="0.7s"
                  fill="freeze"
                />
              </circle>

              {/* Checkmark */}
              <polyline
                points="40,60 55,75 80,45"
                fill="none"
                stroke="#00e400"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="70"
                strokeDashoffset="70"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="70"
                  to="0"
                  begin="1s"
                  dur="0.3s"
                  fill="freeze"
                />
              </polyline>
            </svg>
          </div>
          <div
            className="w-full rounded-lg bg-primary py-4 text-center text-white font-semibold"
            onClick={() => router.back()}
          >
            {t("Done")}
          </div>
        </div>
      )}
    </Overlay>
  );
}

export default SuccessDialog;

import React from "react";
import { Link } from "../../../../routing";
import Image from "next/image";
import BackButton from "../../../components/BackButton";

function Page() {
  return (
      <div className="h-screen w-full">
        <section className="nmdx:hidden h-full w-full pt-4 pb-10">
          <div className="h-full w-full flex flex-col">
            <div className="py-4 flex text-4xl items-center px-6 justify-between border-b border-[#E9ECF2]">
              <div className="absolute -mt-1 -ml-3">
                <BackButton />
              </div>
              <h1 className="text-xl font-bold w-full text-center">
                Assign Members
              </h1>
            </div>
            <div className="space-y-3 mt-4 py-2 px-6">
              <div className="space-y-2">
                <h1 className="font-bold">Me</h1>
                <div className="flex space-x-2 py-3 border-b border-[#E9ECF2]">
                  <div>
                    <Image
                      src={"/user1.png"}
                      height={1920}
                      width={1080}
                      alt="userPhoto"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center">
                    <h1 className="font-bold text-sm">Azalea Nirmala</h1>
                    <h5 className="text-xs text-[#808D9E]">aza@gmail.com</h5>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="font-bold">A</h1>
                <div className="flex space-x-2 py-3 border-b border-[#E9ECF2]">
                  <div>
                    <Image
                      src={"/user1.png"}
                      height={1920}
                      width={1080}
                      alt="userPhoto"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center">
                    <h1 className="font-bold text-sm">Azalea Nirmala</h1>
                    <h5 className="text-xs text-[#808D9E]">aza@gmail.com</h5>
                  </div>
                </div>
                <div className="flex space-x-2 py-3 border-b border-[#E9ECF2]">
                  <div>
                    <Image
                      src={"/user2.png"}
                      height={1920}
                      width={1080}
                      alt="userPhoto"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center">
                    <h1 className="font-bold text-sm">Agus Subandono</h1>
                    <h5 className="text-xs text-[#808D9E]">agus@gmail.com</h5>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="font-bold">B</h1>
                <div className="flex space-x-2 py-3 border-b border-[#E9ECF2]">
                  <div>
                    <Image
                      src={"/user3.png"}
                      height={1920}
                      width={1080}
                      alt="userPhoto"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center">
                    <h1 className="font-bold text-sm">Bambang Sucat Pelat</h1>
                    <h5 className="text-xs text-[#808D9E]">
                      bambang@gmail.com
                    </h5>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="font-bold">D</h1>
                <div className="flex space-x-2 py-3 border-b border-[#E9ECF2]">
                  <div>
                    <Image
                      src={"/user4.png"}
                      height={1920}
                      width={1080}
                      alt="userPhoto"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center">
                    <h1 className="font-bold text-sm">Deby Amalina</h1>
                    <h5 className="text-xs text-[#808D9E]">deby@gmail.com</h5>
                  </div>
                </div>
                <div className="flex space-x-2 py-3 border-b border-[#E9ECF2]">
                  <div>
                    <Image
                      src={"/user5.png"}
                      height={1920}
                      width={1080}
                      alt="userPhoto"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center">
                    <h1 className="font-bold text-sm">Desi Sulawesi</h1>
                    <h5 className="text-xs text-[#808D9E]">desi@gmail.com</h5>
                  </div>
                </div>
                <div className="flex space-x-2 py-3 border-b border-[#E9ECF2]">
                  <div>
                    <Image
                      src={"/user6.png"}
                      height={1920}
                      width={1080}
                      alt="userPhoto"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center">
                    <h1 className="font-bold text-sm">Denisa Aduhai</h1>
                    <h5 className="text-xs text-[#808D9E]">denisa@gmail.com</h5>
                  </div>
                </div>
                <div className="flex space-x-2 py-3 border-b border-[#E9ECF2]">
                  <div>
                    <Image
                      src={"/user7.png"}
                      height={1920}
                      width={1080}
                      alt="userPhoto"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center">
                    <h1 className="font-bold text-sm">Dino Sambara</h1>
                    <h5 className="text-xs text-[#808D9E]">dino@gmail.com</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}

export default Page;

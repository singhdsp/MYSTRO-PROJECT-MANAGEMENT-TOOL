"use client";
import React from "react";
import Image from "next/image";
import Overlay from "./Overlay";

function ImageView({ imageList, type }) {
  const [index, setIndex] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const handleRightClick = () => {
    if (index < imageList.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const handleLeftClick = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(imageList.length - 1);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Image
        src="/ChevronLeft.svg"
        alt="Left"
        width={36}
        height={36}
        className="-mr-2"
        onClick={handleLeftClick}
      />
      <div
        className={`${
          imageList.length > 0
            ? type == "xl"
              ? "h-[85px] w-[85px]"
              : "h-[54px] w-[54px]"
            : type == "xl"
            ? "p-5"
            : "p-3"
        } bg-primary/10 rounded-2xl relative overflow-hidden`}
      >
        {imageList.length > 0 ? (
          <Image
            src={imageList[index]?.url}
            alt={type}
            fill
            sizes={type == "xl" ? "85px" : "54px"}
            className="object-cover"
            onClick={() => setIsOpen(true)}
          />
        ) : (
          <Image
            src="/Image.svg"
            alt="ImageIcon"
            width={type == "xl" ? 45 : 30}
            height={type == "xl" ? 45 : 30}
          />
        )}
      </div>
      <Image
        src="/ChevronRight.svg"
        alt="Right"
        width={36}
        height={36}
        className="-ml-2"
        onClick={handleRightClick}
      />
      <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="w-full mb-4">
          <Image
            src="/Close.svg"
            alt="edit"
            width="24"
            height="24"
            className="ml-auto"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="relative w-full h-auto">
          {imageList.length > 0 ? (
            <Image
              src={imageList[index]?.url}
              alt={type}
              layout="responsive"
              width={1}
              height={1}
              className="object-contain"
            />
          ) : (
            <Image
              src={"/Image.svg"}
              alt={type}
              layout="responsive"
              width={1}
              height={1}
              className="object-contain"
            />
          )}
        </div>
      </Overlay>
    </div>
  );
}

export default ImageView;

"use client";

import React, { useRef, useState } from "react";
import { uploadImage } from "../server/task";
import { useNotyf } from "../../hooks/useNotyf";
import Loader from "./Loader";
import { useTranslations } from "next-intl";

export default function ImageUploadButton({
  type,
  taskId,
  setRefreshing,
  refreshing,
}) {
  const fileInputRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const notyf = useNotyf();
  const t = useTranslations("ImageUploadButton");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    try {
      setProcessing(true);
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", type);
      formData.append("taskId", taskId);

      const { status, message } = await uploadImage(formData);
      if (status == "success") {
        notyf.success("Image Created");
        setRefreshing(refreshing + 1);
      } else {
        notyf.error("Failed");
      }
    } catch (error) {
      notyf.error("Error uploading image:", error);
    }
    setProcessing(false);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        disabled={processing}
        className="py-4 w-full bg-primary rounded-xl text-white"
      >
        {processing ? <Loader /> : t("UploadImage")}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
    </>
  );
}

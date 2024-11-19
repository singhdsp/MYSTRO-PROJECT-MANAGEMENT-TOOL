"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import { Camera, X, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { createOut } from "../server/attendance";
import { useNotyf } from "../../hooks/useNotyf";
import { useTranslations } from "next-intl";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function EndDay({
  isOpen,
  setIsOpen,
  id,
  refreshing,
  setRefreshing,
}) {
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const notyf = useNotyf();
  const t = useTranslations("EndDay");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    } else {
      setError("Failed to capture image. Please try again.");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    setError(null);

    try {     
      const response = await fetch(image);
      const blob = await response.blob();
     
      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");
      console.log("Id", id);
      formData.append("id", id);
     
      const result = await createOut(formData);

      if (result.status === "success") {        
        setIsOpen(false);
        setRefreshing(refreshing + 1);
        notyf.success("Image uploaded successfully");        
      } else {
        notyf.error(
          result.error || "Failed to upload image. Please try again."
        );
      }
    } catch (err) {
      notyf.error(
        "An error occurred while uploading the image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  console.log("Value received is", isOpen);

  return (
    <div
      className={`fixed pointer-events-auto top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999] ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <Card className="max-w-sm mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
          <CardTitle className="text-xl font-bold">{t('EndDay')}</CardTitle>
          <div className="w-6" /> {/* Spacer for alignment */}
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {image ? (
            <form onSubmit={handleSubmit} className="space-y-2 w-full">
              <div className="bg-primary p-4 rounded-lg flex items-center">
                <div className="bg-blue-100  p-3 rounded-full">
                  <Camera className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-3 flex-grow">
                  <h2 className="text-sm font-semibold text-white">
                    End/{new Date().toLocaleDateString()}
                  </h2>
                  <p className="text-xs text-white/70">{t('Imagecaptured')}</p>
                </div>
              </div>
              <div className="relative h-64 w-full">
                <Image
                  src={image}
                  alt="Captured photo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setImage(null)}
                type="button"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> {t('RetakePhoto')}
              </Button>
              <Button className="w-full" type="submit" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Submit"}
              </Button>
            </form>
          ) : (
            <div className="space-y-2">
              <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
                className="rounded-lg w-full"
              />
              <Button onClick={capture} className="w-full">
                <Camera className="mr-2 h-4 w-4" /> {t("CapturePhoto")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import React, { useState, useRef, useEffect } from "react";
import { Skeleton } from "../../components/ui/skeleton";
import Image from "next/image";
import { createCommentSmall } from "../server/comment";
import { uploadImage } from "../server/task";
import Overlay from "../components/Overlay";
import { Trash2 } from "lucide-react";
import AudioRecorder from "../components/AudioRecorder";
import { createAudioCommentSmall } from "../server/comment";
import { useNotyf } from "../../hooks/useNotyf";
import Loader from "./Loader";
import { useTranslations } from "next-intl";

function SmallComment({ taskId, refreshing, setRefreshing }) {
  const [comment, setComment] = useState("");
  const [commentAudio, setCommentAudio] = useState(null);
  const [openOverlayId, setOpenOverlayId] = useState(null);
  const fileInputRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const notyf = useNotyf();
  const t = useTranslations("SmallComment");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    setProcessing(true);
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", "AFTER_PHOTO");
      formData.append("taskId", taskId);

      const { status, message } = await uploadImage(formData);
      if (status == "success") {
        notyf.success("Image Created");
        setRefreshing(refreshing + 1);
      } else {
        notyf.error(message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setProcessing(false);
  };

  const handleAudioEnd = (audioURL, workerId) => {
    setCommentAudio(audioURL + ";" + workerId);
  };

  useEffect(() => {
    const postAudioComment = async () => {
      if (commentAudio) {
        setProcessing(true);
        const formData = new FormData();
        const a = commentAudio.split(";")[0];
        const commentAudioBlob = await fetch(a).then((r) => r.blob());
        formData.append("userId", commentAudio.split(";")[1]);
        formData.append("taskId", taskId);
        formData.append("audio", commentAudioBlob, "c_audio.webm");
        const { status, message } = await createAudioCommentSmall(formData);
        if (status == "success") {
          notyf.success(message);
          setRefreshing(refreshing + 1);
          console.log(message);
        } else {
          notyf.error(message);
          console.log(message);
        }
        setProcessing(false);
      }

      console.log("Called");
    };

    postAudioComment();
  }, [commentAudio]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {processing ? (
          <div className="bg-secondary rounded-lg p-4 flex items-center justify-center gap-1">
            <Loader color="#274DB2" />
          </div>
        ) : (
          <div className="bg-secondary rounded-lg p-2 flex items-center gap-1">
            <Image
              src="/Attachment.svg"
              alt="Attachment"
              width={24}
              height={24}
              onClick={handleButtonClick}
            />
            <AudioRecorder
              setAudioURLState={handleAudioEnd}
              workerId={"Something"}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
            <input
              type="text"
              placeholder={t("AddComment")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 ml-2 outline-none bg-transparent placeholder:text-placeholder"
            />
            <button
              onClick={async () => {
                try {
                  setProcessing(true);
                  const { status, message } = await createCommentSmall(
                    taskId,
                    comment
                  );
                  if (status === "success") {
                    setComment("");
                    notyf.success("Created Comment");
                    setRefreshing(refreshing + 1);
                  } else {
                    notyf.error(message);
                  }
                  setProcessing(false);
                } catch (e) {
                  notyf.error(e);
                }
              }}
            >
              <Image
                src="/Send.svg"
                alt="Send"
                className="max-w-max"
                width={39}
                height={39}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SmallComment;

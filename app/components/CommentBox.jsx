"use client";
import React, { useState, useRef, useEffect } from "react";
import { Skeleton } from "../../components/ui/skeleton";
import Image from "next/image";
import { createComment, deleteComment } from "../server/comment";
import { uploadImage } from "../server/task";
import Overlay from "../components/Overlay";
import { Trash, Trash2 } from "lucide-react";
import AudioRecorder from "../components/AudioRecorder";
import { createAudioComment } from "../server/comment";
import { useNotyf } from "../../hooks/useNotyf";
import Loader from "./Loader";
import { useTranslations } from "next-intl";

function CommentBox({ worker, taskId, taskHours, setRefreshing, refreshing }) {
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [commentAudio, setCommentAudio] = useState(null);
  const [audioWorkerId, setAudioWorkerId] = useState(null);
  const [openOverlayId, setOpenOverlayId] = useState(null);
  const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
  const [processing, setProcessing] = useState(false);
  const notyf = useNotyf();
  const t = useTranslations("CommentBox");

  const workerHours = taskHours.filter(
    (taskHour) => taskHour.userId === worker.id
  );

  const totalHours = workerHours.reduce(
    (sum, taskHour) => sum + taskHour.hours,
    0
  );

  const todayHours = workerHours
    .filter((taskHour) => taskHour.date.toISOString().split("T")[0] === today)
    .reduce((sum, taskHour) => sum + taskHour.hours, 0);
  const fileInputRef = useRef(null);

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
        notyf.error("Failed");
      }
    } catch (error) {
      notyf.error("Error uploading image:", error);
    }
    setProcessing(false);
  };

  const handleAudioEnd = (audioURL, workerId) => {
    setCommentAudio(audioURL + ";" + workerId);
  };

  useEffect(() => {
    const postAudioComment = async () => {
      if (commentAudio) {
        try {
          setProcessing(true);
          const formData = new FormData();
          const a = commentAudio.split(";")[0];
          const commentAudioBlob = await fetch(a).then((r) => r.blob());
          formData.append("userId", commentAudio.split(";")[1]);
          formData.append("taskId", taskId);
          formData.append("audio", commentAudioBlob, "c_audio.webm");
          const { status, message } = await createAudioComment(formData);
          if (status == "success") {
            notyf.success(message);
            setRefreshing(refreshing + 1);
            console.log(message);
          } else {
            notyf.error(message);
            console.log(message);
          }
          setProcessing(false);
        } catch (e) {
          notyf.error(e);
        }
      }

      console.log("Called");
    };

    postAudioComment();
  }, [commentAudio]);

  return (
    <div>
      <div className="px-8 pt-8 pb-4">
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center">
            <Image
              src={worker.photoURL}
              alt="User"
              width={66}
              height={66}
              className="rounded-full"
            />
            <h1 className="font-semibold">{worker.fullName}</h1>
          </div>
          <div className="font-semibold text-center">
            <h1>{t('HoursToday')}</h1>
            <h2 className="text-2xl">{todayHours}</h2>
          </div>
          <div className="font-semibold text-center">
            <h1>{t('TotalHours')}</h1>
            <h2 className="text-2xl">{totalHours}</h2>
          </div>
        </div>
      </div>
      <div className="px-6 flex flex-col gap-4">
        {worker.comments.length > 0 &&
          worker.comments
            .filter((comment) => comment.taskId === taskId)
            .map((comment, index) => (
              <div
                className="bg-[#DFE4F3] p-6 rounded-lg flex flex-col gap-1"
                key={comment.id}
              >
                <div className="flex justify-between items-center gap-2 text-sm">
                  <p className="font-bold text-lg">{comment.sender}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-inactive">
                      {new Date(comment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <Trash
                      size={20}
                      color="#7e8ca0"
                      onClick={() => setOpenOverlayId(comment.id)}
                    />
                  </div>
                </div>
                <p>{comment?.content}</p>
                {comment?.audioURL && (
                  <div className="py-2">
                    <audio src={comment?.audioURL} controls />
                  </div>
                )}
                <Overlay
                  isOpen={openOverlayId === comment.id}
                  setIsOpen={() => setOpenOverlayId(null)}
                >
                  <div>
                    <div className="flex flex-col gap-3 py-4 text-center">
                      <h1 className="font-semibold">{t('AreYouSure')}</h1>
                      <p className="text-danger text-xs">
                        {t('NoteSure')}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <div
                        className="font-semibold text-center py-3"
                        onClick={() => setOpenOverlayId(null)}
                      >
                       {t('Cancel')}
                      </div>
                      <button
                        className="py-3 bg-danger rounded-lg text-center text-white font-semibold"
                        onClick={async () => {
                          try {
                            setProcessing(true);
                            const { status, message } = await deleteComment(
                              comment.id
                            );
                            if (status === "success") {
                              notyf.success("Comment Deleted");
                              setRefreshing(refreshing + 1);
                            } else {
                              notyf.error("Failed");
                            }
                            setOpenOverlayId(null);
                          } catch (err) {
                            notyf.error(err);
                          }
                          setProcessing(false);
                        }}
                      >
                       {t("Delete")} 
                      </button>
                    </div>
                  </div>
                </Overlay>
              </div>
            ))}
        {processing ? (
          <div className="bg-secondary rounded-lg p-4 flex justify-center items-center gap-1">
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
              workerId={worker.id}
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
                  if (comment.length > 0) {
                    const { status, message } = await createComment(
                      taskId,
                      worker.id,
                      comment
                    );
                    if (status === "success") {
                      setComment("");
                      notyf.success("Created Comment");
                      setRefreshing(refreshing + 1);
                    } else {
                      notyf.error(message);
                    }
                  } else {
                    notyf.error("Comment cannot be empty");
                  }
                } catch (err) {
                  notyf.error(err);
                }
                setProcessing(false);
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

export default CommentBox;

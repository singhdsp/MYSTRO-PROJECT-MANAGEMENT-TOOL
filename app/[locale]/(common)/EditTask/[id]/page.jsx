"use client";
import React, { useState, useEffect, useRef } from "react";
import BackButton from "../../../../components/BackButton";
import Image from "next/image";
import SelectTeam from "../../../../components/SelectTeam";
import AvatarView from "../../../../components/AvatarView";
import { editTask, deleteTask, getTask } from "../../../../server/task";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { useNotyf } from "../../../../../hooks/useNotyf";
import Loader from "../../../../components/Loader";
import { useParams, useRouter } from "next/navigation";
import Overlay from "../../../../components/Overlay";
import AudioRecorder from "../../../../components/AudioRecorder";
import { ImageIcon, ImageMinus, Trash2Icon } from "lucide-react";
import { getUser } from "../../../../server/user";
import { useTranslations } from "next-intl";

function EditTask() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [team, setTeam] = useState([]);
  const [teamMenuOpen, setTeamMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [nameAudio, setNameAudio] = useState(null);
  const [descAudio, setDescAudio] = useState(null);
  const [descPhoto, setDescPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const notyf = useNotyf();
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState(null);
  const taskId = params.id;
  const t = useTranslations("EditTask");

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const taskData = await getTask(taskId, new Date());
        setTaskName(taskData.name);
        setTaskDescription(taskData.description);
        setTeam(taskData.members);
        setNameAudio(taskData.nameAudioURL);
        setDescAudio(taskData.descAudio);
        setDescPhoto(taskData.descPhoto);
        setLoading(false);
      } catch (error) {
        console.log(error);
        notyf.error("Failed to load task data");
        setLoading(false);
      }
    };

    const getUserData = async () => {
        const user =  await getUser()
        setUser(user)
    };
    
    getUserData();
    fetchTaskData();
  }, [taskId, notyf]);

  const validateTaskName = (name) => {
    return name.length >= 4;
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDescPhoto(file);
    }
  };

  const blobUrlToFile = async (blobUrl, fileName) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const handleEditTask = async () => {
    let newErrors = {};

    if (!validateTaskName(taskName)) {
      newErrors.taskName = "Task name should be at least 4 characters long.";
    }

    if (team.length === 0) {
      newErrors.team = "At least one team member is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append("name", taskName);
      formData.append("description", taskDescription);
      formData.append(
        "members",
        JSON.stringify(team.map((member) => member.id))
      );

      if (descPhoto instanceof File) {
        formData.append("descPhoto", descPhoto);
      } else if (descPhoto) {
        formData.append("descPhoto", descPhoto);
      }

      if (nameAudio) {
        if (nameAudio instanceof File) {
          formData.append("nameAudioURL", nameAudio);
        } else if (nameAudio.startsWith("blob:")) {
          const audioFile = await blobUrlToFile(nameAudio, "nameAudio.webm");
          formData.append("nameAudioURL", audioFile);
        } else {
          formData.append("nameAudioURL", nameAudio);
        }
      }

      if (descAudio) {
        if (descAudio instanceof File) {
          formData.append("descAudio", descAudio);
        } else if (descAudio.startsWith("blob:")) {
          const audioFile = await blobUrlToFile(descAudio, "descAudio.webm");
          formData.append("descAudio", audioFile);
        } else {
          formData.append("descAudio", descAudio);
        }
      }

      const { status, message, task } = await editTask(taskId, formData);
      if (status === "success") {
        notyf.success(message);
        router.replace("/TaskDetails/" + taskId);
      } else {
        notyf.error(message);
      }
    } catch (err) {
      notyf.error(err.message);
    }
    setProcessing(false);
  };

  const handleDeleteTask = async () => {
    setProcessing(true);
    try {
      const { status, message } = await deleteTask(taskId);
      if (status === "success") {
        notyf.success(message);
        router.replace(`/${user.role}/ProjectDetails`) // Redirect to project details or tasks list
      } else {
        notyf.error(message);
      }
    } catch (err) {
      notyf.error(err.message);
    }
    setProcessing(false);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <section className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="border-b border-b-secondary">
        <div className="p-4 flex items-center justify-center relative">
          <BackButton className={"absolute left-0"} />
          <h1 className="text-lg font-bold">{t('EditTask')}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-6 flex flex-col justify-center overflow-y-auto">
        {loading ? (
          <Skeleton className="w-full h-12 mb-4" />
        ) : (
          <>
            <div className="mb-4">
              <h1 className="font-semibold mb-2">{t('TaskName')} :</h1>
              <div className="w-full flex items-center gap-2">
                <input
                  type="text"
                  placeholder={t('TaskName')}
                  value={taskName}
                  onChange={handleTaskNameChange}
                  className={`w-full px-4 py-3 font-semibold bg-secondary placeholder:text-placeholder rounded-md ${
                    errors.taskName ? "border-red-500" : ""
                  }`}
                />
                {nameAudio ? (
                  <button
                    onClick={() => setNameAudio(null)}
                    className="bg-red-600 p-3 rounded-full text-white"
                  >
                    <Trash2Icon size={20} />
                  </button>
                ) : (
                  <AudioRecorder setAudioURLState={setNameAudio} />
                )}
              </div>
              {nameAudio && (
                <div className="flex items-center justify-between mt-2">
                  <audio controls src={nameAudio} />
                </div>
              )}
              {errors.taskName && (
                <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>
              )}
            </div>
            <div className="mb-4">
              <h1 className="font-semibold mb-2">{t('TaskDescription')} :</h1>
              <div className="w-full flex items-center gap-2">
                <textarea
                  placeholder={t('TaskDescription')}
                  value={taskDescription}
                  onChange={handleTaskDescriptionChange}
                  className="w-full px-4 py-3 font-semibold bg-secondary placeholder:text-placeholder rounded-md"
                  rows="4"
                />
                <div className="flex flex-col justify-center items-center gap-2">
                  {descAudio ? (
                    <button
                      onClick={() => setDescAudio(null)}
                      className="bg-red-600 p-3 rounded-full text-white"
                    >
                      <Trash2Icon size={20} />
                    </button>
                  ) : (
                    <AudioRecorder setAudioURLState={setDescAudio} />
                  )}
                  {descPhoto ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setDescPhoto(null)}
                        className="bg-red-600 p-3 rounded-full text-white"
                      >
                        <ImageMinus size={20} />
                      </button>
                    </div>
                  ) : (
                    <ImageIcon
                      size={24}
                      className="text-gray-400"
                      onClick={(e) => fileInputRef.current.click()}
                    />
                  )}
                </div>
              </div>
              <div className="mt-2">
                {descPhoto && typeof descPhoto === "string" && (
                  <Image
                    src={descPhoto}
                    alt="Description"
                    className="rounded-md"
                    width={100}
                    height={100}
                  />
                )}
                {descPhoto && typeof descPhoto !== "string" && (
                  <Image
                    src={URL.createObjectURL(descPhoto)}
                    alt="Description"
                     className="rounded-md"
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageSelect}
                className="w-full hidden"
              />
              {descAudio && (
                <div className="flex items-center space-x-2 mt-2">
                  <audio controls src={descAudio} />
                </div>
              )}
            </div>
          </>
        )}
        <div className="my-2">
          <h3 className="text-lg font-semibold mb-3 ml-1">{!loading && t('EditTeamMembers')}</h3>
          <div className="flex justify-between items-center space-x-2">
            {loading ? (
              <Skeleton className="w-36 h-9" />
            ) : team.length > 0 ? (
              <AvatarView users={team} />
            ) : null}
            {loading ? (
              <Skeleton className="w-9 h-9" />
            ) : (
              <Image
                src="/UserPlus.svg"
                alt="Add User"
                width={36}
                height={36}
                onClick={() => setTeamMenuOpen(true)}
              />
            )}
          </div>
          <SelectTeam
            isOpen={teamMenuOpen}
            setIsOpen={setTeamMenuOpen}
            team={team.length > 0 ? team : []}
            onClose={setTeam}
          />
          {errors.team && (
            <p className="text-red-500 text-sm mt-1">{errors.team}</p>
          )}
        </div>
      </div>

      <div className="mt-auto mb-4 w-full px-4 space-y-2">
        {loading ? (
          <Skeleton className="w-full h-12" />
        ) : (
          <>
            <button
              className="bg-primary px-4 py-3 text-white font-semibold text-center rounded-md w-full disabled:opacity-50"
              disabled={processing}
              onClick={handleEditTask}
            >
              {processing ? <Loader /> : t('SaveChanges')}
            </button>
            <button
              className="bg-red-500 px-4 py-3 text-white font-semibold text-center rounded-md w-full disabled:opacity-50"
              disabled={processing}
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              {t('DeleteTask')}
            </button>
          </>
        )}
      </div>

      <Overlay isOpen={isDeleteConfirmOpen} setIsOpen={setIsDeleteConfirmOpen}>
        <h1 className="text-center font-bold text-lg pt-3">{t('DeleteTask')}</h1>
        <p className="text-sm py-4 text-center font-medium">
         {t('DeleteConfirm')}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="font-semibold py-3 rounded-lg"
            onClick={() => setIsDeleteConfirmOpen(false)}
          >
            {t('Cancel')}
          </button>
          <button
            className="bg-red-500 text-white font-semibold py-3 rounded-lg disabled:bg-red-300"
            disabled={processing}
            onClick={handleDeleteTask}
          >
            {processing ? <Loader /> : t('Delete')}
          </button>
        </div>
      </Overlay>
    </section>
  );
}

export default EditTask;

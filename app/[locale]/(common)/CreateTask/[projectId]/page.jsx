/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import DatePicker from "../../../../components/DatePicker";
import { useRouter } from "../../../../../routing";
import AvatarView from "../../../../components/AvatarView";
import SelectTeam from "../../../../components/SelectTeam";
import { createTasks } from "../../../../server/task";
import { useParams } from "next/navigation";
import AudioRecorder from "../../../../components/AudioRecorder";
import { Skeleton } from "../../../../../components/ui/skeleton";
import Loader from "../../../../components/Loader";
import { useNotyf } from "../../../../../hooks/useNotyf";
import { getUser } from "../../../../server/user";
import { DeleteIcon, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

function Page() {
  const router = useRouter();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [team, setTeam] = useState([]);
  const [teamMenuOpen, setTeamMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [taskAudio, setTaskAudio] = useState(null);
  const [descAudio, setDescAudio] = useState(null);
  const fileInputRef = useRef(null);
  const params = useParams();
  const projectId = params.projectId;
  const [loading, setLoading] = useState(true);
  const notyf = useNotyf();
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const t = useTranslations("CreateTask");  

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userData = await getUser();
        if (userData) {
          setUser(userData);
        } else {
          router.replace('/');
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        router.replace('/');
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, [router]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate task name
    if (!taskName.trim()) {
      errors.taskName = "Task name is required";
      isValid = false;
    } else if (taskName.trim().length < 4) {
      errors.taskName = "Task name must be at least 4 characters long";
      isValid = false;
    } else if (!/^[a-zA-Z0-9 ]+$/.test(taskName)) {
      errors.taskName = "Task name can only contain letters, numbers, and spaces";
      isValid = false;
    }

    // Validate description
    if (!description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    // Validate date
    if (!date) {
      errors.date = "Start date is required";
      isValid = false;
    }

    // Validate team
    if (team.length === 0) {
      errors.team = "At least one team member is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleDeleteTaskAudio = () => {
    setTaskAudio(null);
  };

  const handleDeleteDescAudio = () => {
    setDescAudio(null);
  };

  const handleCreateTask = async () => {
    if (!validateForm()) {
      notyf.error("Please correct the errors in the form");
      return;
    }

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append("taskName", taskName);
      formData.append("description", description);
      formData.append("team", JSON.stringify(team));
      formData.append("date", new Date(date).toISOString());
      formData.append("projectId", projectId);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      // Append task audio if available
      if (taskAudio) {
        const taskAudioBlob = await fetch(taskAudio).then((r) => r.blob());
        formData.append("taskAudio", taskAudioBlob, "task_audio.webm");
      }

      // Append description audio if available
      if (descAudio) {
        const descAudioBlob = await fetch(descAudio).then((r) => r.blob());
        formData.append("descAudio", descAudioBlob, "desc_audio.webm");
      }

      const { status, message, taskId } = await createTasks(formData);
      if (status === "success") {
        setDate();
        setTaskName("");
        setDescription("");
        setTeam([]);
        setSelectedImage(null);
        setTaskAudio(null);
        setDescAudio(null);
        notyf.success("Task Created");
        router.replace(`/TaskDetails/${taskId}`);
      } else {
        notyf.error(message);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      notyf.error("Task creation failed");
    }

    setProcessing(false);
  };

  return (
    <div className="min-h-screen pb-4 flex flex-col px-6">
      <div className="py-4 flex items-center justify-center gap-2 border-b-2 border-b-secondary relative">
        <Image
          src="/Close.svg"
          alt="Left"
          width={24}
          height={24}
          className="absolute left-4"
          onClick={() => router.back()}
        />
        <h1 className="font-bold text-xl">{t('Create Task')}</h1>
      </div>
      <div className="my-3 font-semibold flex flex-col gap-3">
        <h1>{t('Task Name')}</h1>
        {loading ? (
          <Skeleton className="w-full h-12" />
        ) : (
          <div className="flex w-full items-center bg-secondary rounded-lg p-2">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder={t('Task Name')}
              className="flex-1 p-2 bg-secondary placeholder:text-placeholder"
            />
            <AudioRecorder setAudioURLState={setTaskAudio} />
          </div>
        )}
        {errors.taskName && <p className="text-red-500 text-sm">{errors.taskName}</p>}
        {taskAudio && (
          <div className="flex items-center gap-2">
            <audio controls src={taskAudio} />
            <button
              onClick={handleDeleteTaskAudio}
              className="bg-red-500 text-white p-3 rounded-full"
            >
              <Trash2/>
            </button>
          </div>
        )}
      </div>
      
      <div className="font-semibold flex flex-col gap-3 my-3">
        <h1>{t('Description')}</h1>
        {loading ? (
          <Skeleton className="w-full h-12" />
        ) : (
          <div className="flex w-full items-center bg-secondary rounded-lg p-2">
            <input
              type="text"
              placeholder={t('AddDescription')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 p-2 bg-secondary placeholder:text-placeholder"
            />
            <AudioRecorder setAudioURLState={setDescAudio} />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageSelect}
            />
            <Image
              src="/ImageGray.svg"
              alt="Image"
              width={29}
              height={29}
              onClick={() => fileInputRef.current.click()}
              className="cursor-pointer"
            />
          </div>
        )}
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        {descAudio && (
          <div className="flex items-center gap-2">
            <audio controls src={descAudio} />
            <button
              onClick={handleDeleteDescAudio}
              className="bg-red-500 text-white p-3 rounded-full"
            >
              <Trash2/>
            </button>
          </div>
        )}
        {selectedImage && (
          <div className="mt-2">
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              width={100}
              height={100}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
      <div className="my-3">
        <h3 className="text-lg font-semibold mb-3 ml-1">{t('AddTeamMembers')}</h3>
        {loading ? (
          <Skeleton className="w-full h-12" />
        ) : (
          <div className="flex justify-between items-center space-x-2">
            {team.length > 0 ? <AvatarView users={team} /> : null}
            <Image
              src="/UserPlus.svg"
              alt="Add User"
              width={36}
              height={36}
              onClick={() => setTeamMenuOpen(true)}
            />
          </div>
        )}
        {errors.team && <p className="text-red-500 text-sm">{errors.team}</p>}
        <SelectTeam
          isOpen={teamMenuOpen}
          setIsOpen={setTeamMenuOpen}
          team={team}
          onClose={setTeam}
          isTask={true}
          projectid={projectId}
        />
      </div>
      <div className="font-semibold flex flex-col gap-3 my-3">
        <h1>{t('StartDate')}</h1>
        {loading ? (
          <Skeleton className="w-full h-12" />
        ) : (
          <DatePicker date={date} setDate={setDate} />
        )}
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>
      <div className="my-3">
        {loading ? (
          <Skeleton className="w-full h-12" />
        ) : (
          <button
            className="mt-auto w-full rounded-lg py-4 text-center font-semibold bg-primary text-white"
            disabled={processing}
            onClick={handleCreateTask}
          >
            {processing ? <Loader /> : <p>{t('Confirm')}</p>}
          </button>
        )}
      </div>
    </div>
  );
}

export default Page;
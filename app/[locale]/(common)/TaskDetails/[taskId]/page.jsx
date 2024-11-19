/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import BackButton from "../../../../components/BackButton";
import DatePicker from "../../../../components/DateSelector";
import SelectStatus from "../../../../components/SelectStatusDetail";
import Image from "next/image";
import ImageView from "../../../../components/ImageView";
import { getTask } from "../../../../server/task";
import { useParams } from "next/navigation";
import { Skeleton } from "../../../../../components/ui/skeleton";
import CommentBox from "../../../../components/CommentBox";
import ImageUploadButton from "../../../../components/ImageUploadButton";
import Overlay from "../../../../../app/components/Overlay";
import { changeStatus, updateTaskHours } from "../../../../server/task";
import { useNotyf } from "../../../../../hooks/useNotyf";
import Loader from "../../../../components/Loader";
import Link from "next/link";
import { useTranslations } from "next-intl";

function Page() {
  const [task, setTask] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const params = useParams();
  const taskId = params.taskId;
  const [isOpen, setIsOpen] = useState(false);
  const [taskState, setTaskState] = useState("Off");
  const [startTime, setStartTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(true);
  const notyf = useNotyf();
  const [processing, setProcessing] = useState(null);
  const [refreshing, setRefreshing] = useState(0);
  const t = useTranslations("TaskDetails");

  // Load task data
  const getTaskData = useCallback(async () => {
    setLoading(true);
    try {
      const tasks = await getTask(taskId, selectedDate);
      setTask(tasks);
      setTaskStatus({ selector: tasks.status });
    } catch (error) {
      console.error('Error fetching task:', error);
    }
    setLoading(false);
  }, [taskId, selectedDate]);

  // Initial load
  useEffect(() => {
    getTaskData();
  }, [getTaskData]);

  // Refresh data when needed
  useEffect(() => {
    if (refreshing > 0) {
      getTaskData();
    }
  }, [refreshing, getTaskData]);

  // Load saved task state
  useEffect(() => {
    const savedTaskState = localStorage.getItem("taskState");
    const savedStartTime = localStorage.getItem("startTime");

    if (savedTaskState) {
      setTaskState(savedTaskState);
    }
    if (savedStartTime) {
      setStartTime(new Date(savedStartTime));
    }
  }, []);

  // Monitor task status changes
  useEffect(() => {
    if (task && taskStatus && taskStatus.selector !== task.status) {
      setIsOpen(true);
    }
  }, [taskStatus, task]);

  const startTask = useCallback(() => {
    const currentTime = new Date();
    setTaskState("On");
    setStartTime(currentTime);
    localStorage.setItem("taskState", "On");
    localStorage.setItem("startTime", currentTime.toISOString());
  }, []);

  const pauseTask = useCallback(async () => {
    if (!startTime) return;
    
    setProcessing("pauseTask");
    setTaskState("Off");
    localStorage.setItem("taskState", "Off");

    const currentTime = new Date();
    const diffMs = currentTime - new Date(startTime);
    const diffHours = diffMs / (1000 * 60 * 60);
    
    let roundedHours = diffHours < 1 ? 1 : Math.floor(diffHours) + (diffHours % 1 >= 0.5 ? 1 : 0);

    try {
      const { status, message } = await updateTaskHours(taskId, roundedHours);
      if (status === "success") {
        notyf.success(message);
        setRefreshing(prev => prev + 1);
      } else {
        notyf.error(message);
      }
    } catch (error) {
      notyf.error("Error updating task hours");
    }
    setProcessing(null);
  }, [startTime, taskId, notyf]);

  return (
    <section className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="border-b-2 border-b-secondary">
        <div className="p-4 flex items-center justify-center relative">
          <BackButton className={"absolute left-0"} />
          {loading ? (
            <Skeleton className="h-6 w-60" />
          ) : (
            <h1 className="text-lg font-bold flex items-center justify-center">
              <span className="inline-block text-end truncate w-[120px]">
                {task?.name}
              </span>
              <span className="px-1">:</span>
              <span className="inline-block truncate w-[120px]">
                {task?.project.name}
              </span>
            </h1>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-4">
        <DatePicker updateDate={setSelectedDate} />
      </div>
      <div className="px-6 py-4">
        {loading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <div>
            {taskState === "On" ? (
              <button
                className="w-full rounded-lg py-4 text-center bg-danger text-white"
                disabled={processing === "pauseTask"}
                onClick={pauseTask}
              >
                {processing === "pauseTask" ? <Loader /> : t("PauseTask")}
              </button>
            ) : (
              <div
                className="w-full rounded-lg py-4 text-center bg-primary text-white"
                onClick={startTask}
              >
               {t('StartTask')}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="px-6">
        {loading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <Link
            className="py-3 flex items-center justify-center font-semibold gap-4 rounded-lg border-2 border-primary text-primary"
            href={`/EditTask/${taskId}`}
          >
           {t('EditTask')}
          </Link>
        )}
      </div>
      <div className="flex gap-2 items-center justify-between px-6 my-6">
        <h1 className="font-semibold">{t('Status')}</h1>
        {loading ? (
          <Skeleton className="h-[36px] w-[200px]" />
        ) : (
          <SelectStatus
            taskStatus={taskStatus ?? { selector: "Not_Yet_Started" }}
            setTaskStatus={setTaskStatus}
          />
        )}
        <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
          <h1 className="text-center font-bold text-lg pt-3">{t('ChangeStatus')}</h1>
          <p className="text-lg py-4 text-center font-medium">
            {taskStatus?.selector == "Completed" && (
              <span className="text-danger text-sm">
                {t('ChangeStatusNote')}
              </span>
            )}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              className="font-semibold py-3 rounded-lg"
              onClick={() => {
                setTaskStatus({ selector: task?.status });
                setIsOpen(false);
              }}
            >
              {t('Cancel')}
            </button>
            <button
              className="bg-primary text-white font-semibold py-3 rounded-lg disabled:bg-blue-300"
              disabled={
                taskStatus?.selector === "Completed" &&
                (task.photos.filter((photo) => photo.type === "BEFORE_PHOTO")
                  .length < 1 ||
                  task.photos.filter((photo) => photo.type === "AFTER_PHOTO")
                    .length < 1)
              }
              onClick={async () => {
                setProcessing("changeStatus");
                const { status, message } = await changeStatus(
                  taskId,
                  taskStatus?.selector
                );
                if (status == "success") {
                  notyf.success(message);
                  setRefreshing(refreshing + 1);
                } else {
                  notyf.error(message);
                }
                setProcessing(null);
                setIsOpen(false);
              }}
            >
              {processing === "changeStatus" ? <Loader /> : t("Save")}
            </button>
          </div>
        </Overlay>
      </div>
      {loading ? (
        <Skeleton className="h-16 w-full mx-6" />
      ) : (
        task?.nameAudioURL && (
          <div className="px-6 my-4 gap-2 flex flex-col justify-between">
            <h1 className="font-semibold">{t('TaskNameAudio')} </h1>
            <audio
              src={task?.nameAudioURL ? task?.nameAudioURL : ""}
              controls
            ></audio>
          </div>
        )
      )}
      <div className="flex flex-col gap-4 px-6">
        <h1 className="font-semibold">{t('Description')}</h1>
        {loading ? (
          <Skeleton className="h-[128px] w-full" />
        ) : (
          <>
            <p className="p-4 bg-secondary rounded-xl">{task.description}</p>
            {task?.descPhoto && (
              <div className="mt-2 w-full relative h-0 pb-[56.25%]">
                <Image
                  src={task.descPhoto}
                  alt="Selected"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}
            {task?.descAudio && (
              <div className="gap-2 flex flex-col justify-between">
                <h1 className="font-semibold">{t('TaskDescriptionAudio')} </h1>
                <audio
                  src={task?.descAudio ? task?.descAudio : ""}
                  controls
                ></audio>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex justify-between items-center px-6 text-center font-semibold my-6">
        {loading ? (
          <>
            <Skeleton className="h-40 w-1/2 mr-2" />
            <Skeleton className="h-40 w-1/2 ml-2" />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="font-semibold">{t('Before')}</div>
              <ImageView
                imageList={
                  task.photos.filter(
                    (photo) => photo.type === "BEFORE_PHOTO"
                  ) || []
                }
                type="xl"
              />
              <div className="px-3">
                <ImageUploadButton
                  type="BEFORE_PHOTO"
                  taskId={task?.id}
                  setRefreshing={setRefreshing}
                  refreshing={refreshing}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-semibold">{t('After')}</div>
              <ImageView
                imageList={
                  task.photos.filter((photo) => photo.type === "AFTER_PHOTO") ||
                  []
                }
                type="xl"
              />
              <div className="px-3">
                <ImageUploadButton
                  type="AFTER_PHOTO"
                  taskId={task?.id}
                  setRefreshing={setRefreshing}
                  refreshing={refreshing}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {loading ? (
        <Skeleton className="h-[351px] w-full mx-6" />
      ) : (
        task.members
          .filter((member) => member.role === "Worker")
          .map((member, index) => (
            <CommentBox
              key={index}
              worker={member}
              taskId={task.id}
              taskHours={task.taskHours}
              setRefreshing={setRefreshing}
              refreshing={refreshing}
            />
          ))
      )}

      <div className="px-6 py-8 font-semibold text-white">
        {loading ? (
          <Skeleton className="h-16 w-full" />
        ) : (
          <div className="bg-primary w-full rounded-xl p-3 flex justify-between items-center">
            <h1>{t('TotalHours')}</h1>
            <p className="text-2xl">
              {task.taskHours.reduce(
                (sum, taskHour) => sum + taskHour.hours,
                0
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Page;

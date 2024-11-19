/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import DatePicker from "../../../../../components/DateSelector";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import SelectStatus from "../../../../../components/SelectStatus";
import TaskList from "../../../../../components/TaskList";
import { Link } from "../../../../../../routing";
import { ImageList } from "@mui/material";
import ImageView from "../../../../../components/ImageView";
import { getTasksWithStatus } from "../../../../../server/project";
import { useParams } from "next/navigation";
import SmallComment from "../../../../../components/SmallComment";
import { Skeleton } from "../../../../../../components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import { useTranslations } from "next-intl";

function ProjectDetails() {
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const [index, setIndex] = useState(0);
  const [taskStatus, setTasksStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const projectId = params.projectid;
  const [refreshing, setRefreshing] = useState(0);
  const router = useRouter();
  const t = useTranslations("WorkerProjectDetails");

  useEffect(() => {
    const getProjectsData = async () => {
      setLoading(true);
      const projects = await getTasksWithStatus(selectedDate);
      console.log(projects.projects);
      setProjects(projects.projects);
      setUserId(projects.userid);
      setLoading(false);
    };
    getProjectsData();
  }, [selectedDate]);

  useEffect(() => {
    const getProjectsData = async () => {
      const projects = await getTasksWithStatus(selectedDate);
      console.log(projects.projects);
      setProjects(projects.projects);
      setUserId(projects.userid);
      setLoading(false);
    };
    getProjectsData();
  }, [refreshing]);

  useEffect(() => {
    const index = projects.findIndex((project) => project.id === projectId);
    setIndex(index !== -1 ? index : 0);
  }, [projectId, projects]);

  const handleRightClick = () => {
    if (projects.length > 0) {
      if (index < projects.length - 1) {
        router.push(`/Worker/ProjectDetails/${projects[index + 1].id}`);
      } else {
        router.push(`/Worker/ProjectDetails/${projects[0].id}`);
      }
    }
  };

  const handleLeftClick = () => {
   if(projects.length > 0) {
      if (index > 0) {
        router.push(`/Worker/ProjectDetails/${projects[index - 1].id}`);
      } else {
        router.push(`/Worker/ProjectDetails/${projects[projects.length - 1].id}`);
      }
    }
  };

  const getColor = (status) => {
    switch (status) {
      case "Not_Yet_Started":
        return "warning";
      case "In_Progress":
        return "info";
      case "Completed":
        return "success";
      case "Blocked":
        return "danger";
    }
  };

  return (
    <div className="w-full h-full flex flex-col pt-4">
      <div className="p-4 flex items-center justify-center gap-2 border-b border-b-secondary">
        <Image
          src="/LeftDouble.svg"
          alt="Left"
          width={40}
          height={33}
          onClick={handleLeftClick}
        />
        {loading ? (
          <Skeleton className="h-8 w-48" />
        ) : (
          <h1 className="font-bold text-xl">
            {projects?.length > 0 ? projects[index].name : ""}
          </h1>
        )}
        <Image
          src="/RightDouble.svg"
          alt="Right"
          width={40}
          height={33}
          onClick={handleRightClick}
        />
      </div>
      <div className="flex-1 flex flex-col px-4 pb-4">
        <div className="px-2 my-4">
          <DatePicker updateDate={setSelectedDate} />
        </div>
        <div className="px-2 py-4">
          <SelectStatus setTaskStatus={setTasksStatus} />
        </div>
        <div>
          {loading ? (
            Array(3)
              .fill()
              .map((_, i) => (
                <div key={i} className="py-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                  <Skeleton className="h-32 w-full mt-4" />
                </div>
              ))
          ) : (
            <>
              {" "}
              {taskStatus?.selector !== "All" ? (
                <>
                  {projects[index]?.tasks
                    ?.filter((task) => task.status === taskStatus?.selector)
                    .map((task, index) => {
                      console.log(task);
                      return (
                        <div className="py-4" key={index}>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="flex items-center justify-center">
                              <div
                                className={`py-3 w-full text-center text-white bg-${getColor(
                                  task.status
                                )} rounded-lg relative truncate whitespace-nowrap px-1`}
                                onClick={() =>
                                  (window.location.href =
                                    "/TaskDetails/" + task.id)
                                }
                              >
                                {task.name}
                                {!task.readUsers?.length ||
                                !task.readUsers.some(
                                  (user) => user.id === userId
                                ) ? (
                                  <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                                ) : null}
                              </div>
                            </div>
                            <div className="flex items-center justify-center">
                              <ImageView
                                imageList={
                                  task.photos?.length > 0
                                    ? task.photos.filter(
                                        (photo) => photo.type === "BEFORE_PHOTO"
                                      )
                                    : []
                                }
                                type="sm"
                              />
                            </div>
                            <div className="flex items-center justify-center">
                              <ImageView
                                imageList={
                                  task.photos?.length > 0
                                    ? task.photos.filter(
                                        (photo) => photo.type === "AFTER_PHOTO"
                                      )
                                    : []
                                }
                                type="sm"
                              />
                            </div>
                          </div>
                          <div className="py-4 max-h-[200px] overflow-y-auto">
                            {task?.comments?.map((comment, index) => (
                              <div
                                className="bg-[#DFE4F3] p-6 mt-3 rounded-lg flex flex-col gap-2"
                                key={index}
                              >
                                <div className="flex justify-between items-center gap-2 text-sm">
                                  <p className="font-bold text-lg">
                                    {comment.sender}
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <p className="text-inactive">
                                      {new Date(
                                        comment.date
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <p>{comment?.content}</p>
                                {comment?.audioURL && (
                                  <div className="py-2">
                                    <audio src={comment?.audioURL} controls />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          <SmallComment
                            taskId={task.id}
                            refreshing={refreshing}
                            setRefreshing={setRefreshing}
                          />
                        </div>
                      );
                    })}
                </>
              ) : (
                <>
                  {projects[index]?.tasks?.map((task, index) => {
                    console.log(task);
                    return (
                      <div className="py-4" key={index}>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex items-center justify-center">
                            <div
                              className={`py-3 w-full text-center text-white bg-${getColor(
                                task.status
                              )} rounded-lg relative truncate whitespace-nowrap px-1`}
                              onClick={() =>
                                (window.location.href =
                                  "/TaskDetails/" + task.id)
                              }
                            >
                              {task.name}
                              {!task.readUsers?.length ||
                              !task.readUsers.some(
                                (user) => user.id === userId
                              ) ? (
                                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <ImageView
                              imageList={
                                task.photos?.length > 0
                                  ? task.photos.filter(
                                      (photo) => photo.type === "BEFORE_PHOTO"
                                    )
                                  : []
                              }
                              type="sm"
                            />
                          </div>
                          <div className="flex items-center justify-center">
                            <ImageView
                              imageList={
                                task.photos?.length > 0
                                  ? task.photos.filter(
                                      (photo) => photo.type === "AFTER_PHOTO"
                                    )
                                  : []
                              }
                              type="sm"
                            />
                          </div>
                        </div>
                        <div className="py-4 max-h-[200px] overflow-y-auto">
                          {task?.comments?.map((comment, index) => (
                            <div
                              className="bg-[#DFE4F3] p-6 mt-3 rounded-lg flex flex-col gap-2"
                              key={index}
                            >
                              <div className="flex justify-between items-center gap-2 text-sm">
                                <p className="font-bold text-lg">
                                  {comment.sender}
                                </p>
                                <div className="flex items-center gap-3">
                                  <p className="text-inactive">
                                    {new Date(comment.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>
                              <p>{comment?.content}</p>
                              {comment?.audioURL && (
                                <div className="py-2">
                                  <audio src={comment?.audioURL} controls />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <SmallComment
                          taskId={task.id}
                          refreshing={refreshing}
                          setRefreshing={setRefreshing}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
        <Link
          href={
            loading
              ? ""
              : `/CreateTask/${projects.length > 0 ? projects[index].id : ""}`
          }
          className="border-2 border-primary p-2 rounded-lg mt-auto"
        >
          <p className="flex items-center justify-center gap-2 p-2 font-semibold text-primary">
            <Image src="/Add.svg" alt="Add" width={20} height={20} /> {t('CreateTask')}
          </p>
        </Link>
        <Link
          href={loading ? "" : `/EditProject/${projects.length > 0 ? projects[index].id : ""}`}
          className="bg-primary p-2 rounded-lg mt-2"
        >
          <p className="flex items-center justify-center gap-2 p-2 font-semibold text-white">
            <Edit/> {t('EditProject')}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ProjectDetails;

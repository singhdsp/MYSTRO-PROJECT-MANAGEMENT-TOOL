"use client";
import DatePicker from "../../../../components/DateSelector";
import Image from "next/image";
import React, { useState, useEffect, use } from "react";
import SelectStatus from "../../../../components/SelectStatus";
import TaskList from "../../../../components/TaskList";
import { Link } from "../../../../../routing";
import { getTasksWithStatus } from "../../../../server/project";
import { useParams } from "next/navigation";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { Edit } from "lucide-react";
import { useTranslations } from "next-intl";

function ProjectDetails() {
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const [index, setIndex] = useState(0);
  const [taskStatus, setTasksStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(true);
  const t = useTranslations("ContractorProjectDetails1");

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

  const handleRightClick = () => {
    if (index < projects.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const handleLeftClick = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(projects.length - 1);
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
          <Skeleton className="h-8 w-40" />
        ) : (
          <h1 className="font-bold text-xl">
            {projects.length > 0 ? projects[index].name : ""}
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
          <DatePicker startDate={new Date(projects[index]?.startDate)} updateDate={setSelectedDate} />
        </div>
        <div className="px-2 py-4">
          <SelectStatus setTaskStatus={setTasksStatus} />
        </div>
        <div className="py-4 max-h-[350px] overflow-y-auto">
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <TaskList
              tasks={projects.length > 0 ? projects[index].tasks : []}
              taskStatus={taskStatus}
              userid={userId}
            />
          )}
        </div>
        <Link
          href={loading ? "" : `/CreateTask/${projects.length > 0 ? projects[index].id : ""}`}
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
"use client";

import React, { useState, useEffect } from "react";
import { getProject } from "../../../../../../../server/project";
import { useParams } from "next/navigation";
import Link from "next/link";
import AvatarView from "../../../../../../../components/AvatarView";
import { addUserToTask } from "../../../../../../../server/task";
import { getUserCanAssignTasks } from "../../../../../../../server/user";
import BackButton from "../../../../../../../components/BackButton";
import { Skeleton } from "../../../../../../../../components/ui/skeleton";
import { useNotyf } from "../../../../../../../../hooks/useNotyf";
import { useTranslations } from "next-intl";

function Page() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const params = useParams();
  const id = params.id;
  const notyf = useNotyf();
  const t = useTranslations("ContractorAssignTask");

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

  useEffect(() => {
    const getTask = async () => {
      const task = await getUserCanAssignTasks(params.userid, id);
      console.log(task);
      setProject(task);
      setLoading(false);
    };
    getTask();
  }, [params.userid, id, refresh]);

  return (
    <div className="min-h-screen px-6 py-4 flex flex-col gap-4">
      <div className="py-3 flex items-center justify-center relative">
        <div className="absolute left-0">
          <BackButton className={"!p-1"} />
        </div>
        <h1 className="font-bold text-xl text-center">{t('ChooseTask')}</h1>
      </div>
      <div className="flex-1 flex flex-col overflow-y-scroll gap-2">
        {loading ? (
          <SkeletonTasks />
        ) : project?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold">{t('Tasks')}</div>
            <div className="font-semibold col-span-2">{t('Description')}</div>
            {project?.map((task, index) => (
              <React.Fragment key={index}>
                <div
                  onClick={async () => {
                    const { status, message } = await addUserToTask(
                      task.id,
                      params.userid,
                      id
                    );
                    if(status === "success"){
                      notyf.success(message);
                      setRefresh(!refresh);
                    }else{
                      notyf.error(message);
                    }
                  }}
                  className={`p-2 relative rounded-lg flex items-center justify-center text-white bg-${getColor(
                    task.status
                  )}`}
                >
                  <span className="truncate">{task.name}</span>
                </div>
                <div className="p-4 border rounded-lg flex items-center gap-1 col-span-2 w-full">
                  <span className="truncate">{task.description}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex-1 flex items-center justify-center">
            <p className="font-semibold">{t('NoTask')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SkeletonTasks() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-40 col-span-2" />
      {[...Array(5)].map((_, index) => (
        <React.Fragment key={index}>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full col-span-2" />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Page;

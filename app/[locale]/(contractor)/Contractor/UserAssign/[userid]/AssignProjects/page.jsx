"use client";

import React, { useState, useEffect } from "react";
import { getUserCanAssignProjects } from "../../../../../../server/user";
import AvatarView from "../../../../../../components/AvatarView";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import BackButton from "../../../../../../components/BackButton";
import { Skeleton } from "../../../../../../../components/ui/skeleton";
import { useTranslations } from "next-intl";

function Page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const userid = params.userid;
  const t = useTranslations("ContractorAssignProjects")

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserCanAssignProjects(userid);
      console.log(user);
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen px-6 py-4 flex flex-col gap-4">
      <div className="py-3 flex items-center justify-center relative">
        <div className="absolute left-0">
          <BackButton className={"!p-1"} />
        </div>
        <h1 className="font-bold text-xl text-center">{t('ChooseProject')}</h1>
      </div>
      <div className="flex flex-col flex-1">
        <div className="w-full py-4 overflow-y-auto mb-2">
          {loading ? (
            <SkeletonTable />
          ) : user?.projects?.length > 0 ? (
            <table className="w-full table-auto table">
              <thead>
                <tr>
                  <th className="text-start">{t('ProjectName')}</th>
                  <th>{t('Status')}</th>
                  <th>{t('Hours')}</th>
                </tr>
              </thead>
              <tbody>
                {user?.projects?.map((project, key) => (
                  <tr key={key}>
                    <td className="py-2 pr-2">
                      <div className="relative w-fit">
                        <div
                          onClick={() =>
                            (window.location.href =
                              "/Contractor/UserAssign/" +
                              userid +
                              "/AssignTask/" +
                              project.id)
                          }
                          className="text-white p-4 rounded-lg bg-primary relative font-medium text-ellipsis overflow-hidden whitespace-nowrap w-[170px] "
                        >
                          {project.name}
                        </div>
                      </div>
                    </td>
                    <td className="text-center font-medium">
                      {
                        project?.tasks?.filter((t) => t.status ==  "Completed")
                          .length
                      }
                      /{project?.tasks?.length}
                    </td>
                    <td className="text-center font-medium">
                      {project?.taskHours?.reduce(
                        (sum, task) => sum + task.hours,
                        0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex-1 flex justify-center items-center">
              <h1 className="font-bold">{t('NoProjectAvailable')}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex justify-between mb-4">
          <Skeleton className="h-10 w-[170px]" />
          <Skeleton className="h-10 w-[50px]" />
          <Skeleton className="h-10 w-[50px]" />
        </div>
      ))}
    </div>
  );
}

export default Page;
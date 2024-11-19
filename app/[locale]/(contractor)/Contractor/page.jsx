"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Link } from "../../../../routing";
import { useTranslations } from 'next-intl';
import DatePicker from "../../../components/DateSelector";
import { getActiveProjectsWithTaskInfo } from "../../../server/project";
import { Skeleton } from "../../../../components/ui/skeleton";

export default function Page() {
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const t = useTranslations("Index");
  
  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      const projects = await getActiveProjectsWithTaskInfo(selectedDate);
      setPageData(projects);
      setLoading(false);
    }
    getProject();
  }, [selectedDate]);

  const SkeletonRow = () => (
    <tr>
      <td className="py-2 pr-2">
        <Skeleton className="h-14 w-[170px] rounded-lg" />
      </td>
      <td className="text-center">
        <Skeleton className="h-6 w-20 mx-auto" />
      </td>
      <td className="text-center">
        <Skeleton className="h-6 w-16 mx-auto" />
      </td>
    </tr>
  );

  return (
    <section className="w-full h-full px-6 py-4 flex flex-col">
      <div className="flex flex-col gap-1 items-center">
        <Image src="/logo.png" alt="logo" width={131} height={42} />
        <h1 className="text-xl font-bold text-center">
          {t('Admin_Title')}
        </h1>
      </div>
      <div className="w-full py-8">
        <DatePicker updateDate={setSelectedDate}/>
      </div>
      <div className="w-full py-4 max-h-[600px] overflow-y-auto mb-2">
        <table className="w-full table-auto table">
          <thead>
            <tr>
              <th className="text-start">{t('Admin_ProjectName')}</th>
              <th>{t('Admin_Status')}</th>
              <th>{t('Admin_Hours')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(5).fill(0).map((_, index) => <SkeletonRow key={index} />)
            ) : (
              pageData.map((project, key) => (
                <tr key={key}>
                  <td className="py-2 pr-2">
                    <div className="relative w-fit">
                      <div onClick={() => window.location.href = `/Contractor/ProjectDetails/${project.id}`} className="text-white p-4 rounded-lg bg-primary relative font-medium text-ellipsis overflow-hidden whitespace-nowrap w-[170px] cursor-pointer">
                        {project.name}
                      </div>
                    </div>
                  </td>
                  <td className="text-center font-medium">
                    {project.taskCompletion}
                  </td>
                  <td className="text-center font-medium">{project.totalHours}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Link
        href="/CreateProject"
        className="border-2 border-primary p-4 rounded-lg mt-auto"
      >
        <p className="flex items-center justify-center gap-2 font-semibold text-primary">
          <span>
            <Image src="/Add.svg" alt="Add" width={20} height={20} />
          </span>{" "}
          {t('Admin_CreateProject')}
        </p>
      </Link>
    </section>
  );
}
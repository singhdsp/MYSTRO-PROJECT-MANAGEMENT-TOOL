"use client";

import DatePicker from "../../../../components/DateSelector";
import TaskView from "../../../../components/TaskView";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getUserFullWithDate } from "../../../../server/user";
import StartDay from "../../../../components/StartDay";
import EndDay from "../../../../components/EndDay";
import Overlay from "../../../../components/Overlay";
import { X } from "lucide-react";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { useTranslations } from "next-intl";

function WorkerDetails() {
  const [user, setUser] = useState(null);
  const [startDayOpen, setStartDayOpen] = useState(false);
  const [endDayOpen, setEndDayOpen] = useState(false);
  const [startPhotoOpen, setStartPhotoOpen] = useState(false);
  const [endPhotoOpen, setEndPhotoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(true);
  const t = useTranslations("WorkerWorkerDetails");

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const userData = await getUserFullWithDate(selectedDate);
      console.log(userData);
      setUser(userData);
      setLoading(false);
    };
    getUserData();
  }, [selectedDate]);

  // Helper functions
  const isSameDay = (date1, date2) =>
    date1.toDateString() === date2.toDateString();

  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const getStartOfLastWeek = (date) => {
    const startOfThisWeek = getStartOfWeek(date);
    return new Date(startOfThisWeek.setDate(startOfThisWeek.getDate() - 7));
  };

  const getEndOfLastWeek = (date) => {
    const startOfLastWeek = getStartOfLastWeek(date);
    return new Date(startOfLastWeek.setDate(startOfLastWeek.getDate() + 6));
  };


  const today = new Date();

 
  const todayTaskHours = user?.TaskHours.filter((task) =>
    isSameDay(new Date(task.date), today)
  ).reduce((total, task) => total + task.hours, 0);

 
  const startOfThisWeek = getStartOfWeek(today);
  const thisWeekTaskHours = user?.TaskHours.filter(
    (task) =>
      new Date(task.date) >= startOfThisWeek && new Date(task.date) <= today
  ).reduce((total, task) => total + task.hours, 0);

  
  const startOfLastWeek = getStartOfLastWeek(today);
  const endOfLastWeek = getEndOfLastWeek(today);
  const lastWeekTaskHours = user?.TaskHours.filter(
    (task) =>
      new Date(task.date) >= startOfLastWeek &&
      new Date(task.date) <= endOfLastWeek
  ).reduce((total, task) => total + task.hours, 0);

  return (
    <div className="w-full h-full flex flex-col pt-4 gap-4 px-6">
      <div className="p-4 flex items-center justify-center gap-2 border-b border-b-secondary">
        <h1 className="font-bold text-xl">{t('WorkerDetails')}</h1>
      </div>
      <DatePicker updateDate={setSelectedDate} />
      {loading ? (
        <Skeleton className="h-12 w-full" />
      ) : user ? (
        <div className="grid grid-cols-7 gap-2 items-center">
          <div className="col-span-1 font-semibold">
            <p>{t('Day')}</p>
          </div>
          <div className="col-span-3 flex gap-1">
            <div className="py-3 bg-secondary rounded-md text-center flex-1">
              {user?.Attendace?.length > 0
                ? new Date(user?.Attendace[0].inTime).toLocaleTimeString(
                    "en-US",
                    { hour: "numeric", minute: "numeric", hour12: true }
                  )
                : "N/A"}
            </div>
            {user?.Attendace?.[0]?.inTime ? (
              <Image
                src="/Attachment.svg"
                alt="Attachment"
                width={24}
                height={24}
                onClick={() => setStartPhotoOpen(true)}
              />
            ) : null}
            <Overlay isOpen={startPhotoOpen}>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">{t('StartDayPhoto')}</h1>
                  <X onClick={() => setStartPhotoOpen(false)} />
                </div>
                <div className="relative w-full h-auto">
                  <Image
                    src={user?.Attendace[0]?.inTimePhotoURL ? user?.Attendace[0]?.inTimePhotoURL : "/Attachment.svg"}
                    alt={"In Photo"}
                    layout="responsive"
                    width={1}
                    height={1}
                    className="object-contain"
                  />
                </div>
              </div>
            </Overlay>
          </div>
          <div className="col-span-3 flex gap-1">
            <div className="py-3 bg-secondary rounded-md text-center flex-1">
              {user?.Attendace?.[0]?.outTime
                ? new Date(user.Attendace[0].outTime).toLocaleTimeString(
                    "en-US",
                    { hour: "numeric", minute: "numeric", hour12: true }
                  )
                : "N/A"}
            </div>
            {user?.Attendace?.[0]?.outTime ? (
              <Image
                src="/Attachment.svg"
                alt="Attachment"
                width={24}
                height={24}
                onClick={() => setEndPhotoOpen(true)}
              />
            ) : null}

            <Overlay isOpen={endPhotoOpen}>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">{t('EndDayPhoto')}</h1>
                  <X onClick={() => setEndPhotoOpen(false)} />
                </div>
                <div className="relative w-full h-auto">
                  <Image
                    src={user?.Attendace[0]?.outTimePhotoURL ? user?.Attendace[0]?.outTimePhotoURL : "/Attachment.svg"}
                    alt={"Out Photo"}
                    layout="responsive"
                    width={1}
                    height={1}
                    className="object-contain"
                  />
                </div>
              </div>
            </Overlay>
          </div>
        </div>
      ) : null}
      {loading ? (
        <div className="grid grid-cols-7 gap-2 py-4 text-center font-semibold">
          <div className="col-span-1"></div>
          <div className="col-span-2">
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="col-span-1">
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-2 py-4 text-center font-semibold">
          <div className="col-span-1"></div>
          <div className="col-span-2">
            <p className="text-sm">{t('Today')}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm">{t('ThisWeek')}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm">{t('LastWeek')}</p>
          </div>
          <div className="col-span-1">
            <p className="text-sm text-start">{t('Hours')}</p>
          </div>
          <div className="col-span-2">
            <p className="text-2xl">{todayTaskHours}</p>
          </div>
          <div className="col-span-2">
            <p className="text-2xl">{thisWeekTaskHours}</p>
          </div>
          <div className="col-span-2">
            <p className="text-2xl">{lastWeekTaskHours}</p>
          </div>
        </div>
      )}
      <TaskView tasks={user ? user.tasks : []} />
    </div>
  );
}

export default WorkerDetails;

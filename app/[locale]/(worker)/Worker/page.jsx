/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DatePicker from "../../../components/DateSelector";
import { getUserFull } from "../../../server/user";
import StarDay from "../../../components/StartDay";
import EndDay from "../../../components/EndDay";
import Overlay from "../../../components/Overlay";
import { X } from "lucide-react";
import { getActiveProjectsWithTaskInfo } from "../../../server/project";
import { Skeleton } from "../../../../components/ui/skeleton";
import { useTranslations } from "next-intl";

function WorkerHome() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [startDayOpen, setStartDayOpen] = useState(false);
  const [endDayOpen, setEndDayOpen] = useState(false);
  const [startPhotoOpen, setStartPhotoOpen] = useState(false);
  const [endPhotoOpen, setEndPhotoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(0);
  const t = useTranslations("WorkerHome");

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const userData = await getUserFull();
      const projects = await getActiveProjectsWithTaskInfo(selectedDate);
      console.log(userData);
      setUser(userData);
      setProjects(projects);
      setLoading(false);
    };
    getUser();
  }, [selectedDate]);

  useEffect(() => {
    const getUser = async () => {
      const userData = await getUserFull();
      const projects = await getActiveProjectsWithTaskInfo(selectedDate);
      console.log(userData);
      setUser(userData);
      setProjects(projects);
      setLoading(false);
    };
    getUser();
  }, [refreshing]);

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
    <section className="w-full h-full px-6 py-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Image src="/logo.png" alt="logo" width={131} height={42} />
        <h1 className="text-xl font-bold">{t('Welcome')}</h1>
      </div>
      <div className="py-4">
        <DatePicker updateDate={setSelectedDate} />
      </div>
      {loading ? (
        <div className="grid grid-cols-7 gap-2 items-center">
          <div className="col-span-1 font-semibold">
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="col-span-3">
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="col-span-3">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      ) : user ? (
        <div className="grid grid-cols-7 gap-2 items-center">
          <div className="col-span-1 font-semibold">
            <p>{t('Day')}</p>
          </div>
          <div className="col-span-3">
            {!user?.Attendace?.length > 0 ? (
              <button
                className="py-3 bg-primary rounded-md text-center text-white w-full"
                onClick={() => {
                  setStartDayOpen(true);
                  console.log("Value Set");
                }}
              >
                {t('StartPhoto')}
              </button>
            ) : user.Attendace[0].inTime != null ? (
              <div className="w-full flex gap-1">
                <div className="py-3 bg-secondary rounded-md text-center flex-1">
                  {new Date(user?.Attendace[0].inTime).toLocaleTimeString(
                    "en-US",
                    { hour: "numeric", minute: "numeric", hour12: true }
                  )}
                </div>
                <Image
                  src="/Attachment.svg"
                  alt="Attachment"
                  width={24}
                  height={24}
                  onClick={() => setStartPhotoOpen(true)}
                />
              </div>
            ) : (
              <button
                className="py-3 bg-primary rounded-md text-center text-white w-full"
                onClick={() => {
                  setStartDayOpen(true);
                  console.log("Value Set");
                }}
              >
                {t('StartPhoto')}
              </button>
            )}
            <StarDay
              isOpen={startDayOpen}
              setIsOpen={setStartDayOpen}
              refreshing={refreshing}
              setRefreshing={setRefreshing}
            />
            <Overlay isOpen={startPhotoOpen}>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">{t('StartDayPhoto')}</h1>
                  <X onClick={() => setStartPhotoOpen(false)} />
                </div>
                <div className="relative w-full h-auto">
                  <Image
                    src={user?.Attendace[0]?.inTimePhotoURL}
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
          <div className="col-span-3">
            {!user?.Attendace?.length > 0 ? (
              <button
                className="py-3 bg-danger rounded-md text-center text-white w-full"
                onClick={() => {
                  setEndDayOpen(true);
                  console.log("Value Set");
                }}
              >
                {t('EndPhoto')}
              </button>
            ) : user.Attendace[0].outTime != null ? (
              <div className="w-full flex gap-1">
                <div className="py-3 bg-secondary rounded-md text-center flex-1">
                  {new Date(user?.Attendace[0].outTime).toLocaleTimeString(
                    "en-US",
                    { hour: "numeric", minute: "numeric", hour12: true }
                  )}
                </div>
                <Image
                  src="/Attachment.svg"
                  alt="Attachment"
                  width={24}
                  height={24}
                  onClick={() => setEndPhotoOpen(true)}
                />
              </div>
            ) : (
              <button
                className="py-3 bg-danger rounded-md text-center text-white w-full"
                onClick={() => {
                  setEndDayOpen(true);
                  console.log("Value Set");
                }}
              >
                {t('EndPhoto')}
              </button>
            )}
            <EndDay
              isOpen={endDayOpen}
              setIsOpen={setEndDayOpen}
              id={user?.Attendace[0]?.id}
              refreshing={refreshing}
              setRefreshing={setRefreshing}
            />
            <Overlay isOpen={endPhotoOpen}>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">{t('EndDayPhoto')}</h1>
                  <X onClick={() => setEndPhotoOpen(false)} />
                </div>
                <div className="relative w-full h-auto">
                  <Image
                    src={
                      user?.Attendace[0]?.outTimePhotoURL || "/Attachment.svg"
                    }
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

      <div>
        <h1 className="font-semibold mb-2">{t('ProjectsForBoss')}</h1>
        <div className="flex flex-col gap-2 text-white text-center max-h-[350px] overflow-y-auto py-8">
          {loading
            ? Array(3)
                .fill()
                .map((_, index) => (
                  <Skeleton key={index} className="h-14 w-full" />
                ))
            : projects
            ? projects?.map((project, index) => (
                <div
                  className="py-4 bg-primary rounded-lg"
                  key={index}
                  onClick={() =>
                    (window.location.href =
                      "/Worker/ProjectDetails/" + project.id)
                  }
                >
                  <p>{project.name}</p>
                </div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}

export default WorkerHome;

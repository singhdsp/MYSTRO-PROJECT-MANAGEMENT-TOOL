/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "../../../../../components/DateSelector";
import Image from "next/image";
import TaskView from "../../../../../components/TaskView";
import { getWorker, saveNotesRate } from "../../../../../server/user";
import { useParams } from "next/navigation";
import Overlay from "../../../../../components/Overlay";
import { X } from "lucide-react";
import { Skeleton } from "../../../../../../components/ui/skeleton";
import { useNotyf } from "../../../../../../hooks/useNotyf";
import Loader from "../../../../../components/Loader";
import { useTranslations } from "next-intl";

function Page() {
  const [worker, setWorker] = useState(null);
  const [rate, setRate] = useState(0);
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [endPhotoOpen, setEndPhotoOpen] = useState(false);
  const [startPhotoOpen, setStartPhotoOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const workerId = params.workerId;
  const [processing, setProcessing] = useState(false);
  const notyf = useNotyf();
  const [refreshing, setRefreshing] = useState(0);
  const t = useTranslations("ContractorWorkerDetails");

  useEffect(() => {
    const getWorkerById = async () => {
      setLoading(true);
      const worker = await getWorker(workerId, resetTimeToStartOfDay(selectedDate));
      console.log(resetTimeToStartOfDay(selectedDate), "selected date");
      setWorker(worker);
      setRate(worker.rate);
      setNotes(worker.notes);
      setLoading(false);
    };
    getWorkerById();
  }, [selectedDate, workerId]);

  useEffect(() => {
    const getWorkerById = async () => {
      const worker = await getWorker(workerId, resetTimeToStartOfDay(selectedDate));
      console.log(resetTimeToStartOfDay(selectedDate), "selected date refresh");
      setWorker(worker);
      setRate(worker.rate);
      setNotes(worker.notes);
      setLoading(false);
    };
    getWorkerById();
  }, [refreshing]);

  // Helper functions
  const isSameDay = (date1, date2) =>
    date1.toDateString() === date2.toDateString();

  const resetTimeToStartOfDay = (dateString) => {
    const date = new Date(dateString); 
    date.setUTCHours(0, 0, 0, 0); 
    return date.toISOString(); 
  };

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

  const todayTaskHours = worker?.TaskHours.filter((task) =>
    isSameDay(new Date(task.date), today)
  ).reduce((total, task) => total + task.hours, 0);

 
  const startOfThisWeek = getStartOfWeek(today);
  const thisWeekTaskHours = worker?.TaskHours.filter(
    (task) =>
      new Date(task.date) >= startOfThisWeek && new Date(task.date) <= today
  ).reduce((total, task) => total + task.hours, 0);

  
  const startOfLastWeek = getStartOfLastWeek(today);
  const endOfLastWeek = getEndOfLastWeek(today);
  const lastWeekTaskHours = worker?.TaskHours.filter(
    (task) =>
      new Date(task.date) >= startOfLastWeek &&
      new Date(task.date) <= endOfLastWeek
  ).reduce((total, task) => total + task.hours, 0);

  return (
    <div className="w-full h-full flex flex-col py-4 gap-4 px-6">
      <div className="p-4 flex items-center justify-center gap-2 border-b border-b-secondary">
        <h1 className="font-bold text-xl">{t('WorkerDetails')}</h1>
      </div>
      <DatePicker updateDate={setSelectedDate} />
      <div className="grid grid-cols-7 gap-2 items-center">
        <div className="col-span-1 text-center font-semibold"></div>
        <div className="col-span-3">
          <div className="text-center font-semibold w-min whitespace-break-spaces ml-auto mr-auto">
            {t('StartTimestamp')}
          </div>
        </div>
        <div className="col-span-3">
          <div className="text-center font-semibold w-min whitespace-break-spaces ml-auto mr-auto">
            {t("EndTimestamp")}
          </div>
        </div>
        <div className="col-span-1 font-semibold">
          <p>{t('Day')}</p>
        </div>
        <div className="col-span-3 flex gap-1">
          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <>
              <div className="py-3 bg-secondary rounded-md text-center flex-1">
                {worker?.Attendace?.length > 0
                  ? new Date(worker?.Attendace[0].inTime).toLocaleTimeString(
                      "en-US",
                      { hour: "numeric", minute: "numeric", hour12: true }
                    )
                  : "N/A"}
              </div>
              {worker?.Attendace?.[0]?.inTime && (
                <Image
                  src="/Attachment.svg"
                  alt="Attachment"
                  width={24}
                  height={24}
                  onClick={() => setStartPhotoOpen(true)}
                />
              )}
            </>
          )}
          <Overlay isOpen={startPhotoOpen}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">{t('StartDayPhoto')}</h1>
                <X onClick={() => setStartPhotoOpen(false)} />
              </div>
              <div className="relative w-full h-auto">
                <Image
                  src={
                    worker?.Attendace[0]?.inTimePhotoURL ||
                    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                  }
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
          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <>
              <div className="py-3 bg-secondary rounded-md text-center flex-1">
                {worker?.Attendace?.[0]?.outTime
                  ? new Date(worker.Attendace[0].outTime).toLocaleTimeString(
                      "en-US",
                      { hour: "numeric", minute: "numeric", hour12: true }
                    )
                  : "N/A"}
              </div>
              {worker?.Attendace?.[0]?.outTime && (
                <Image
                  src="/Attachment.svg"
                  alt="Attachment"
                  width={24}
                  height={24}
                  onClick={() => setEndPhotoOpen(true)}
                />
              )}
            </>
          )}

          <Overlay isOpen={endPhotoOpen}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">{t('EndDayPhoto')}</h1>
                <X onClick={() => setEndPhotoOpen(false)} />
              </div>
              <div className="relative w-full h-auto">
                <Image
                  src={
                    worker?.Attendace[0]?.outTimePhotoURL ||
                    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
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
          {loading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <p className="text-2xl">{todayTaskHours}</p>
          )}
        </div>
        <div className="col-span-2">
          {loading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <p className="text-2xl">{thisWeekTaskHours}</p>
          )}
        </div>
        <div className="col-span-2">
          {loading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <p className="text-2xl">{lastWeekTaskHours}</p>
          )}
        </div>
      </div>
      {loading ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <div className="min-h-[24rem] overflow-y-auto">
          <TaskView tasks={worker?.tasks.length > 0 ? worker.tasks : []} />
        </div>
      )}
      <div className="flex gap-2 mb-4 items-center">
        <h1 className="font-semibold">{t('DollarRate')}</h1>
        {loading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <input
            type="number"
            placeholder="Add Rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="flex-1 px-4 py-3 font-semibold bg-secondary placeholder:text-placeholder rounded-md"
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold">{t('ContractorNotes')}</h1>
        {loading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <input
            type="text"
            className="p-4 bg-secondary rounded-xl"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        )}
      </div>
      {loading ? (
        <Skeleton className="h-12 w-full" />
      ) : (
        <button
          className="bg-primary py-3 text-white w-full rounded-lg mt-2"
          disabled={processing}
          onClick={async () => {
            try {
              setProcessing(true);
              if (notes.length > 0 && rate.length > 0) {
                const { status, message } = await saveNotesRate(
                  notes,
                  parseInt(rate),
                  worker?.id
                );
                if (status === "success") {
                  notyf.success(message);
                  setRefreshing(refreshing + 1);
                } else {
                  notyf.error(message);
                }
              } else {
                notyf.error(t('Error1'));
              }
            } catch (err) {
              notyf.error(err);
            } finally {
              setProcessing(false);
            }
          }}
        >
          {processing ? <Loader /> :t('Save') }
        </button>
      )}
    </div>
  );
}

export default Page;

"use client";
import React, { useEffect, useState } from "react";
import Accordion from "../../../../components/Accordion";
import { Link } from "../../../../../routing";
import Image from "next/image";
import BackButton from "../../../../components/BackButton";
import Overlay from "../../../../components/Overlay";
import { getAdminAttendance } from "../../../../server/attendance";
import { useTranslations } from "next-intl";

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [attendance, setAttendance] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const t = useTranslations("ContractorWorkerDirectory");

  useEffect(() => {
    const getAttendance = async () => {
      const attendance = await getAdminAttendance();
      console.log(attendance);
      setAttendance(attendance);
    };
    getAttendance();
  }, []);

  // Determine available workers
  const availableWorkers = attendance?.workers?.filter(
    (worker) =>
      !worker?.projects?.length || // Worker has no projects
      worker?.projects?.every(
        (project) => project.tasks?.every((task) => task.status === "Completed") // All tasks in the project are completed
      )
  );

  // Determine workers who are in today or absent, but not available
  const inTodayWorkers = attendance?.workers?.filter(
    (worker) =>
      !availableWorkers?.find((w) => w.id === worker.id) && // Exclude available workers
      worker?.Attendace?.length > 0
  );

  const absentWorkers = attendance?.workers?.filter(
    (worker) =>
      !availableWorkers?.find((w) => w.id === worker.id) && // Exclude available workers
      worker?.Attendace?.length === 0
  );

  return (
    <section className="nmdx:hidden h-full w-full px-6 pt-4 pb-10">
      <div className="h-full w-full flex flex-col">
        <div className="py-4 flex text-4xl items-center justify-between relative">
          <div className="absolute -mt-1 -ml-3">
            <BackButton />
          </div>
          <h1 className="text-xl font-bold w-full text-center">{t('Workers')}</h1>
        </div>
        <div className="space-y-2 flex-1 overflow-y-scroll my-2">
          <Accordion
            taskTitle={t('INTODAY')}
            taskNo={inTodayWorkers?.length}
            color="info"
            projectId={1}
          >
            <div className="py-4 space-y-4">
              {inTodayWorkers?.map((item, key) => (
                <div className="pb-3 border-b border-secondary flex" key={key}>
                  <div
                    onClick={() =>
                      (window.location.href = "/Contractor/WorkerDetails/" + item.id)
                    }
                    className="w-full flex items-center gap-2"
                  >
                    <div className="h-12 w-12 object-cover rounded-full overflow-hidden">
                      <Image
                        src={item.photoURL}
                        alt="user"
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="flex-1">
                      <h1 className="font-bold text-sm">
                        {item.fullName}{" "}
                        <span className="text-primary text-sm font-normal">
                          [{t('IN')}:{" "}
                          {new Date(
                            item?.Attendace[0].inTime
                          ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                          ]
                        </span>
                      </h1>
                      <h3 className="text-textLight text-xs">{item.email}</h3>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setCurrentUserId(item?.id);
                      setIsOpen(true);
                    }}
                    className="text-[#808D9E] flex p-2 justify-center items-center"
                  >
                    <Image
                      src="/UserPlus.svg"
                      alt="user"
                      width="32"
                      height="32"
                      className="max-w-max"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
          <Accordion
            taskTitle={t("ABSENT")}
            taskNo={absentWorkers?.length}
            color="danger"
            projectId={1}
          >
            <div className="py-4 space-y-4">
              {absentWorkers?.map((item, key) => (
                <div className="pb-3 border-b border-secondary flex" key={key}>
                  <div
                    onClick={() =>
                      (window.location.href = "/Contractor/WorkerDetails/" + item.id)
                    }
                    className="w-full flex items-center gap-2"
                  >
                    <div className="h-12 w-12 object-cover rounded-full overflow-hidden">
                      <Image
                        src={item.photoURL}
                        alt="user"
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="flex-1">
                      <h1 className="font-bold text-sm">{item.fullName}</h1>
                      <h3 className="text-textLight text-xs">{item.email}</h3>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setCurrentUserId(item?.id);
                      setIsOpen(true);
                    }}
                    className="text-[#808D9E] flex p-2 justify-center items-center"
                  >
                    <Image
                      src="/UserPlus.svg"
                      alt="user"
                      width="32"
                      height="32"
                      className="max-w-max"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
          <Accordion
            taskTitle={t("AVAILABLE")}
            taskNo={availableWorkers?.length}
            color="success"
            projectId={1}
          >
            <div className="py-4 space-y-4">
              {availableWorkers?.map((worker, key) => (
                <div className="pb-3 border-b border-secondary flex" key={key}>
                  <div
                    onClick={() =>
                      (window.location.href =
                        "/Contractor/WorkerDetails/" + worker.id)
                    }
                    className="w-full flex items-center gap-2"
                  >
                    <div className="h-12 w-12 object-cover rounded-full overflow-hidden">
                      <Image
                        src={worker.photoURL}
                        alt="user"
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="flex-1">
                      <h1 className="font-bold text-sm">{worker.fullName}</h1>
                      <h3 className="text-textLight text-xs">{worker.email}</h3>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setCurrentUserId(worker?.id);
                      setIsOpen(true);
                    }}
                    className="text-[#808D9E] flex p-2 justify-center items-center"
                  >
                    <Image
                      src="/UserPlus.svg"
                      alt="user"
                      width="32"
                      height="32"
                      className="max-w-max"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      </div>
      <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="w-full mb-4">
          <Image
            src="/Close.svg"
            alt="edit"
            width="30"
            height="30"
            className="ml-auto"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="space-y-3">
          <Link
            className="flex gap-4 itesm-center"
            href={"/Contractor/UserAssign/" + currentUserId + "/AssignProjects"}
          >
            <Image src="/Link.svg" alt="edit" width="30" height="30" />
            <h1 className="font-semibold">{t('AssignTask')}</h1>
          </Link>
        </div>
      </Overlay>
    </section>
  );
}

export default Page;

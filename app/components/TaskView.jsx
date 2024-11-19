import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import ImageView from "./ImageView";
import { useTranslations } from "next-intl";

const tasks = [
  { color: "bg-blue-500", title: "Task 1" },
  { color: "bg-green-500", title: "Task 2" },
  { color: "bg-yellow-500", title: "Task 3" },
];

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

const TaskView = ({ tasks }) => {
  const t = useTranslations("TaskView");
  return (
    <div className="py-4">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <h1 className="font-semibold">{t('Tasks')}</h1>
        </div>
        <div>
          <h1 className="font-semibold text-center">{t('Before')}</h1>
        </div>
        <div>
          <h1 className="font-semibold text-center">{t('Progress')}</h1>
        </div>

        {tasks.map((task, index) => (
          <>
            <div className="flex items-center justify-center">
              <div className={`py-3 w-full text-center text-white bg-${getColor(task.status)} rounded-lg truncate px-1`}>
                {task.name}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ImageView imageList={task.photos ? task.photos.filter((photo) => photo.type === "BEFORE_PHOTO") : []} size="sm" />
            </div>
            <div className="flex items-center justify-center">
              <ImageView imageList={task.photos ? task.photos.filter((photo) => photo.type === "AFTER_PHOTO") : []} size="sm" />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default TaskView;

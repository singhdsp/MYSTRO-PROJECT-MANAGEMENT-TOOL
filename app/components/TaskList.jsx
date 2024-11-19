import React from "react";
import { useTranslations } from "next-intl";

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

const TaskList = ({ tasks, taskStatus, userid }) => {
  const t = useTranslations("TaskList");
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="font-semibold">{t('Tasks')}</div>
        <div className="font-semibold col-span-2">{t('Description')}</div>
        {taskStatus?.selector !== "All" ? (
          <>
            {tasks
              .filter((task) => task.status === taskStatus.selector)
              .map((task, index) => (
                <React.Fragment key={index}>
                  <div
                    onClick={() =>
                      (window.location.href = "/TaskDetails/" + task.id)
                    }
                    className={`p-2 relative rounded-lg flex items-center justify-center text-white bg-${getColor(
                      task.status
                    )}`}
                  >
                    <span className="truncate">{task.name}</span>
                    {!task.readUsers?.length ||
                    !task.readUsers.some((user) => user.id === userid) ? (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                    ) : null}
                  </div>
                  <div className="p-4 border rounded-lg flex items-center gap-1 col-span-2 w-full">
                    <span className="truncate">{task.description}</span>
                  </div>
                </React.Fragment>
              ))}
          </>
        ) : (
          <>
            {tasks.map((task, index) => (
              <React.Fragment key={index}>
                <div
                  onClick={() =>
                    (window.location.href = "/TaskDetails/" + task.id)
                  }
                  className={`p-2 relative rounded-lg flex items-center justify-center text-white bg-${getColor(
                    task.status
                  )}`}
                >
                  <span className="truncate">{task.name}</span>
                  {!task.readUsers?.length ||
                  !task.readUsers.some((user) => user.id === userid) ? (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                  ) : null}
                </div>
                <div className="p-4 border rounded-lg flex items-center gap-1 col-span-2 w-full">
                  <span className="truncate">{task.description}</span>
                </div>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;

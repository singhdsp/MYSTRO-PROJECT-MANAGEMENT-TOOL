"use client";
import { KeyboardArrowUpRounded, MoreHoriz } from "@mui/icons-material";
import React, { useState } from "react";

const Accordion = ({ taskTitle, taskNo, children, color }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full items-center bg-secondary p-3 rounded-lg"
      >
        <div className="flex space-x-2 items-center">
          <h1 className="font-bold">{taskTitle}</h1>
          <h1
            className={`h-6 w-6 flex items-center justify-center bg-${color} text-xs font-semibold rounded-full text-white`}
          >
            {taskNo}
          </h1>
        </div>

        <KeyboardArrowUpRounded
          className={`rotate-90 !transform !origin-center !transition-all !duration-200 !ease-out ${
            accordionOpen ? "!rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;

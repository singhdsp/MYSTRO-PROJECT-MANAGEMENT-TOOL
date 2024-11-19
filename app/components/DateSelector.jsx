"use client";
import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import RightChevron from "../icons/RightChevron.svg";
import LeftChevron from "../icons/LeftChevron.svg";

const DateSelector = ({
  selectedDate,
  setSelectedDate,
  startDate,
  endDate,
}) => {
  const scrollableDivRef = useRef(null);
  const startDay = selectedDate.startOf("month");
  const endDay = selectedDate.endOf("month");
  const daysInMonth = endDay.diff(startDay, "day") + 1;
  const days = Array.from({ length: daysInMonth }, (_, i) =>
    startDay.add(i, "day")
  );

  const handleChange = (direction) => {
    const newDate =
      direction === "prev"
        ? selectedDate.subtract(1, "day").startOf("day")
        : selectedDate.add(1, "day").startOf("day");
    if (
      (newDate.isAfter(startDate) || newDate.isSame(startDate)) &&
      (newDate.isBefore(endDate) || newDate.isSame(endDate))
    ) {
      setSelectedDate(newDate);
    }
  };

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollLeft =
        scrollableDivRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2 w-full">
      <button
        onClick={() => handleChange("prev")}
        className=""
        disabled={selectedDate.isSame(startDate, "day")}
      >
        <span>
          <LeftChevron />
        </span>
      </button>
      <div
        className="hideScroll flex items-center space-x-2 overflow-x-scroll"
        ref={scrollableDivRef}
      >
        {days.map((day) => {
          if (
            (day.isAfter(startDate) || day.isSame(startDate)) &&
            (day.isBefore(endDate) || day.isSame(endDate))
          ) {
            return (
              <button
                key={day.format("DD")}
                onClick={() => setSelectedDate(day.startOf("day"))}
                className={`min-w-14 min-h-14 font-medium text-xl flex items-center justify-center rounded-full ${
                  day.isSame(selectedDate, "day")
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {day.format("D")}
              </button>
            );
          }
          return null;
        })}
      </div>
      <button
        onClick={() => handleChange("next")}
        className=""
        disabled={selectedDate.isSame(endDate, "day")}
      >
        <span>
          <RightChevron />
        </span>
      </button>
    </div>
  );
};

const DatePicker = ({
  startDate = "2000-01-01",
  endDate = dayjs().format("YYYY-MM-DD"),
  updateDate,
}) => {
  const start = dayjs(startDate).startOf("day");
  const end = dayjs(endDate).startOf("day");
  const [selectedDate, setSelectedDate] = useState(end);
  const currentYear = end.year();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (e) => {
    const newMonth = months.indexOf(e.target.value);
    let newDate = selectedDate.month(newMonth).startOf("day");
    if (newDate.isBefore(start)) {
      newDate = start;
    } else if (newDate.isAfter(end)) {
      newDate = end;
    }
    setSelectedDate(newDate);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    let newDate = selectedDate.year(newYear).startOf("day");
    if (newDate.isBefore(start)) {
      newDate = start;
    } else if (newDate.isAfter(end)) {
      newDate = end;
    }
    setSelectedDate(newDate);
  };

  useEffect(() => {
    if (selectedDate.isBefore(start)) {
      setSelectedDate(start);
    } else if (selectedDate.isAfter(end)) {
      setSelectedDate(end);
    }
  }, [selectedDate, start, end]);

  useEffect(() => {
    if (updateDate) {
      const date = new Date(selectedDate);
      
      date.setUTCDate(date.getUTCDate() + 1);
      date.setUTCHours(23, 59, 59, 0);

      const isoString = date.toISOString();
      updateDate(isoString);
      console.log(isoString);
    }
  }, [selectedDate, updateDate]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        <select
          className="p-2 border rounded"
          value={months[selectedDate.month()]}
          onChange={handleMonthChange}
        >
          {months.map((month, index) => (
            <option
              key={index}
              value={month}
              disabled={
                (selectedDate.year() === start.year() &&
                  index < start.month()) ||
                (selectedDate.year() === end.year() && index > end.month())
              }
            >
              {month.toUpperCase()}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded"
          value={selectedDate.year()}
          onChange={handleYearChange}
        >
          {Array.from({ length: end.year() - start.year() + 1 }, (_, i) => (
            <option key={i} value={start.year() + i}>
              {start.year() + i}
            </option>
          ))}
        </select>
      </div>
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        startDate={start}
        endDate={end}
      />
      {/*  <div className="mt-4">
        Selected Date: {selectedDate.format("DD-MM-YYYY")}
      </div> */}
    </div>
  );
};

export default DatePicker;

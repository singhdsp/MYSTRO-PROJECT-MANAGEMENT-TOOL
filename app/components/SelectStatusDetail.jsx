"use client";
import React, { Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDropDownRounded, CheckRounded } from "@mui/icons-material";
import { useTranslations } from "next-intl";

const Select = ({ taskStatus, setTaskStatus }) => {
  const t = useTranslations("TaskStatus2");
  
  const people = [
    {
      id: 3,
      name: t("NotYetStarted"),
      selector: "Not_Yet_Started",
      icon: <div className="h-5 w-5 bg-warning rounded-sm"></div>,
    },
    {
      id: 1,
      name: t("Completed"),
      selector: "Completed",
      icon: <div className="h-5 w-5 bg-success rounded-sm"></div>,
    },
    {
      id: 2,
      name: t("InProgress"),
      selector: "In_Progress",
      icon: <div className="h-5 w-5 bg-info rounded-sm"></div>,
    },
    {
      id: 4,
      name: t("Blocked"),
      selector: "Blocked",
      icon: <div className="h-5 w-5 bg-danger rounded-sm"></div>,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const selected = people.find((p) => p.selector === taskStatus?.selector) || people[0];

  const handleChange = (newSelection) => {
    setTaskStatus(newSelection);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-secondary py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-[#E9ECF2] focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {selected.icon}
                <span className="ml-3 block truncate font-semibold">
                  {selected.name}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ArrowDropDownRounded
                  className={`h-5 w-5 text-gray-400 !transform !transition-all !duration-100 !ease-in-out ${
                    open ? "-rotate-180" : ""
                  } `}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-secondary py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {person.icon}
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckRounded
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
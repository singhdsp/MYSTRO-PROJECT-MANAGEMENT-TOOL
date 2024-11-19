"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, UnfoldMoreOutlined } from "@mui/icons-material";
import Image from "next/image";
import { getUsers } from "../server/user";
/* import UserUtility from "@/lib/User"
import { useCreateProjectStore } from "@/store/createProject" */

const people2 = [
  {
    id: 1,
    fullName: "Select",
    photoURL: "/users.png",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Example = ({ admin, setTeamAdmin}) => {
  const [people, setUsers] = useState([
    {
      id: 1,
      photoURL:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
      fullName: "Ajay Pal Singh",
      email: "john@example.com",
    },
    {
      id: 2,
      photoURL:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg",
      fullName: "Bhuvan Yadav",
      email: "jane@example.com",
    },
  ]);

  useEffect(() => {
    const getAll = async () => {
      const users = await getUsers();
      const users2 = users.filter((user) => user.role === "Contractor");
      console.log(users)
      setUsers(users2);
      setTeamAdmin(users2[0]);
    };
    getAll();
  }, [setTeamAdmin]);

  return (
    <Listbox value={admin} onChange={setTeamAdmin}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <Image
                  src={admin?.photoURL}
                  alt=""
                  width={100}
                  height={100}
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate font-semibold">
                  {admin?.fullName}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <UnfoldMoreOutlined
                  className="h-5 w-5 text-gray-400"
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                    {({ admin, active }) => (
                      <>
                        <div className="flex items-center">
                          <Image
                            src={person?.photoURL}
                            alt=""
                            width={100}
                            height={100}
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={classNames(
                              admin ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {person?.fullName}
                          </span>
                        </div>

                        {admin ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
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

export default Example;

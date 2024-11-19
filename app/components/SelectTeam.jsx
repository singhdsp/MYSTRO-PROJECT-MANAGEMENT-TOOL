import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import { getUsers, getUsersCreateTask } from "../server/user";
import { useTranslations } from "next-intl";

const SelectTeam = ({
  isOpen,
  setIsOpen,
  onClose,
  team,
  isTask = false,
  projectid = 0,
}) => {
  const [selectedMembers, setSelectedMembers] = useState(team);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const t = useTranslations("SelectTeam");

  const handleMemberSelect = (member) => {
    setSelectedMembers((prevSelectedMembers) => {
      if (prevSelectedMembers.includes(member)) {
        return prevSelectedMembers.filter((m) => m.id !== member.id);
      }
      return [...prevSelectedMembers, member];
    });
  };

  const handleSave = () => {
    console.log("Selected members:", selectedMembers);
    onClose(selectedMembers);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const getAll = async () => {
      if (isTask) {
        const users2 = await getUsersCreateTask(projectid);
        console.log(users2);
        setMembers(users2);
        console.log("is Task")
      } else {
        const users = await getUsers();
        console.log(users);
        setMembers(users);
        console.log("Called THis")
      }
    };
    getAll();
  }, []);

  console.log(members);

  return (
    <div
      className={`fixed pointer-events-auto top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999] ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 overflow-y-auto max-h-[30rem]">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {t('SelectMembers')}
        </h2>
        <input type="text" placeholder="Search" className="w-full mb-4 p-3 placeholder:text-placeholder font-semibold rounded-lg bg-secondary" value={search} onChange={(e) => setSearch(e.target.value)} />
        <List>
          {members?.filter(member => member?.fullName.toLowerCase().includes(search.toLowerCase()) || member?.email.toLowerCase().includes(search.toLowerCase())).map((member) => {
            console.log(member);
            return (
              <ListItem
                key={member.id}
                className={`py-2 my-2 rounded-lg ${
                  selectedMembers.includes(member) ? "bg-[#274DB2]" : ""
                }`}
                onClick={() => handleMemberSelect(member)}
              >
                <ListItemAvatar>
                  <Avatar src={member?.photoURL} className="w-8 h-8" />
                </ListItemAvatar>
                <ListItemText
                  primary={member?.fullName}
                  secondary={member?.email}
                  className="ml-4"
                  primaryTypographyProps={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: selectedMembers.includes(member) ? "white" : "black",
                  }}
                  secondaryTypographyProps={{
                    fontSize: 12,
                    color: selectedMembers.includes(member)
                      ? "white"
                      : "textSecondary",
                  }}
                />
              </ListItem>
            );
          })}
        </List>
        <div
          className="w-full py-4 font-semibold text-sm text-center rounded-lg bg-[#274DB2] text-white"
          onClick={handleSave}
        >
          {t('Save')}
        </div>
      </div>
    </div>
  );
};

export default SelectTeam;

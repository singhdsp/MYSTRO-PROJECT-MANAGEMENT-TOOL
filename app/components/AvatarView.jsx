import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";

function AvatarView({ users }) {
  return (
    <div className="flex">
      <AvatarGroup>
        {users?.map((user, key) => {
          return (
            <Avatar
              key={key}
              alt={user.fullName}
              src={user.photoURL}
              sx={{ width: 24, height: 24 }}
            />
          );
        })}
      </AvatarGroup>
    </div>
  );
}

export default AvatarView;

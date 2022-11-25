import React from "react";
import Badge from "@mui/material/Badge";
import { PhotoButton } from "./PhotoButton";
import Avatar from "@mui/material/Avatar";

export const UserAvatar: React.FC<{
  src: string;
  onConfirm: (file: File) => void;
}> = ({ src, onConfirm }) => {
  return (
    <Badge
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      overlap="circular"
      badgeContent={<PhotoButton onConfirm={onConfirm} />}
    >
      <Avatar sx={{ width: 96, height: 96 }} alt="user avatar" src={src} />
    </Badge>
  );
};

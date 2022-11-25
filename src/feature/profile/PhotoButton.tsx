import React, { ChangeEvent } from "react";
import Fab from "@mui/material/Fab";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export const PhotoButton: React.FC<{ onConfirm: (file: File) => void }> = ({
  onConfirm,
}) => {
  const onFileSelectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget?.files.length > 0)
      onConfirm(e.currentTarget.files[0]);
  };
  return (
    <Fab size={"small"} component="label" aria-label="upload photo">
      <input
        hidden
        accept="image/*"
        type="file"
        onChange={onFileSelectHandler}
      />
      <PhotoCamera color={"info"} />
    </Fab>
  );
};

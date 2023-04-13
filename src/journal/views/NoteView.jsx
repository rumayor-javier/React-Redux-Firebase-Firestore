import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote, savedMessage, isSaving } = useSelector(
    (state) => state.journal
  );

  const { body, title, date, onInputChange, formState } = useForm(activeNote);

  const dateString = useMemo(() => {
    const formattedDate = new Date(date);
    return `${
      formattedDate.getMonth() + 1
    }/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  });

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (savedMessage.length > 0) {
      Swal.fire("Entry saved", savedMessage, "success");
    }
  }, [savedMessage]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDeleteNote = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight={"light"}>
          {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />

        <Button
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
          color="primary"
        >
          <UploadOutlined sx={{ fontSize: 39 }} />
          Upload Image
        </Button>

        <Button disabled={isSaving} onClick={onSaveNote} color="primary">
          <SaveOutlined sx={{ fontSize: 39 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Add a new note"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent={"end"} sx={{ mt: 1 }}>
        <Button onClick={onDeleteNote} color="error">
          <DeleteOutline /> Delete note
        </Button>
      </Grid>
      {activeNote.imageUrls && <ImageGallery images={activeNote.imageUrls} />}
    </Grid>
  );
};

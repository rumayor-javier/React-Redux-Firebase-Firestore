import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { setActiveNote } from "../../store/journal";

export const SideBarListItem = ({
  title = "",
  body = "",
  id,
  date = "",
  imageUrls = [],
}) => {
  const dispatch = useDispatch();

  const formattedTitle = useMemo(() => {
    if (title.length > 20) {
      return `${title.substring(0, 20)}...`;
    }
    return title;
  }, [title]);

  const formattedBody = useMemo(() => {
    if (body.length > 30) {
      return `${body.substring(0, 30)}...`;
    }
    return body;
  }, [body]);

  const onClickActivateNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickActivateNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <Grid item xs={12}>
            <ListItemText primary={formattedTitle} />
          </Grid>
          <Grid item xs={12}>
            <ListItemText secondary={formattedBody} />
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

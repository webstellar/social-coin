import * as React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  Collapse,
} from "@mui/material";
import { getAllTags } from "../../redux/gratitudes/gratitudesSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TagIcon from "@mui/icons-material/Tag";
import SearchIcon from "@mui/icons-material/Search";

import { Search, SearchIconWrapper, StyledInputBase } from "./ListMenu.styles";

const ListMenu = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [searchText, setSearchText] = React.useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const { totalTags } = useSelector((state) => ({
    ...state.gratitudes,
  }));

  React.useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  const searchHandler = (e) => {};

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <Typography
            variant="h6"
            component="p"
            sx={{ fontWeight: "Bold" }}
            gutterBottom
          >
            Filter
          </Typography>
        }
      >
        <ListItem>
          <form onSubmit={searchHandler}>
            <Search>
              <SearchIconWrapper type="submit" aria-label="search">
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </Search>
          </form>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <TagIcon />
            </ListItemIcon>
            <ListItemText primary="tags" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
      </List>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {totalTags.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={value} dense disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      color="secondary"
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>

      <Typography
        variant="h6"
        component="p"
        sx={{ fontWeight: "Bold" }}
        gutterBottom
      >
        Tags
      </Typography>

      {totalTags.map((tag, i) => (
        <Chip key={i} label={tag} sx={{ ml: 1, mt: 1 }} />
      ))}
    </Box>
  );
};

export default ListMenu;

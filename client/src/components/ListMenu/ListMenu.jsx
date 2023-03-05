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
import {
  getAllTags,
  getAllCategories,
} from "../../redux/gratitudes/gratitudesSlice";
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

  const { totalTags, totalCategories } = useSelector((state) => ({
    ...state.gratitudes,
  }));

  React.useEffect(() => {
    dispatch(getAllTags());
    dispatch(getAllCategories());
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
      <Typography
        variant="h6"
        component="p"
        sx={{ fontWeight: "Bold" }}
        gutterBottom
      >
        Search
      </Typography>
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

      <Typography
        variant="h6"
        component="p"
        sx={{ fontWeight: "Bold" }}
        gutterBottom
      >
        Tags
      </Typography>

      {totalTags.map((tag, i) => (
        <Chip key={i} label={tag} sx={{ ml: 1, mt: 1, mb: 2 }} />
      ))}
      <Typography
        variant="h6"
        component="p"
        sx={{ fontWeight: "Bold" }}
        gutterBottom
      >
        Categories
      </Typography>

      {totalCategories.map((category, i) => (
        <Chip key={i} label={category} sx={{ ml: 1, mt: 1 }} />
      ))}
    </Box>
  );
};

export default ListMenu;

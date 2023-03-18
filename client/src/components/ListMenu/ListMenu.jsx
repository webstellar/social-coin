import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Checkbox,
} from "@mui/material";
import {
  getAllTags,
  getAllCategories,
} from "../../redux/gratitudes/gratitudesSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./ListMenu.styles";

const ListMenu = ({
  search,
  setSearch,
  category,
  setCategory,
  tag,
  setTag,
}) => {
  const dispatch = useDispatch();

  const handleCategoryToggle = (value) => () => {
    const currentIndex = category.indexOf(value);
    const newChecked = [...category];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCategory(newChecked);
  };

  const handleTagToggle = (val) => () => {
    const currentI = tag.indexOf(val);
    const newC = [...tag];

    if (currentI === -1) {
      newC.push(val);
    } else {
      newC.splice(currentI, 1);
    }

    setTag(newC);
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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
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

      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
      >
        {totalTags.map((val) => {
          const labelId = `checkbox-list-label-${val}`;

          return (
            <ListItem key={val} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleTagToggle(val)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={tag.indexOf(val) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={val} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Typography
        variant="h6"
        component="p"
        sx={{ fontWeight: "Bold", mt: 4 }}
        gutterBottom
      >
        Categories
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
      >
        {totalCategories.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleCategoryToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={category.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {/*}
      <Typography
        variant="h6"
        component="p"
        sx={{ fontWeight: "Bold" }}
        gutterBottom
      >
        Tags
      </Typography>

      {totalTags.map((item, i) => (
        <Chip
          key={i}
          label={item}
          sx={{ ml: 1, mt: 1, mb: 2 }}
          onClick={() => setTags(item)}
        />
      ))}
      <Typography
        variant="h6"
        component="p"
        sx={{ fontWeight: "Bold" }}
        gutterBottom
      >
        Categories
      </Typography>

      {totalCategories.map((item, i) => (
        <Chip
          key={i}
          label={item}
          sx={{ ml: 1, mt: 1 }}
          onClick={() => setCategories(item)}
        />
      ))}


      */}
    </Box>
  );
};

ListMenu.propTypes = {
  categories: PropTypes.any,
  setCategories: PropTypes.any,
  keyword: PropTypes.any,
  setKeyword: PropTypes.any,
  tags: PropTypes.any,
  setTags: PropTypes.any,
};

export default ListMenu;

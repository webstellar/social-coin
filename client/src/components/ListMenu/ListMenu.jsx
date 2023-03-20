import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Input,
  InputLabel,
  FormControl,
  FormControlLabel,
  InputAdornment,
  IconButton,
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

const ListMenu = ({
  keyword,
  setKeyword,
  category,
  setCategory,
  tag,
  setTag,
  searchHandler,
}) => {
  const dispatch = useDispatch();
  const { totalCategories, totalTags } = useSelector((state) => ({
    ...state.gratitudes,
  }));

  React.useEffect(() => {
    dispatch(getAllTags());
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleTagToggle = (val) => () => {
    const i = tag.indexOf(val);
    const newC = [...tag];

    if (i === -1) {
      newC.push(val);
    } else {
      newC.splice(i, 1);
    }

    setTag(newC);
  };

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

  return (
    <>
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
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-seach">SEARCH</InputLabel>
            <Input
              type="text"
              id="search_field"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="search" type="submit">
                    <SearchIcon color="secondary" sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                fontSize: "1rem",
                fontWeight: "Bold",
                textTransform: "uppercase",
              }}
            />
          </FormControl>
        </form>

        <Typography
          variant="h6"
          component="p"
          sx={{ fontWeight: "Bold", mt: 4 }}
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
            const id = `checkbox-list-label-${value}`;

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
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": id }}
                    />
                  </ListItemIcon>
                  <ListItemText id={id} primary={value} />
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
    </>
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

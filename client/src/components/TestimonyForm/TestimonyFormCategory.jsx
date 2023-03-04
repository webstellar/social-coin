import PropTypes from "prop-types";
import TestimonyModalLayout from "./TestimonyModalLayout";
import {
  Button,
  ListItemText,
  Typography,
  Grid,
  IconButton,
  MenuItem,
  Divider,
  Select,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";

import categoriesData from "../../data/categories.json";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TestimonyFormCategory = ({
  setOpenCategory,
  handleCategoryChange,
  category,
}) => {
  return (
    <TestimonyModalLayout>
      <Grid
        item
        xs={12}
        md={12}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={10} md={10} sm={10}>
          <Typography gutterBottom={false}>
            Select a category for your testimony
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          md={2}
          sm={2}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <IconButton
            disableRipple={true}
            color="inherit"
            onClick={() => {
              setOpenCategory(false);
            }}
          >
            <ClearIcon sx={{ fontSize: "2.0rem" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{ bgcolor: "background.paper", mb: 2 }} />

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <FormControl sx={{ m: 1, width: "100%", color: "#000" }}>
          <InputLabel id="demo-multiple-checkbox-label" sx={{ color: "#000" }}>
            Category
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={category}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Category" sx={{ color: "#000" }} />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {categoriesData.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={category.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ mt: 3 }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpenCategory(false);
          }}
        >
          Save
        </Button>
      </Grid>
    </TestimonyModalLayout>
  );
};

TestimonyFormCategory.propTypes = {
  handleCategoryChange: PropTypes.any,
  setOpenCategory: PropTypes.any,
  category: PropTypes.any,
};

export default TestimonyFormCategory;

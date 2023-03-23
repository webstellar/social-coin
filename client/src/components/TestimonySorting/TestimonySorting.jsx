import * as React from "react";
import {
  Grid,
  Stack,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
} from "@mui/material";
import { GrItem } from "./TestimonySorting.styles";
import { FilterContext } from "../../pages/Testimonies";
import SwapVertSharpIcon from "@mui/icons-material/SwapVertSharp";

const TestimonySorting = () => {
  const { sort, handleSort, onArrowChange } = React.useContext(FilterContext);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item sm={2} md={2}></Grid>
        <Grid item sm={10} md={10}>
          <Stack
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <GrItem elevation={0}>
              <FormControl
                sx={{ m: 1, minWidth: 120, color: "#000" }}
                size="small"
              >
                <InputLabel id="demo-select-small">Sort </InputLabel>
                <Select
                  labelId="sort-select-small"
                  id="sort-select-small"
                  value={sort.sort}
                  label="Sort"
                  onChange={handleSort}
                  sx={{
                    p: 0,
                    borderColor: "#000",
                    color: "#000",
                    fontSize: "0.8rem",
                  }}
                >
                  <MenuItem value="createdAt" sx={{ fontSize: "0.8rem" }}>
                    Newest
                  </MenuItem>
                  <MenuItem value="likeCount" sx={{ fontSize: "0.8rem" }}>
                    Most Likes
                  </MenuItem>
                  <MenuItem value="numOfReviews" sx={{ fontSize: "0.8rem" }}>
                    Most Comments
                  </MenuItem>
                  <MenuItem value="summary" sx={{ fontSize: "0.8rem" }}>
                    Alphabetically
                  </MenuItem>
                </Select>
              </FormControl>
            </GrItem>
            <GrItem elevation={0}>
              <IconButton sx={{ p: 0 }} onClick={onArrowChange}>
                <SwapVertSharpIcon />
              </IconButton>
            </GrItem>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default TestimonySorting;

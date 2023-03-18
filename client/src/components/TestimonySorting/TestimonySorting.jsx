import * as React from "react";
import {
  Grid,
  Stack,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { GrItem } from "./TestimonySorting.styles";
import { FilterContext } from "../../pages/Testimonies";

const TestimonySorting = () => {
  const { sort, handleSort } = React.useContext(FilterContext);

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
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={sort}
                  label="Age"
                  onChange={handleSort}
                  sx={{
                    borderColor: "#000",
                    color: "#000",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Most Liked</MenuItem>
                  <MenuItem value={20}>Most Recent</MenuItem>
                  <MenuItem value={30}>Most Oldest</MenuItem>
                </Select>
              </FormControl>
            </GrItem>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default TestimonySorting;

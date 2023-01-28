import PropTypes from "prop-types";
import {
  TextField,
  Typography,
  Grid,
  IconButton,
  Button,
  Divider,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";
import TestimonyModalLayout from "./TestimonyModalLayout";

const TestimonyFormSummary = ({ summary, setOpenSummary, setSummary }) => {
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
          <Typography gutterBottom={false}>Give your story a title</Typography>
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
              setOpenSummary(false);
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
        <TextField
          name="summary"
          value={summary}
          type="text"
          required
          multiline
          rows={2}
          fullWidth
          label="Give your story a title"
          variant="standard"
          onChange={(e) => {
            setSummary(e.target.value);
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpenSummary(false);
          }}
          sx={{ mt: 3 }}
        >
          Save
        </Button>
      </Grid>
    </TestimonyModalLayout>
  );
};

TestimonyFormSummary.propTypes = {
  setSummary: PropTypes.any,
  setOpenSummary: PropTypes.any,
  summary: PropTypes.string,
};

export default TestimonyFormSummary;

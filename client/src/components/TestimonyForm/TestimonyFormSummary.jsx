import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Typography,
  Grid,
  IconButton,
  CssBaseline,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "& .MuiTextField-root": {
    m: 1,
    width: "25ch",
  },
};

const TestimonyFormSummary = ({ summary, setOpenSummary, setSummary }) => {
  return (
    <>
      <CssBaseline />
      <Box sx={style}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          rowSpacing={1}
        >
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
                Give your story a title
              </Typography>
            </Grid>
            <Grid item xs={2} md={2} sm={2}>
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
        </Grid>
      </Box>
    </>
  );
};

TestimonyFormSummary.propTypes = {
  setSummary: PropTypes.any,
  setOpenSummary: PropTypes.any,
  summary: PropTypes.string,
};

export default TestimonyFormSummary;

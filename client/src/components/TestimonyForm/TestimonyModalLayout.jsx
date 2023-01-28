import PropTypes from "prop-types";
import { GrFormModal } from "./TestimonyForm.styles";
import { Grid, CssBaseline } from "@mui/material/";

const TestimonyModalLayout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <GrFormModal>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          Spacing={3}
        >
          <main style={{ mt: 2, mb: 2 }}>{children}</main>
        </Grid>
      </GrFormModal>
    </>
  );
};

TestimonyModalLayout.propTypes = {
  children: PropTypes.any,
};

export default TestimonyModalLayout;

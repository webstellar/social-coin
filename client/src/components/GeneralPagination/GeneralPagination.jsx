import * as React from "react";
import { Pagination, Stack } from "@mui/material";

const GeneralPagination = ({ setCurrentPage, currentPage, numberOfPages }) => {
  const renderPagination = () => {
    return (
      <Stack spacing={2}>
        <Pagination
          count={numberOfPages}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          color="secondary"
          onChange={(e, value) => {
            setCurrentPage(value);
          }}
        />
      </Stack>
    );
  };

  return <>{renderPagination()}</>;
};

export default GeneralPagination;

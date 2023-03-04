import * as React from "react";
import MyHeroCard from "../MyHeroCard/MyHeroCard";
import { getMyHeroes } from "../../redux/heroes/myHeroSlice";
import { useDispatch, useSelector } from "react-redux";
import { GrBox, GrTypography } from "./MyHeroList.styles";
import { Box, Container, Grid } from "@mui/material";
import { deleteMyHeroes } from "../../redux/heroes/deleteMyHeroSlice";
import { toast } from "react-toastify";
import GeneralPagination from "../GeneralPagination/GeneralPagination";
import { Spinner } from "../Spinner/Spinner";

const MyHeroList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(1);

  const { loading, myheroes, numberOfPages } = useSelector(
    (state) => state.myHeroes
  );

  React.useEffect(() => {
    dispatch(getMyHeroes(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = (id) => {
    dispatch(deleteMyHeroes({ id, toast }));

    setTimeout(() => {
      dispatch(getMyHeroes(currentPage));
    }, 10000);
  };

  return (
    <Container maxWidth="xl">
      <GrBox>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Box sx={{ my: 4 }}>
              <GrTypography variant="h5" component="p" color="grey.900">
                YOUR HUMBLE HEROES
              </GrTypography>
            </Box>
            <Grid item container md={12} spacing={4}>
              {myheroes &&
                myheroes
                  .map((myhero) => (
                    <MyHeroCard
                      key={myhero._id}
                      hero={myhero}
                      handleDelete={handleDelete}
                    />
                  ))
                  .reverse()}
            </Grid>
          </>
        )}
      </GrBox>
      <div>
        <GeneralPagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
        />
      </div>
    </Container>
  );
};

export default MyHeroList;

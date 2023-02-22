import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GrParaBox } from "./HeroList.styles";
import { Grid, Box, Container, Typography, Tab, Tabs } from "@mui/material";
import HeroCard from "../HeroCard/HeroCard";

import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../../redux/heroes/heroesSlice";
import { allUsers } from "../../redux/auth/allUserSlice";
import Contributors from "../Contributors/Contributors";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HeroList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const { heroes } = useSelector((state) => ({ ...state.heroes }));
  const { users } = useSelector((state) => state.users);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getHeroes());
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <div>
      <Container maxWidth="lg">
        <GrParaBox>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={12}>
              <Box sx={{ borderBottom: 1, borderColor: "rgba(255,255,255,0)" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  indicatorColor="secondary"
                  textColor="secondary"
                >
                  <Tab label="ALL STORIES" {...a11yProps(0)} />
                  <Tab label="CONTRIBUTORS" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  md={12}
                  spacing={12}
                >
                  <Grid item md={4} lg={4}></Grid>
                  <Grid item md={8} lg={8}>
                    {heroes &&
                      heroes.map((hero) => (
                        <HeroCard key={hero._id} hero={hero} />
                      ))}
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Contributors users={users} />
              </TabPanel>
            </Grid>
          </Grid>
        </GrParaBox>
      </Container>
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.any,
  index: PropTypes.any,
  other: PropTypes.any,
};

export default HeroList;

import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import {
  GrStoriesTypography,
  GrItem,
  GrCardMedia,
} from "./GratitudeCard.styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import defaultImage from "../../images/gratitude_card_noimage.png";

const GratitudeCard = ({ gratitude }) => {
  return (
    <>
      <Grid item xs={12} md={4} sx={{ flex: "0 0  auto", mb: 5 }}>
        <CardActionArea component={Link} to={`/appreciation/${gratitude?._id}`}>
          <Card sx={{ display: "flex" }}>
            <GrCardMedia
              component="img"
              image={gratitude.image?.url || defaultImage}
              alt={gratitude.summary}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: 1 }}>
                <GrStoriesTypography variant="h6" component="h6" gutterBottom>
                  {gratitude.summary.substring(0, 40)}...
                </GrStoriesTypography>

                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {gratitude?.hero?.name}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  columnGap={0.5}
                >
                  <GrItem elevation={0}>
                    <MenuIcon sx={{ color: "#000", fontSize: "1.2rem" }} />
                  </GrItem>
                  <GrItem elevation={0}>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontSize: "1rem",
                      }}
                      gutterBottom={0}
                    >
                      READ
                    </Typography>
                  </GrItem>
                </Stack>
              </CardContent>
            </Box>
          </Card>
        </CardActionArea>
      </Grid>
    </>
  );
};

GratitudeCard.propTypes = {
  gratitude: PropTypes.object,
};

export default GratitudeCard;

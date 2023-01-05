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
import defaultImage from "../../images/dummy_post.webp";

const GratitudeCard = ({ gratitude }) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <CardActionArea component={Link} to={`/appreciation/${gratitude?._id}`}>
          <Card sx={{ display: "flex" }}>
            <GrCardMedia
              component="img"
              image={gratitude.image?.url || defaultImage}
              alt={gratitude.summary}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1">
                  {gratitude?.tags[0]}
                </Typography>
                <GrStoriesTypography variant="h6" component="h6" gutterBottom>
                  {gratitude.summary.substring(0, 40)}...
                </GrStoriesTypography>

                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0}
                >
                  <GrItem elevation={0}>
                    <MenuIcon sx={{ color: "#000" }} />
                  </GrItem>
                  <GrItem elevation={0}>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{ color: "#000", textDecoration: "none" }}
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

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
                {gratitude.tags
                  .map((tag) => (
                    <Typography variant="subtitle1">{tag},</Typography>
                  ))
                  .slice(1, 3)}

                <GrStoriesTypography
                  variant="h6"
                  component="h6"
                  gutterBottom
                  noWrap
                >
                  {gratitude.summary.substring(0, 30)}...
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

import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const GratitudeFormCard = ({ hero }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={hero?.profilePicture?.url}
          alt={hero?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {hero?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hero?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

GratitudeFormCard.propTypes = {
  hero: PropTypes.object,
};

export default GratitudeFormCard;

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomeCard({ house }) {
  const navigate = useNavigate();
  
  const {
    _id,
    numberOfRooms,
    images,
    location,
    title,
    description,
    rating,
    views,
    isPool,
    isWashingMachine,
    isParking,
    pricePerDay,
    seaDistance,
  } = house || {};
  const handleDetails = () => {
    navigate(`/details/${_id}`);
  };
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <LocationOnIcon /> {location}
          </Typography>
          <Typography>
            <BedIcon /> {numberOfRooms}
          </Typography>
        </CardContent>
        {/* <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box> */}
        <Box>
          <Typography>{pricePerDay} TL</Typography>
        </Box>
        <Button onClick={handleDetails}>See Details </Button>
      </Box>

      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={images[0]}
        alt="image"
      />
    </Card>
  );
}

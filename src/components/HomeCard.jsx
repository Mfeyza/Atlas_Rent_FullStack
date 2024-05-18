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

  const { _id, numberOfRooms, images, location, title, pricePerDay } =
    house || {};
  const handleDetails = () => {
    navigate(`/details/${_id}`);
  };
  return (
    <Card sx={{ display: "flex", minHeight: "240px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Box>
            <Typography>{pricePerDay} ₺</Typography>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            fontSize={14}
            mt={2}

          >
            <LocationOnIcon /> {location}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <BedIcon /> <div style={{ marginLeft: "5px" }}>{numberOfRooms}</div>
          </Typography>
        </CardContent>

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

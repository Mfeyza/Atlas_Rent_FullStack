import * as React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SingleBedTwoToneIcon from "@mui/icons-material/SingleBedTwoTone";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomeCard({ house }) {
  const navigate = useNavigate();

  const { _id, numberOfRooms, images, location, title, pricePerDay } =
    house || {};
  const handleDetails = () => {
    sessionStorage.setItem('houseId', _id);
    navigate(`/details/${_id}`);
  };

  return (
    <>
      <Card sx={{ display: "flex",  minHeight: "240px" ,"cursor":"pointer"}}  onClick={handleDetails}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ display:"flex", flexDirection:"column" ,justifyContent:"space-between",height:"100%" }}>
          
            <Typography component="div" variant="h7">
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Oda Sayısı" arrow>
                <SingleBedTwoToneIcon />
              </Tooltip>
              <div style={{ marginLeft: "5px" }}>{numberOfRooms}</div>
            </Box>
          
          </CardContent>
          
        </Box>
        
        

        <CardMedia
          component="img"
          sx={{ width: 200,maxHeight:"100vh" }}
          image={images[0]}
          alt="image"
        />
      </Card>
    </>
  );
}

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Button } from "@mui/material";



const CarList = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const params = useParams();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    axios
      .get("https://rent-a-car-api-be.onrender.com/cars")
      .then((res) => {
        console.log(res.data);
        const carsData = res?.data.data || {};
        setCarList(carsData);
      })
      .catch((err) => {});
  }, []);

  //           const {
  //     brand,
  //     model,
  //     year,
  //     isAutomatic,
  //     fuelType,
  //     pricePerDay,
  //     isPublish,
  //     imagesUrl,
  //   } = carList || {};
  return (
    <>
      {carList?.map((car) => (
        <Card key={car._id} sx={{ maxWidth: 225 }}>
          <CardHeader
            avatar={
              <Avatar src="https://greekgodsandgoddesses.net/wp-content/uploads/2024/01/Atlas-1024x585.png" sx={{ bgcolor: red[500],objectFit:"cover" }} aria-label="recipe">
            
              </Avatar>
            }
           
            title={`${car.brand} ${car.model}`}
            subheader={`Yıl: ${car.year}`}
          
          />
          <CardMedia
            component="img"
            height="150"
            maxheight="100"
            sx={{ objectFit: "cover"}}
            image={car.imagesUrl[0] || "/static/images/cards/paella.jpg"}
            alt={car.model}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <SettingsSuggestIcon/> {` ${car.isAutomatic ? "Otomatik" : "Manuel"}`}
              <br />
              <LocalGasStationIcon/>{car.fuelType}
              <br />
              <PaymentsIcon/> ${car.pricePerDay}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
           <Typography>
            <Button>KİRALA</Button>
           </Typography>
           
          </CardActions>
         
        </Card>
      ))}
    </>
  );
};

export default CarList;

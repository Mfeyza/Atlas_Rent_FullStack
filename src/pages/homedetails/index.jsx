import { Container, Typography, Grid, Tooltip, Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import defaulthouse from "../../assets/house.jpg";
import PoolIcon from "@mui/icons-material/Pool";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TvIcon from "@mui/icons-material/Tv";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import WavesIcon from "@mui/icons-material/Waves";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReservationModal from "../../components/ReservaitonModal";
import dayjs from 'dayjs';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const HomeDetails = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [housedetail, setHouseDetail] = useState([]);
  const [loader, setLoader] = useState(false);
  const params = useParams();

  useEffect(() => {
    setLoader(true);
    axios
      .get(`https://rent-project.onrender.com/houses/${params.id}`)
      .then((res) => {
        const houseData = res?.data.data || {};
        setHouseDetail(houseData);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);
  const {
    images,
    location,
    title,
    description,
    isPool,
    isWashingMachine,
    isParking,
    pricePerDay,
    seaDistance,
    updatedAt,
    createdId,
  } = housedetail || {};
  const start = dayjs(updatedAt).format('D MMMM YYYY'); 

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ mt: 5 ,mb:5}}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={createdId?.image}>
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <ReservationModal pricePerDay={pricePerDay} />
                </IconButton>
              }
              title={createdId?.firstName}
              subheader={start}
            />
            {loader ? <Skeleton variant="rounded" width={"100%"} height={400} /> :
            <CardMedia
            component="img"
            height="400"
            image={(images && images[0]) || defaulthouse}
            alt="House image"
          />}
            
            <CardContent>
              <Typography variant="h5" color="text.secondary">
                {title}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h8" color="text.secondary">
                <LocationOnIcon /> {location} 
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="food">
              <Tooltip title="Mutfak" arrow>
                <FoodBankIcon />
                </Tooltip>
              </IconButton>
              {isPool && (
                <IconButton aria-label="pool">
                   <Tooltip title="Havuz" arrow>
                  <PoolIcon />
                  </Tooltip>
                </IconButton>
              )}
              <IconButton aria-label="wifi">
              <Tooltip title="Wifi" arrow>
                <WifiIcon />
                </Tooltip>
              </IconButton>
              <IconButton aria-label="Tv">
                <Tooltip title="Tv" arrow>
                <TvIcon />
                </Tooltip>
             
              </IconButton>
              {isParking && (
                <IconButton aria-label="parking">
                   <Tooltip title="Park" arrow>
                  <LocalParkingIcon />
                  </Tooltip>
                </IconButton>
              )}
              {isWashingMachine && (
                <IconButton aria-label="washing machine">
                   <Tooltip title="Çamaşır Makinesi" arrow>
                  <LocalLaundryServiceIcon />
                  </Tooltip>
                </IconButton>
              )}
              <IconButton aria-label="sea distance">
              <Tooltip title="Denize Uzaklık" arrow>
                <WavesIcon /> <Typography> {seaDistance} metre</Typography>
                </Tooltip>
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{description}</Typography>
                <Typography paragraph><b>Ev sahibi :</b> {createdId?.firstName} {createdId?.lastName}</Typography>
                <Typography paragraph><b>Tel No :</b> {createdId?.phoneNumber}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeDetails;

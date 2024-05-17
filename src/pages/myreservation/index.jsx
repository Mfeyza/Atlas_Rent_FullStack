import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import defaulthouse from "../../assets/house.jpg";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/tr";
import CarList from "../../components/CarList";

dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.locale("tr");

const Index = () => {
  const theme = useTheme();
  const params = useParams();
  const [myReservation, setMyReservation] = useState();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    axios
      .get(`https://rent-project.onrender.com/reservations/${params.id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const reservationData = res?.data.data || {};
        setMyReservation(reservationData);
      })
      .catch((err) => {});
  }, []);
  const { house, startDate, endDate, amount } = myReservation || {};
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, "day");

  return (
    <Container>
      <Card
        sx={{
          display: "flex",
          mt: "3rem",
          minWidth: "250px",
          maxWidth: "500px",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 151, objectFit: "cover" }}
          image={(house?.images && house?.images[0]) || defaulthouse}
          alt="image"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <Typography component="div" variant="h5">
                {house?.title}
              </Typography>
              <Typography variant="h8" color="text.secondary">
                <LocationOnIcon /> {house?.location}
              </Typography>
              <Typography variant="h8" color="text.secondary">
                {days} gece
              </Typography>
              <Box>
                <Typography variant="h8" color="text.secondary">
                  {" "}
                  {dayjs(start).format("D MMMM")} -{" "}
                  {dayjs(end).format("D MMMM")}
                </Typography>
                <Typography variant="h8" color="text.secondary">
                  {" "}
                  Tutar: {amount}
                </Typography>
                <Button>
                  Rezervasyonu İptal Et
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <Box>
        <Typography sx={{ mt: "5rem" }} component="div" variant="h7">
          Şunlara da göz atmak isteyebilirsiniz
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5rem" }}>
        <CarList />
      </Box>
    </Container>
  );
};

export default Index;

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Container, Fade, Grid, Modal, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import defaulthouse from "../../assets/house.jpg";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/tr";
import CarList from "../../components/CarList";
import CircularProgress from "@mui/material/CircularProgress";
import NoCrashTwoToneIcon from "@mui/icons-material/NoCrashTwoTone";
import Zoom from "@mui/material/Zoom";
import PaymentsIcon from "@mui/icons-material/Payments";
import Backdrop from "@mui/material/Backdrop";
import NightShelterOutlinedIcon from "@mui/icons-material/NightShelterOutlined";

dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.locale("tr");
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Index = () => {
  const [myReservation, setMyReservation] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth._id);
  const [carList, setCarList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [resSureModal, setResSureModal] = useState(false);
  const [reservationId, setReservationId] = useState("");

  const showSureModal = (resId) => {
    setResSureModal(true);
    setReservationId(resId);
  };
  const fetchData = async () => {
    try {
      const [reservationResponse, carsResponse] = await Promise.all([
        axios.get(
          `https://rent-project.onrender.com/reservations?author=${id}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        ),
        axios.get("https://rent-project.onrender.com/cars"),
      ]);

      const reservationData = reservationResponse?.data.data || {};
      const carsData = carsResponse?.data.data || {};

      setMyReservation(reservationData);
      setCarList(carsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id, token]);

  const handleResDelete = () => {
    axios
      .delete(
        `https://rent-project.onrender.com/reservations/${reservationId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        fetchData();
        setReservationId("");
        setResSureModal(false);
      });
  };
  return (
    <Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={resSureModal}
        onClose={() => {
          setReservationId("");
          setResSureModal(false);
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={resSureModal}>
          <Box sx={style}>
            Silmek istediğinizden emin misiniz?
            <Box>
              <Button
                onClick={() => {
                  setReservationId("");
                  setResSureModal(false);
                }}
              >
                Hayır
              </Button>
              <Button onClick={handleResDelete}>Evet</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      {loader ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {myReservation.map(
              ({
                house,
                startDate,
                endDate,
                amountHouse,
                car,
                amountCar,
                _id,
              }) => {
                const start = dayjs(startDate);
                const end = dayjs(endDate);
                const days = end.diff(start, "day");
                return (
                  <Grid item xs={12} sm={6}>
                    <Card
                      sx={{
                        display: "flex",
                        mt: "3rem",
                        minWidth: "250px",
                        minHeight: "300px",
                        backgroundColor: "rgba(191, 204, 204, 0.158)",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 200, maxHeight: "100vh" }}
                        image={
                          (house?.images && house?.images[0]) || defaulthouse
                        }
                        alt="image"
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.5rem",
                            }}
                          >
                            <Typography component="div" variant="h5">
                              {house?.title}
                            </Typography>
                            <Typography variant="h8" color="text.secondary">
                              <LocationOnIcon /> {house?.location}
                            </Typography>
                            <Typography variant="h8" color="text.secondary">
                              {" "}
                              {dayjs(start).format("D MMMM")} -{" "}
                              {dayjs(end).format("D MMMM")}
                            </Typography>
                            <Typography
                              variant="h8"
                              color="text.secondary"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <span>
                                {" "}
                                <NightShelterOutlinedIcon />
                              </span>{" "}
                              <span> {days} gece</span>
                            </Typography>

                            {car && (
                              <Tooltip
                                TransitionComponent={Zoom}
                                title={
                                  <Box>
                                    <Typography>{car?.brand}</Typography>
                                    <Typography>{amountCar}₺</Typography>
                                    <Typography></Typography>
                                  </Box>
                                }
                              >
                                <Typography
                                  variant="h8"
                                  color="text.secondary"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    alignSelf: "flex-start",
                                    cursor:"pointer"
                                  }}
                                >
                                  <NoCrashTwoToneIcon /> Araç
                                </Typography>
                              </Tooltip>
                            )}
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 1,
                              }}
                              variant="h8"
                              color="text.secondary"
                            >
                              {" "}
                              <PaymentsIcon />{" "}
                              <span style={{ marginLeft: "5px" }}>
                                {amountHouse + amountCar} ₺
                              </span>
                            </Typography>
                          </Box>
                          <Button
                            sx={{ mt: 2, color: "rgb(132, 132, 179)" }}
                            onClick={() => showSureModal(_id)}
                          >
                            İptal Et
                          </Button>
                        </CardContent>
                      </Box>
                    </Card>
                  </Grid>
                );
              }
            )}
          </Grid>

          <Box>
            <Typography sx={{ mt: "5rem" }} component="div" variant="h7">
              Şunlara da göz atmak isteyebilirsiniz
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5rem" }}>
            <CarList myReservation={myReservation} carList={carList} />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Index;

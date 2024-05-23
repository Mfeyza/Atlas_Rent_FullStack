import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

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

export default function CarReservationModal({
  carId,
  pricePerDay,
  myReservation,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setReservation("");
    setReservationSelect("");
    setCheckDate({
      checkInDate: null,
      checkOutDate: null,
    });
    setOpen(false);
  };
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth._id);
  const [reservation, setReservation] = useState("");
  const [reservationSelect, setReservationSelect] = useState("");
  const [checkDate, setCheckDate] = useState({
    checkInDate: null,
    checkOutDate: null,
  });

  const { checkInDate, checkOutDate } = checkDate || {};
  const handleReservation = () => {
    if (checkInDate && checkOutDate) {
      axios
        .put(
          `https://atlas-rent-be.vercel.app/reservations/${reservationSelect._id}`,
          {
            startDate: dayjs(checkInDate).format("YYYY-MM-DD"),
            endDate: dayjs(checkOutDate).format("YYYY-MM-DD"),
            car: `${carId}`,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          setReservation(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Lütfen giriş ve çıkış tarihlerini seçin.");
    }
  };

  React.useEffect(() => {
    if (checkInDate && checkOutDate) {
      handleReservation(checkOutDate);
    }
  }, [checkInDate, checkOutDate]);

  const onChangeInDateHandler = (newValue) => {
    setCheckDate({
      checkInDate: newValue,
      checkOutDate: null,
    });
  };

  const today = dayjs();
  const handleNewReservation = () => {
    navigate("/myReservation");
    handleClose()

  };

  const days = dayjs(checkOutDate).diff(dayjs(checkInDate), "day");
  const [openItem, setOpenItem] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setReservationSelect(value);
    setCheckDate({
      checkInDate: dayjs(value?.startDate) || null,
      checkOutDate: dayjs(value?.endDate) || null,
    });
  };

  const handleCloseItem = () => {
    setOpenItem(false);
  };

  const handleOpenItem = () => {
    setOpenItem(true);
  };
  const { amountCar } = reservation?.new || {};
  return (
    <div>
      <Button onClick={handleOpen}>Rezervasyon</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6"> {pricePerDay} ₺ gece</Typography>
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel id="demo-controlled-open-select-label">
              Rezervasyon Seç
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openItem}
              onClose={handleCloseItem}
              onOpen={handleOpenItem}
              value={reservationSelect?._id}
              label="Rezervasyon Seç"
              onChange={handleChange}
            >
              {myReservation?.map((item) => {
                const { house } = item || {};
                const { title } = house || {};
                return <MenuItem value={item}>{title}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1.5rem",
              mt: "1rem",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Giriş Tarihi"
                value={checkInDate}
                onChange={onChangeInDateHandler}
                minDate={today}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Çıkış Tarihi"
                value={checkOutDate}
                minDate={checkInDate ? dayjs(checkInDate).add(1, "day") : today}
                onChange={(newValue) =>
                  setCheckDate({
                    ...checkDate,
                    checkOutDate: newValue,
                  })
                }
              />
            </LocalizationProvider>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "1rem",
            }}
          ></Box>
          {/* {amount > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography id="modal-modal-description">
                <i>
                  ₺ x {days} gece{" "}
                </i>{" "}
                = <b> ₺</b>
              </Typography>
            </Box>
          )} */}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleNewReservation}
              disabled={!checkInDate || !checkOutDate}
            >
              Rezervasyon Yap
            </Button>
          </Box>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "1rem",
            }}
          >
            Henüz sizden tahsilat yapılmayacak.
          </Typography>

          {amountCar > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography id="modal-modal-description">
                <i>
                  {pricePerDay}₺ x {days} gece{" "}
                </i>{" "}
                = <b>{amountCar} ₺</b>
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}

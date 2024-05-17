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
import { useNavigate, useParams } from "react-router-dom";
import * as dayjs from 'dayjs';

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

export default function BasicModal({ pricePerDay }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate=useNavigate()
  const token = useSelector((state) => state.auth.token);
  const [reservation, setReservation] = useState("");

  const [checkDate, setCheckDate] = useState({
    checkInDate: null,
    checkOutDate: null,
  });

  const { checkInDate, checkOutDate } = checkDate || {};
  const params = useParams();

  const handleReservation = () => {
    if (checkInDate && checkOutDate) {
      axios
        .post(
          `https://rent-project.onrender.com/reservations`,
          {
            startDate: dayjs(checkInDate).format('YYYY-MM-DD'),
            endDate: dayjs(checkOutDate).format('YYYY-MM-DD'),
            house: `${params.id}`,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
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
    console.log("checkInDate", checkInDate);
    console.log("checkOutDate", checkOutDate);
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
  const { amount,_id } = reservation?.data || {};
  const today = dayjs()
  const handleNewReservation=()=>{
    navigate(`/myReservation/${_id}`)
  }
  const days = dayjs(checkOutDate).diff(dayjs(checkInDate), 'day');
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
          <Typography variant="h6">{pricePerDay} ₺ gece</Typography>
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
                minDate={checkInDate ? dayjs(checkInDate).add(1, 'day') : today}
                onChange={(newValue) =>
                  setCheckDate({
                    ...checkDate,
                    checkOutDate: newValue,
                  })
                }
              />
            </LocalizationProvider>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "1rem",
            }}
          >
            <Button onClick={handleNewReservation} disabled={!checkInDate || !checkOutDate}>Rezervasyon Yap</Button>
          </Box>
          {amount > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
              <Typography id="modal-modal-description">
              <i>{pricePerDay}₺ x {days} gece </i>   = <b>{amount} ₺</b>
              </Typography>
            </Box>
          )}
           </Box>
      </Modal>
    </div>
  );
}

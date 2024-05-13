import React, { useEffect, useState } from "react";
import HomeCard from "../../components/HomeCard";
import { Backdrop, CircularProgress, Container, Grid } from "@mui/material";
import axios from "axios";

const Homepage = () => {
  const [houses, setHouses] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios
      .get("https://rent-project.onrender.com/houses")
      .then((res) => {
        console.log(res.data);
        const houseData = res?.data.data || {};
        setHouses(houseData);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      {loader && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Container>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          {houses?.map((house) => {
            return (
              <Grid key={house._id} xs={12} sm={6} md={4} item>
                <HomeCard house={house} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Homepage;

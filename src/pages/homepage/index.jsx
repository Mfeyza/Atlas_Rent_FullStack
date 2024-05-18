import React, { useEffect, useState } from "react";
import HomeCard from "../../components/HomeCard";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import axios from "axios";

const Homepage = () => {
  const [houses, setHouses] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios
      .get("https://rent-project.onrender.com/houses")
      .then((res) => {
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
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

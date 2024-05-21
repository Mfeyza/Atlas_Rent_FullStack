import React, { useEffect, useState } from "react";
import HomeCard from "../../components/HomeCard";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "../../helper/methods";
import HomeCarousel from "../../components/HomeCarousel"
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Input,
  InputAdornment,
} from "@mui/material";
import axios from "axios";

const Homepage = () => {
  const [houses, setHouses] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchName, setSearchName] = useState("");

  const getHouse = (item) => {
    axios
      .get(
        `https://atlas-rent-be.vercel.app/houses${
          item?.keyword ? `?search=${item.keyword}` : ""
        }`
      )
      .then((res) => {
        const houseData = res?.data.data || {};
        setHouses(houseData);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    setLoader(true);
    getHouse();
  }, []);

  const debouncedGetHouse = React.useCallback(
    debounce((keyword) => {
      getHouse({ keyword });
    }, 1000),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchName(value);
    debouncedGetHouse(value);
  };

  return (
    <>
      {loader ? (
        <Box sx={{ display: "flex", justifyContent: "center","alignItems":"center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Container sx={{mt:5,mb:5}}>
            <HomeCarousel/>
          <Box
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              justifyContent:"center",
              ml: 2,
              mt:5
            }}
          >
          
            <FormControl variant="standard">
              <Input
                id="input-with-icon-adornment"
                placeholder="Search…"
                onChange={handleSearch}
                value={searchName}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
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
      )}
    </>
  );
};

export default Homepage;

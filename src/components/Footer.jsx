import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation() || {};
  if (["/login"].includes(pathname)) return;
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        padding:"1.5rem",
        backgroundColor: "rgb(132, 132, 179)"
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6"
            noWrap
            className="atlas"
            component="a"
            sx={{
              m: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",

              textDecoration: "none",
            }}>
              Atlas Rent
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h8"
            noWrap
            component="a"
            sx={{
              m: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color:"white",
              textDecoration: "none",
            }}>
              {`@${new Date().getFullYear()} | Rent | House | Car`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

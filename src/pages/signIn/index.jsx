import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { login, register } from "../../thunks/auththunk";

const theme = createTheme();
const FormBox = styled(Box)({
  width: "100%",
  marginTop: theme.spacing(3),
});

const PaperStyled = styled(Paper)({
  padding: theme.spacing(4),
  borderRadius: "10px",
  boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
  backgroundColor: "#ffffff",
});

const CustomTab = styled(Tab)({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(15),
});

const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    image: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleLoginChange = (e) =>
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) =>
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const houseDetailId = sessionStorage.getItem("houseId");
  console.log(sessionStorage.getItem("houseId"));
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ values: loginInfo }));
    if (houseDetailId) {
      navigate(`/details/${houseDetailId}`);
      return;
    }
    navigate(`/`);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ values: registerInfo, navigate }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: theme.spacing(4),
              borderRadius: "10px",
              boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "rgb(132, 132, 179)" }}>
              <LockOutlinedIcon />
            </Avatar>

            <PaperStyled elevation={6}>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="rgb(132, 132, 179)"
              >
                <CustomTab
                  sx={{ color: "rgb(132, 132, 179)" }}
                  label="Giriş Yap"
                />
                <CustomTab label="Kaydol" />
              </Tabs>
              {tabIndex === 0 && (
                <FormBox component="form" onSubmit={handleLoginSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleLoginChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleLoginChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "rgb(132, 132, 179)",
                      color: "white",
                    }}
                  >
                    GİRİŞ
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link
                        href="#"
                        variant="body2"
                        onClick={() => setTabIndex(1)}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </FormBox>
              )}
              {tabIndex === 1 && (
                <FormBox component="form" onSubmit={handleRegisterSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="İsim"
                        autoFocus
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Soy İsim"
                        name="lastName"
                        autoComplete="family-name"
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="username"
                        label="Kullanıcı Adı"
                        name="username"
                        autoComplete="username"
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Parola"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Tel No"
                        name="phoneNumber"
                        autoComplete="phone"
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="image"
                        label="Resim URL"
                        name="image"
                        autoComplete="image"
                        onChange={handleRegisterChange}
                      />
                    </Grid>
                  </Grid>
                  {status === "loading" && <p>Loading...</p>}
                  {status === "failed" && <p>{error}</p>}
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "rgb(132, 132, 179)",
                      color: "white",
                    }}
                  >
                    Signup
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link
                        href="#"
                        variant="body2"
                        onClick={() => setTabIndex(0)}
                      >
                        {"Already have an account? Sign in"}
                      </Link>
                    </Grid>
                  </Grid>
                </FormBox>
              )}
            </PaperStyled>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { login, register } from '../../thunks/auththunk';

const theme = createTheme();

const FormContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(8),
});

const FormBox = styled(Box)({
  width: '100%',
  marginTop: theme.spacing(3),
});

const PaperStyled = styled(Paper)({
  padding: theme.spacing(4),
  borderRadius: '10px',
  boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
});

const CustomTab = styled(Tab)({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(15),
});

const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [registerInfo, setRegisterInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    image: '',
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ values: loginInfo, navigate }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ values: registerInfo, navigate }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
          alignItems: 'center',
          backgroundColor: '#0d47a1',
        }}
      >
        <FormContainer component="main" maxWidth="xs">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login Form
          </Typography>
          <PaperStyled elevation={6}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <CustomTab label="Girşi Yap" />
              <CustomTab label="Kaydol" />
            </Tabs>
            {tabIndex === 0 && (
              <FormBox component="form" onSubmit={handleLoginSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
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
                <Link variant="body2" sx={{ cursor: 'pointer', mb: 2 }}>
                  Forgot password?
                </Link>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>{error}</p>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="#" variant="body2" onClick={() => setTabIndex(1)}>
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
                      label="First Name"
                      autoFocus
                      onChange={handleRegisterChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
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
                      label="Username"
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
                      label="Email Address"
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
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={handleRegisterChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      autoComplete="phone"
                      onChange={handleRegisterChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="image"
                      label="Image URL"
                      name="image"
                      autoComplete="image"
                      onChange={handleRegisterChange}
                    />
                  </Grid>
                </Grid>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>{error}</p>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Signup
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="#" variant="body2" onClick={() => setTabIndex(0)}>
                      {"Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
              </FormBox>
            )}
          </PaperStyled>
        </FormContainer>
      </Box>
    </ThemeProvider>
  );
};

export default Login;


// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Field, Formik,Form } from "formik"
// import { object, string } from "yup"
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from "../../thunks/auththunk"



// const defaultTheme = createTheme();
// const loginSchema = object({
//     email: string()
//         .email("Lütfen geçerli bir email giriniz")
//         .required("Email girişi zorunludur"),
//     password: string()
//         .required("Şifre zorunludur.")
//         .min(8, "Şifre en az 8 karakter içermelidir")
//         .max(16, "Şifre en fazla 16 karakter içermelidir")
//         .matches(/\d+/, "Şifre en az bir rakam içermelidir")
//         .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
//         .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
//         .matches(/[@$!%*?&]+/, "Şifre en az bir özel karakter (@$!%*?&) içermelidir"),
// });
// export default function SignInSide() {
//     const navigate = useNavigate();
//     const dispatch=useDispatch()
//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Grid container component="main" sx={{ height: '100vh' }}>
//                 <CssBaseline />
//                 <Grid
//                     item
//                     xs={false}
//                     sm={4}
//                     md={7}
//                     sx={{
//                         backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
//                         backgroundRepeat: 'no-repeat',
//                         backgroundColor: (t) =>
//                             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                     <Box
//                         sx={{
//                             my: 8,
//                             mx: 4,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                             <LockOutlinedIcon />
//                         </Avatar>
//                         <Typography component="h1" variant="h5">
//                             Sign in
//                         </Typography>
//                         <Formik
//                             initialValues={{
//                                 email: '',
//                                 password: '',
//                             }}
//                             validationSchema={loginSchema}
//                             onSubmit={(values,actions) => {
//                                 dispatch(login({ values, navigate }))
//                                 actions.resetForm()
//                                 actions.setSubmitting(false) 
//                             }}
//                         >
//                             {({ errors, touched }) => (
//                                 <Form  sx={{ mt: 1 }}>
//                                     <Field as={TextField}
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         id="email"
//                                         label="Email Address"
//                                         name="email"
//                                         autoComplete="email"
//                                         autoFocus
//                                         error={touched.email && Boolean(errors.email)}
//                                         helperText={touched.email && errors.email}
//                                     />
//                                     <Field as={TextField}
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         name="password"
//                                         label="Password"
//                                         type="password"
//                                         id="password"
//                                         autoComplete="current-password"
//                                         error={touched.password && Boolean(errors.password)}
//                                         helperText={touched.password && errors.password}
//                                     />
//                                     <Button
//                                         type="submit"
//                                         fullWidth
//                                         variant="contained"
//                                         sx={{ mt: 3, mb: 2 }}
//                                     >
//                                         Sign In
//                                     </Button>
//                                     <Grid container>
//                                         <Grid item xs>
//                                             <Link href="#" variant="body2">
//                                                 Forgot password?
//                                             </Link>
//                                         </Grid>
//                                         <Grid item>
//                                             <Link href="#" variant="body2">
//                                                 {"Don't have an account? Sign Up"}
//                                             </Link>
//                                         </Grid>
//                                     </Grid>
//                                 </Form>
//                             )}
//                         </Formik>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </ThemeProvider>
//     );
// }




//  <ThemeProvider theme={defaultTheme}>
//              <Grid container component="main" sx={{ height: '100vh' }}>
//                  <CssBaseline />                
//                 <Grid
//                     item
//                     xs={false}
//                     sm={4}
//                     md={7}
//                     sx={{
//                         backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
//                         backgroundRepeat: 'no-repeat',
//                         backgroundColor: (t) =>
//                             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square> 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "../components/Navbar";
import { Backdrop, CircularProgress } from "@mui/material";
import Footer from "../components/Footer";
const Homepage = lazy(() => import("../pages/homepage"));
const HomeDetails = lazy(() => import("../pages/homedetails"));
const SignIn = lazy(() => import("../pages/signIn"));
const MyReservation = lazy(() => import("../pages/myreservation"));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/details/:id" element={<HomeDetails />} />
          <Route path="/Login" element={<SignIn />} />
          <Route path="/myreservation" element={<MyReservation />} />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
};

export default AppRouter;

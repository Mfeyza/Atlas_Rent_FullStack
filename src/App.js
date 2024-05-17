import { Stack } from "@mui/material";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <Stack sx={{display:"flex", justifyContent:"space-between"}} minHeight={"100vh"} maxWidth={"100%"}>
     
      <AppRouter/>

    </Stack>
  );
}

export default App;

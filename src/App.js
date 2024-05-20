import { Stack } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <Stack
      sx={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}
      minHeight={"100vh"}
      maxWidth={"100%"}
    >
      <AppRouter />
    </Stack>
  );
}

export default App;

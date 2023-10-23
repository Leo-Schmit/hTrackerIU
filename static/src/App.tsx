import { Dialog, DialogContent } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppHeader from "./AppHeader";
import Analytics from "./components/Analytics/Analytics";
import Dashboard from "./components/Dashboard/Dashboard";
import HabitDetails from "./components/Habit/HabitDetails";
import NewHabitForm from "./components/Habit/NewHabitForm";
import { HabitDialogProvider, useHabitDialog } from "./context/HabitDialogContext";

const theme = createTheme();

function MainContent() {
  const { isDialogOpen, setDialogOpen } = useHabitDialog();

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/habit/:habitID" element={<HabitDetails />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <NewHabitForm onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HabitDialogProvider>
        <Router>
          <MainContent />
        </Router>
      </HabitDialogProvider>
    </ThemeProvider>
  );
}

export default App;

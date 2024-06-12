import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useHabitDialog } from "./context/HabitDialogContext";

function AppHeader() {
  const { isDialogOpen, setDialogOpen } = useHabitDialog();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Habit Tracker
          </Link>
        </Typography>
        <Button color="inherit" onClick={() => setDialogOpen(true)}>
          Add New Habit
        </Button>
        <Button color="inherit" component={Link} to="/analytics">
          Analytics
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;

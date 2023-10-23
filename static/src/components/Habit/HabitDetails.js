import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { CategoryScale, Chart, LineElement, LinearScale, PointElement } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router-dom";
import { deleteHabit, getHabitDetails } from "../../api/habitsAPI";
import Main from "../../layouts/Main";
import Page from "../../layouts/Page";

Chart.register(PointElement, LineElement, LinearScale, CategoryScale);

function HabitDetails() {
  const { habitID } = useParams();
  const [habitDetails, setHabitDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHabitDetails() {
      const details = await getHabitDetails(habitID);
      setHabitDetails(details);
    }

    fetchHabitDetails();
  }, [habitID]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteHabit(habitID);
    navigate("/");
    handleClose();
  };

  const chartData = {
    labels: Object.keys(habitDetails?.consecutive_streaks || {}).map((key) => new Date(key).toLocaleDateString()),
    datasets: [
      {
        label: "Consecutive Days Completed",
        data: Object.values(habitDetails?.consecutive_streaks || {}),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Main>
      <Page>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginBottom: 2 }}>
          <Typography variant="h4" gutterBottom>
            {habitDetails?.habit.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1" color="textSecondary">
                Periodicity
              </Typography>
              <Typography variant="h6">{habitDetails?.habit.periodicity}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1" color="textSecondary">
                Created on
              </Typography>
              <Typography variant="h6">{new Date(habitDetails?.habit.creation_date).toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1" color="textSecondary">
                Longest Streak
              </Typography>
              <Typography variant="h6">{habitDetails?.longest_streak} days</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1" color="textSecondary">
                Current Streak
              </Typography>
              <Typography variant="h6">{habitDetails?.current_streak} days</Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
              Delete Habit
            </Button>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginTop: 3 }}>
          <Typography variant="h5" gutterBottom>
            Habit Completion Over Time
          </Typography>
          <Line data={chartData} />
        </Paper>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Are you sure you want to delete this habit?"}</DialogTitle>
          <DialogContent>
            <Typography>Deleting this habit will remove all its associated data.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Page>
    </Main>
  );
}

export default HabitDetails;

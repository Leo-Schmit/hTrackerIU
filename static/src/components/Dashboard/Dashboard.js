import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllHabits } from "../../api/habitsAPI";
import { useHabitDialog } from "../../context/HabitDialogContext";
import Main from "../../layouts/Main";
import HabitList from "../Habit/HabitList";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const { refreshState } = useHabitDialog();

  useEffect(() => {
    async function fetchHabits() {
      const fetchedHabits = await getAllHabits();
      setHabits(fetchedHabits);
    }
    fetchHabits();
  }, [refreshState]);

  return (
    <Main>
      <Grid container>
        <Grid item xs={12} md={12}>
          <HabitList habits={habits} setHabits={setHabits} />
        </Grid>
      </Grid>
    </Main>
  );
}

export default Dashboard;

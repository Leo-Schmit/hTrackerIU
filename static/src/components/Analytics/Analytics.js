import { Divider, Grid, Link, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllHabits, getLongestStreakForAll, getStruggledHabitsLastMonth } from "../../api/habitsAPI";
import Main from "../../layouts/Main";
import Page from "../../layouts/Page";

function Analytics() {
  const [habits, setHabits] = useState([]);
  const [longestStreak, setLongestStreak] = useState(0);
  const [struggledHabits, setStruggledHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const allHabits = await getAllHabits();
      setHabits(allHabits);
      const streak = await getLongestStreakForAll();
      setLongestStreak(streak);
      const struggled = await getStruggledHabitsLastMonth();
      setStruggledHabits(struggled);
    }

    fetchData();
  }, []);

  const habitsByPeriodicity = {
    daily: habits.filter((habit) => habit.habit.periodicity === "DAILY").length,
    weekly: habits.filter((habit) => habit.habit.periodicity === "WEEKLY").length,
    monthly: habits.filter((habit) => habit.habit.periodicity === "MONTHLY").length,
    yearly: habits.filter((habit) => habit.habit.periodicity === "YEARLY").length,
  };

  return (
    <Main>
      <Page>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginBottom: 2 }}>
          <Typography variant="h4" gutterBottom>
            Analytics
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              { label: "Total Habits", value: habits.length },
              { label: "Daily Habits", value: habitsByPeriodicity.daily },
              { label: "Weekly Habits", value: habitsByPeriodicity.weekly },
              { label: "Monthly Habits", value: habitsByPeriodicity.monthly },
              { label: "Yearly Habits", value: habitsByPeriodicity.yearly },
              { label: "Longest Streak", value: `${longestStreak} days` },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {item.label}
                </Typography>
                <Typography variant="h3" color="primary">
                  {item.value}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Habits struggled with last month:
          </Typography>
          {struggledHabits.length > 0 ? (
            <ul>
              {struggledHabits.map((habit, index) => (
                <li key={index}>
                  <Link
                    href={`/habit/${habit.habit.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      navigate(`/habit/${habit.habit.id}`);
                    }}
                    sx={{ color: "primary.main", textDecoration: "underline", cursor: "pointer" }}
                  >
                    {habit.habit.description}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <>-</>
          )}
        </Paper>
      </Page>
    </Main>
  );
}

export default Analytics;

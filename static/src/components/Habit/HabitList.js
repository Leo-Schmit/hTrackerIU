import React from "react";
import { completeHabit } from "../../api/habitsAPI";
import Habit from "./Habit";

function HabitList({ habits, setHabits }) {
  const handleComplete = async (habitId) => {
    const habit = habits.find((h) => h.habit.id === habitId);

    if (habit.is_current_period_marked) {
      return;
    }

    await completeHabit(habitId);

    setHabits((prevHabits) => {
      return prevHabits.map((h) => {
        if (h.habit.id === habitId) {
          return {
            ...h,
            habit: {
              ...h.habit,
            },
            current_streak: h.current_streak + 1,
            is_current_period_marked: true,
          };
        }
        return h;
      });
    });
  };

  const groupedHabits = habits.reduce((acc, habit) => {
    const key = habit.habit.periodicity;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(habit);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedHabits).map(([periodicity, habitsGroup]) => (
        <div key={periodicity}>
          <h3>{periodicity.charAt(0).toUpperCase() + periodicity.slice(1)} Habits</h3>
          {habitsGroup.map((habit) => (
            <Habit key={habit.habit.id} habit={habit} onComplete={handleComplete} />
          ))}
        </div>
      ))}
    </>
  );
}

export default HabitList;

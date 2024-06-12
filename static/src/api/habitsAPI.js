import * as ApiClient from "../client";

const api = ApiClient.DefaultApiFactory(
  new ApiClient.Configuration({
    basePath: `http://localhost:${process.env.REACT_APP_PORT || window.location.port}`,
  })
);

export async function createHabit(habitData) {
  try {
    return await api.createHabit(habitData);
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error;
  }
}

export async function getAllHabits() {
  try {
    const habits = await api.getAllHabits();
    return habits.data;
  } catch (error) {
    console.error("Error fetching all habits:", error);
    throw error;
  }
}

export async function getHabitDetails(habitID) {
  try {
    const habitDetails = await api.getHabitDetails(habitID);
    return habitDetails.data;
  } catch (error) {
    console.error(`Error fetching details for habit ${habitID}:`, error);
    throw error;
  }
}

export async function completeHabit(habitID) {
  try {
    return await api.completeHabitTask(habitID);
  } catch (error) {
    console.error(`Error completing habit ${habitID}:`, error);
    throw error;
  }
}

export async function deleteHabit(habitID) {
  try {
    return await api.deleteHabit(habitID);
  } catch (error) {
    console.error(`Error deleting habit ${habitID}:`, error);
    throw error;
  }
}

export async function getLongestStreakForAll() {
  try {
    const streak = await api.getLongestStreakForAllHabits();
    return streak.data.streak;
  } catch (error) {
    console.error("Error fetching longest streak for all habits:", error);
    throw error;
  }
}

export async function getLongestStreakForHabit(habitID) {
  try {
    const streak = await api.getLongestStreakForHabit(habitID);
    return streak.data.streak;
  } catch (error) {
    console.error(`Error fetching longest streak for habit ${habitID}:`, error);
    throw error;
  }
}

export async function getStruggledHabitsLastMonth() {
  try {
    const habits = await api.getStruggledHabitsLastMonth();
    return habits.data;
  } catch (error) {
    console.error("Error fetching habits struggled with last month:", error);
    throw error;
  }
}

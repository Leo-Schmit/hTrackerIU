import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHabit } from "../../api/habitsAPI";
import { useHabitDialog } from "../../context/HabitDialogContext";

function NewHabitForm({ onClose }) {
  const [description, setDescription] = useState("");
  const [periodicity, setPeriodicity] = useState("DAILY");
  const { refreshHabits } = useHabitDialog();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createHabit({ description, periodicity });
    refreshHabits();
    onClose();
    navigate("/");
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Habit
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ mt: 1 }}
        />
        <FormControl fullWidth margin="normal" variant="outlined" sx={{ mt: 2 }}>
          <InputLabel>Periodicity</InputLabel>
          <Select
            input={<OutlinedInput label="Periodicity" />}
            value={periodicity}
            onChange={(e) => setPeriodicity(e.target.value)}
          >
            <MenuItem value="DAILY">Daily</MenuItem>
            <MenuItem value="WEEKLY">Weekly</MenuItem>
            <MenuItem value="MONTHLY">Monthly</MenuItem>
            <MenuItem value="YEARLY">Yearly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, width: "100%" }}>
          Add Habit
        </Button>
      </form>
    </Box>
  );
}

export default NewHabitForm;

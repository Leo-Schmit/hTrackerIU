import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Box, Card, IconButton, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Habit({ habit, onComplete }) {
  const navigate = useNavigate();

  return (
    <StyledCard elevation={3}> 
      <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
        <Box
          sx={{
            marginRight: 2,
            width: 40,
            display: "flex",
            justifyContent: "center",
            padding: 1,
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onComplete(habit.habit.id);
          }}
        >
          {habit.is_current_period_marked ? (
            <CheckCircleIcon sx={{ fontSize: 28 }} color="success" />
          ) : (
            <RadioButtonUncheckedIcon color="disabled" />
          )}
        </Box>

        <Box flex={1}>
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
            {habit.habit.description}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          <EmojiEventsIcon color="action" sx={{ marginRight: 1 }} />
          <Typography variant="body1">{habit.current_streak}</Typography>
        </Box>

        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/habit/${habit.habit.id}`);
          }}
        >
          <ArrowForwardIosIcon color="primary" />
        </IconButton>
      </Box>
    </StyledCard>
  );
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRadius: "10px",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    transform: "scale(1.02)",
  },
}));

export default Habit;

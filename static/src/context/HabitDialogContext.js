import { createContext, useCallback, useContext, useState } from "react";

const HabitDialogContext = createContext();

export function HabitDialogProvider({ children }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [refreshState, setShouldRefresh] = useState(false);

  const refreshHabits = useCallback(() => {
    setShouldRefresh((prev) => !prev);
  }, []);

  return (
    <HabitDialogContext.Provider value={{ isDialogOpen, setDialogOpen, refreshHabits, refreshState }}>
      {children}
    </HabitDialogContext.Provider>
  );
}

export function useHabitDialog() {
  return useContext(HabitDialogContext);
}

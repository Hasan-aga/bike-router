import { useCallback, useState } from "react";

const useToggleDash = (initialState = false): [boolean, () => void] => {
  // Initialize the state
  const [dashState, setDashState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggleDash = useCallback(() => setDashState((state) => !state), []);

  return [dashState, toggleDash];
};

export default useToggleDash;

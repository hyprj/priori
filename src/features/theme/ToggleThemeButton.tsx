import { useTheme } from "./useTheme";
import { Button } from "@components/button/Button";

export function ToggleThemeButton() {
  const { currentTheme, setTheme } = useTheme();
  return currentTheme === "light" ? (
    <Button variant="gray" onClick={() => setTheme("dark")}>
      Dark mode
    </Button>
  ) : (
    <Button onClick={() => setTheme("light")}>Light Mode</Button>
  );
}

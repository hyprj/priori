import { Button } from "@components/button/Button";
import { useTheme } from "@features/theme/useTheme";
import { MoonIcon } from "@heroicons/react/20/solid";
import { SunIcon } from "@heroicons/react/24/outline";

export function ThemeButton() {
  const { currentTheme, setTheme } = useTheme();
  return (
    <Button
      className="w-full"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      <span className="flex justify-between">
        <span></span>
        {currentTheme === "dark" ? "Light" : "Dark"}
        {currentTheme === "dark" ? (
          <SunIcon className="w-4 text-yellow-300" />
        ) : (
          <MoonIcon className="w-4 text-slate-800" />
        )}
      </span>
    </Button>
  );
}

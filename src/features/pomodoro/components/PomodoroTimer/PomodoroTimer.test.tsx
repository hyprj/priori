import { fireEvent, render } from "@testing-library/react";
import { PomodoroTimer } from "./PomodoroTimer";
import { PomodoroProvider } from "../../provider/PomodoroProvider";
import { formatTime } from "../../utils/utils";
import { DEFAULT_TIMER_PROPS } from "../../store/timerSlice";
import { afterEach, vi } from "vitest";

vi.mock("@features/auth/AuthProvider", () => {
  return {
    useAuth: vi.fn(() => ({
      user: null,
    })),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("PomodoroTimer", () => {
  it("Should render PomodoroTimer with default timeleft", () => {
    const { getByLabelText } = render(
      <PomodoroProvider>
        <PomodoroTimer />
      </PomodoroProvider>
    );

    const timer = getByLabelText("pomodoro-timer");
    expect(timer).toHaveTextContent(formatTime(DEFAULT_TIMER_PROPS.timeleft));
  });

  it("Should change mode on click", () => {
    const { getByLabelText, getByText } = render(
      <PomodoroProvider>
        <PomodoroTimer />
      </PomodoroProvider>
    );

    const shortBreakButton = getByText(/short break/i);
    fireEvent.click(shortBreakButton);

    const timer = getByLabelText("pomodoro-timer");
    const dataMode = timer.getAttribute("data-mode");

    expect(dataMode).toBe("short-break");
  });

  it("Should show confirm modal on change while running", () => {
    const { getByText } = render(
      <PomodoroProvider>
        <PomodoroTimer />
      </PomodoroProvider>
    );

    const confirm = vi.spyOn(window, "confirm").mockReturnValueOnce(true);

    const startButton = getByText(/START/i);
    fireEvent.click(startButton);

    const shortBreakButton = getByText(/short break/i);

    fireEvent.click(shortBreakButton);

    expect(confirm).toBeCalled();
  });
});

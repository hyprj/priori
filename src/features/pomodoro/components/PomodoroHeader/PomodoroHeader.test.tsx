import { PomodoroProvider } from "@features/pomodoro/provider/PomodoroProvider";
import { vi } from "vitest";
import { PomodoroHeader } from "./PomodoroHeader";
import { fireEvent, render } from "@testing-library/react";

vi.mock("@features/auth/AuthProvider", () => {
  return {
    useAuth: vi.fn(() => ({
      user: null,
    })),
  };
});

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

afterEach(() => {
  vi.clearAllMocks();
});

describe("PomodoroHeader", () => {
  it("Should open settings modal on settings button click", () => {
    const { getByLabelText, getByTestId } = render(
      <PomodoroProvider>
        <PomodoroHeader />
      </PomodoroProvider>
    );
    const settingsButton = getByLabelText("pomodoro settings");

    fireEvent.click(settingsButton);

    const modal = getByTestId("pomodoro-settings-modal");

    expect(modal).toBeInTheDocument();
  });
});

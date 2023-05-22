import { formatTime } from "./utils";

describe("format time for pomodoro", () => {
  it("should format time correctly", () => {
    const result = formatTime(65);
    expect(result).toBe("01:05");
  });

  it("should format time correctly when minutes and seconds are double digits", () => {
    const result = formatTime(130);
    expect(result).toBe("02:10");
  });

  it("should add leading zeros when minutes or seconds are less than 10", () => {
    const result1 = formatTime(300);
    const result2 = formatTime(30);
    expect(result1).toBe("05:00");
    expect(result2).toBe("00:30");
  });
});

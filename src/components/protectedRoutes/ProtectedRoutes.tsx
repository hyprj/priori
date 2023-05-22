import { useAuth } from "@features/auth/AuthProvider";
import { PomodoroProvider } from "@features/pomodoro/provider/PomodoroProvider";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function ProtectedRoutes() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <PomodoroProvider>
      <Outlet />
    </PomodoroProvider>
  );
}

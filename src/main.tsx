import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "@features/theme/ThemeProvider";
import App from "./App";

import "./index.css";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, suspense: true } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

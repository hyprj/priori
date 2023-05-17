import { Button } from "@components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "@layouts/Page/Page";
import { useUser } from "@features/auth/useUser";
import { useEffect } from "react";

export function LandingPage() {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, []);

  return (
    <Page noSidebar>
      <section className="flex w-full flex-col items-center bg-gradient-to-b from-[#e2c2ff] to-[#ffc3e1] py-32 text-center dark:bg-heavyRain-dark">
        <h2 className="mb-8 text-3xl font-bold leading-snug md:text-5xl">
          Organize your tasks, stay focused,
          <br /> achieve your goals.
        </h2>
        <p className="max-w-md text-xl">
          Get more done with{" "}
          <b>
            <i>Priori</i>
          </b>
          , the ultimate productivity app.
        </p>
        <div className="mt-8">
          <Button variant="action" size="lg">
            Start using for free
          </Button>
        </div>
        <div className="mt-20">
          <p>See more</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.3}
            stroke="currentColor"
            className="h-20 w-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
            />
          </svg>
        </div>
      </section>
      <section className="bg-[#fff7d6] py-8 pb-40 text-center dark:bg-slate-800">
        <div className="mb-8">
          <p>Welcome</p>
        </div>
        <Button variant="success" size="lg">
          <Link to="/app">Start working as a guest</Link>
        </Button>
      </section>
    </Page>
  );
}

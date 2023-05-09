import { Button } from "@components/button/Button";
import { useUser } from "@features/auth/useUser";
import { Link } from "react-router-dom";
import { Page } from "@layouts/Page/Page";

export function LandingPage() {
  // const navigate = useNavigate();
  const user = useUser();

  return (
    <Page noSidebar>
      {user && (
        <Link
          to="/app"
          className="fixed bg-blue-400 w-full text-center text-white p-1"
        >
          You are signed in. Click to go to app
        </Link>
      )}
      <section className="py-32 w-full flex flex-col items-center text-center bg-gradient-to-b from-[#e2c2ff] to-[#ffc3e1]">
        <h2 className="text-3xl md:text-5xl leading-snug font-bold mb-8">
          Organize your tasks, stay focused,
          <br /> achieve your goals.
        </h2>
        <p className="text-xl max-w-md">
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
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
            />
          </svg>
        </div>
      </section>
      <section className="py-8 pb-40 text-center bg-[#fff7d6]">
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

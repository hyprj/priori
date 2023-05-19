import { AuthForm } from "@features/auth/AuthForm";
import { Page } from "@layouts/Page/Page";
import { signUpWithEmail } from "@services/db";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignUpPage() {
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  async function onSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      setError(null);
      const newUser = await signUpWithEmail(email, password);
      if (newUser.user) {
        console.log("done");
        navigate("/login");
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <Page>
      <div className="flex h-full  justify-center ">
        <div className="mt-24 min-w-[20rem]">
          {error && (
            <p className=" absolute w-full text-center text-red-500">{error}</p>
          )}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-700">
            <h3 className="mb-8 text-3xl font-bold">Sign Up</h3>
            {error && <p>{error}</p>}
            <div>
              <AuthForm onSubmit={onSubmit} authType="SIGNUP" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

import { AuthForm } from "@features/auth/AuthForm";
import { Page } from "@layouts/Page/Page";
import { signInWithEmail } from "@services/db";
import { queryClient } from "../main";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function LoginPage() {
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
      const user = await signInWithEmail(email, password);
      // if (user.user) {
      // queryClient.setQueryData("user", user.user);
      // navigate("/app");
      // }
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <Page>
      <div className="flex h-full  justify-center ">
        <div className="relative mt-24 min-w-[20rem]">
          {error && (
            <p className=" absolute w-full text-center text-red-500">{error}</p>
          )}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-700">
            <h3 className="mb-8 text-3xl font-bold">Log in</h3>
            <div>
              <AuthForm onSubmit={onSubmit} authType="LOGIN" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

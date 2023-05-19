import { Button } from "@components/button/Button";
import { TextInput } from "@components/textInput/TextInput";
import { signInWithGithub } from "@services/db";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface AuthInputs {
  email: string;
  password: string;
}

export function AuthForm({
  onSubmit,
  authType,
}: {
  onSubmit: (inputs: AuthInputs) => void;
  authType: "LOGIN" | "SIGNUP";
}) {
  const { handleSubmit, register, formState } = useForm<AuthInputs>();

  async function loginWithGithub() {
    try {
      await signInWithGithub();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
      <div className="mb-6">
        <TextInput
          className="w-full"
          type="email"
          label={"Email"}
          id={"email-input"}
          register={register}
          error={undefined}
          name={"email"}
          validationSchema={undefined}
        />
        <TextInput
          className="w-full"
          type="password"
          label={"Password"}
          id={"password-input"}
          register={register}
          error={undefined}
          name={"password"}
          validationSchema={{ minLength: 6, required: true }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant="action"
          disabled={!formState.isValid}
          size="md"
          className="w-full"
          type="submit"
        >
          {authType === "LOGIN" ? "Log In" : "Sign In"}
        </Button>
        <Button
          size="md"
          variant="gray"
          className="w-full"
          onClick={() => loginWithGithub()}
        >
          Log in with GitHub
        </Button>
        {authType === "LOGIN" ? (
          <Link to="/register">
            <p className="text-center text-xs">Don't have an account?</p>
          </Link>
        ) : (
          <Link to="/login">
            <p className="text-center text-xs">Already have an account?</p>
          </Link>
        )}
      </div>
    </form>
  );
}

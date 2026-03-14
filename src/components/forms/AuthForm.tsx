"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginUser, signupUser } from "@/lib/api";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  mode: AuthMode;
}

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Enter your full name"),
});

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const schema = mode === "signup" ? signupSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues | SignupValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: LoginValues | SignupValues) => {
    setLoading(true);
    setMessage(null);

    try {
      if (mode === "signup") {
        const result = await signupUser({
          email: values.email,
          password: values.password,
          name: "name" in values ? values.name : undefined,
        });

        if (result.error) {
          setMessage(result.error.message);
        } else {
          setMessage("Account created. Redirecting to login...");
          router.replace("/login");
        }
      } else {
        const result = await loginUser({
          email: values.email,
          password: values.password,
        });

        if (result.error) {
          setMessage(result.error.message);
        } else {
          setMessage("Signed in. Redirecting...");
          router.replace("/dashboard");
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Auth request failed:", error);
      setMessage("Unable to complete the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {mode === "signup" && (
        <Input
          label="Full name"
          placeholder="Dr. Elena Torres"
          {...register("name" as const)}
          error={"name" in errors ? errors.name?.message?.toString() : undefined}
        />
      )}
      <Input
        label="Work email"
        placeholder="provider@medstack.health"
        type="email"
        error={errors.email?.message?.toString()}
        {...register("email")}
      />
      <Input
        label="Password"
        placeholder="••••••••"
        type="password"
        error={errors.password?.message?.toString()}
        {...register("password")}
      />
      {message && <p className="text-sm text-slate-500">{message}</p>}
      <Button loading={loading} type="submit" className="w-full">
        {mode === "login" ? "Login" : "Sign up"}
      </Button>
    </form>
  );
}

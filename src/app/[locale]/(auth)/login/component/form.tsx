"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(7).required(),
  })
  .required();

type Inputs = yup.InferType<typeof formSchema>;

export const LoginForm: FC = () => {
  const t = useTranslations("Login");
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = ({ email: username, password }) => {
    setLoading(true);
    signIn("credentials", {
      username,
      password,
      redirect: false,
    })
      .then((response) => {
        const { message, code } = JSON.parse(response?.error ?? "{}");

        if (message) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: message,
          });

          const filterParams = new URLSearchParams({
            email: username,
          });

          if (code === "UserNotConfirmedException") {
            router.push(`/signup-confirm?${filterParams.toString()}`);
          }
        } else {
          router.push("/");
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center justify-center mx-4 w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("greetings")}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {t("description")}
        </p>
      </div>
      <Card className="pt-4 w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="text"
                placeholder="m@example.com"
                {...register("email")}
              />
              <p>{errors.email?.message}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("password")}</Label>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
                  prefetch={false}
                >
                  {t("forgot-password")}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
              />
              <p>{errors.password?.message}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                t("submit")
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        {t("dont-have-account")}{" "}
        <Link
          href="/signup"
          className="font-medium text-gray-900 hover:underline dark:text-gray-50"
          prefetch={false}
        >
          {t("sign-up")}
        </Link>
      </div>
    </div>
  );
};

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

const validationSchema = z.object({
  formEmail: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email"
  }),
  formPassword: z.string().min(1, { message: "Password is required" })
});

type LoginValidation = z.infer<typeof validationSchema>;

const HomePage = ({
  setIsOpen
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValidation>({
    resolver: zodResolver(validationSchema)
  });

  const router = useRouter();

  const validateUser = async (data: LoginValidation) => {
    const response = await axios.post(
      "http://localhost:3001/api/login",
      data
    );
    console.log(response)
    const accessToken = response.data.accessToken
     localStorage.setItem('accessToken', accessToken);
    return response;
  };

  const mutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    LoginValidation
  >(validateUser);

  const onSubmit: SubmitHandler<LoginValidation> = useCallback(
    (data: LoginValidation) => {
      mutation.mutate(data, {
        onSuccess: (data, variables, context) => {
          router.push("/home");
        }
      });
    },
    [mutation, router]
  );

  return (
    <div className="h-2/3 ml-40 text-center shadow-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col font-medium gap-2 w-full px-10 pt-10 mb-4"
      >
        {mutation.error && (
          <div>
            {mutation.error.response &&
            mutation.error.response.data &&
            typeof mutation.error.response.data === "string" &&
            mutation.error.response.headers["content-type"]?.includes(
              "text/html"
            ) &&
            mutation.error.response.data.startsWith("<!DOCTYPE html>") ? (
              <p className="text-red-700 font-semibold text-sm">
                An error occurred. Please try again later.
              </p>
            ) : (
              <p className="text-red-700 font-semibold text-sm">
                {mutation.error.response?.data}
              </p>
            )}
          </div>
        )}
        <div className="gap-2">
          <label htmlFor="email"> Username </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            className="p-2 ml-1 rounded-lg border"
            placeholder="Email or Phone number"
            {...register("formEmail", { required: true })}
          />
          {errors.formEmail && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.formEmail?.message}
            </p>
          )}
        </div>
        <div className="gap-2">
          <label htmlFor="password"> Password </label>
          <input
            id="password"
            required
            className="p-2 ml-1 rounded-lg border "
            type="password"
            placeholder="Password"
            {...register("formPassword", { required: true })}
          />
          {errors.formPassword && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.formPassword?.message}
            </p>
          )}
        </div>
        <button className="border hover:border-black p-2 mt-2 rounded-lg">
          {" "}
          {mutation.isLoading ? (
            <span className="loading loading-infinity loading-md"></span>
          ) : (
            "Log in"
          )}
        </button>
      </form>
      <hr className="w-3/4 ml-9" />
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-neutral mt-3 mb-2 hover:text-white"
      >
        {" "}
        Create new account{" "}
      </button>
    </div>
  );
};

export default HomePage;

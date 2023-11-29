"use client";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

type LoginForm = {
  formEmail: string;
  formPassword: string;
};

const HomePage = ({
  setIsOpen
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  const router = useRouter();

  const validateUser = async (data: LoginForm) => {
    const response = await axios.post<LoginForm>(
      "http://localhost:3001/api/users",
      data
    );

    return response;
  };

  const mutation = useMutation<AxiosResponse<any, any>, Error, LoginForm>(
    validateUser
  );

  const onSubmit: SubmitHandler<LoginForm> = useCallback(
    (data: LoginForm) => {
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
          <p className="text-red-700 font-semibold text-sm">
            {" "}
            {(mutation.error as any)?.response?.data ||
              (mutation.error as Error)?.message ||
              "An error occurred"}
          </p>
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

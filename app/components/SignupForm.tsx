"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { z } from "zod";

const validationSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First and Last Name must be atleast 3 characters" }),
    lastName: z
      .string()
      .min(3, { message: "First and Last Name must be atleast 3 characters" }),
    userEmail: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email"
    }),
    hashPassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" })
  })
  .refine((data) => data.hashPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match"
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const SignupForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const registerUser = async (data: ValidationSchema) => {
    const res = await axios.post("http://localhost:3001/api/register", data);
    return res;
  };

  const mutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    ValidationSchema,
    unknown
  >(registerUser);


  const onSubmit: SubmitHandler<ValidationSchema> = useCallback(
    (data: ValidationSchema) => {
      mutation.mutate(data, {
        onSuccess: (data, variable, context) => {
          toast.success("Account was created.");
          onClose();
        },
        onError: (error) => {
          toast.error("Failed to Create the Account");
        }
      });
    },
    [mutation, onClose]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-6 justify-center items-center w-full"
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
      {errors.firstName && (
        <p className="text-xs italic text-red-500 mt-2">
          {" "}
          {errors.firstName?.message}
        </p>
      )}
      {errors.lastName && (
        <p className="text-xs italic text-red-500 mt-2">
          {" "}
          {errors.lastName?.message}
        </p>
      )}
      <div className="flex mb-2 gap-1 w-4/5">
        <input
          type="text"
          className="border p-2 w-1/2"
          required
          placeholder="First Name"
          {...register("firstName", { required: true })}
        />

        <input
          type="text"
          className="border p-2 w-1/2"
          required
          placeholder="Last Name"
          {...register("lastName", { required: true })}
        />
      </div>
      <div className="flex flex-col gap-2 w-4/5">
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          className="border p-2"
          placeholder="Email"
          {...register("userEmail", { required: true })}
        />
        {errors.userEmail && (
          <p className="text-xs italic text-red-500 mt-2">
            {" "}
            {errors.userEmail?.message}
          </p>
        )}
        <input
          type="password"
          className="border p-2"
          required
          placeholder="Password"
          {...register("hashPassword", { required: true })}
        />
        {errors.hashPassword && (
          <p className="text-xs italic text-red-500 mt-2">
            {" "}
            {errors.hashPassword?.message}
          </p>
        )}
        <input
          type="password"
          className="border p-2"
          required
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: true
          })}
        />
        {errors.confirmPassword && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.confirmPassword?.message}
          </p>
        )}
      </div>
      <button className="btn btn-neutral mt-4 hover:text-white">
        {" "}
        {mutation.isLoading ? (
          <span className="loading loading-infinity loading-md"></span>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default SignupForm;

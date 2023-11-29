"use client";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  firstName: string;
  lastName: string;
  userEmail: string;
  hashPassword: string;
  confirmPassword: string;
};

const SignupForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();

  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    axios
      .post("http://localhost:3001/api/register", data)
      .then((response) => {
        console.log(response);
        toast.success("Account was created.");
        onClose();
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.response.data);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-6 justify-center items-center w-full"
    >
      {errorMessage && (
        <p className="text-red-700 font-semibold text-sm"> {errorMessage} </p>
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
          type="email"
          autoComplete="email"
          required
          className="border p-2"
          placeholder="Email"
          {...register("userEmail", { required: true })}
        />
        <input
          type="password"
          className="border p-2"
          required
          placeholder="Password"
          {...register("hashPassword", { required: true })}
        />
        <input
          type="password"
          className="border p-2"
          required
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: true,
            validate: (val: string) => {
              if (watch("hashPassword") != val) {
                setValid(true);
                return "";
              }
            }
          })}
        />
        {valid && (
          <p className="text-red-700 font-semibold text-sm">
            {" "}
            Password did not match.{" "}
          </p>
        )}
      </div>
      <button className="btn btn-neutral mt-4 hover:text-white">
        {" "}
        {loading ? (
          <span className="loading loading-infinity loading-md"></span>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default SignupForm;

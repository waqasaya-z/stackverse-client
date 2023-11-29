"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type LoginForm = {
  formEmail: string;
  formPassword: string;
};

const HomePage = ({
  setIsOpen
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    setLoading(true);
    axios
      .post("http://localhost:3001/api/users", data)
      .then((res) => {
        router.push("/home");
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        setLoading(false);
      });
  };

  return (
    <div className="h-2/3 ml-40 text-center shadow-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col font-medium gap-2 w-full px-10 pt-10 mb-4"
      >
        {errorMessage && (
          <p className="text-red-700 font-semibold text-sm"> {errorMessage} </p>
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
          {loading ? (
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

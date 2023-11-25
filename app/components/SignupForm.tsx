"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  userEmail: string;
  hashPassword: string;
};

const SignupForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();;


  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.post("http://localhost:3001/api/register", data).then(response => {
      // Handle success, access response data
      console.log('Response:', response.data);
      // router.push("/");
      onClose();
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-6 justify-center items-center w-full"
    >
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
        />
      </div>
      <button className="btn btn-neutral mt-4 hover:text-white">
        {" "}
        Sign Up{" "}
      </button>
    </form>
  );
};

export default SignupForm;

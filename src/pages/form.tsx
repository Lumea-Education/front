import { useState } from "react";
import { useForm } from "react-hook-form";

interface PreOrderForm {
  name: string;
  email: string;
  phone: string;
}

export default function Form() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreOrderForm>();

  const onSubmit = (data: PreOrderForm) => {
    console.log("Pre-order submitted:", data);
    setSubmitted(true);
  };

  return (
    <div className="md:my-48 my-10 text-center md:space-y-24 space-y-16 px-6 md:px-0">
      <div className="md:space-y-10 space-y-5">
        <h1 className="md:text-6xl text-3xl text-primary-submit">
          Thank you for choosing us!
        </h1>
        <p className="text-xl text-black">
          We are expecting to come by June 2025! We will notify you via email!
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg md:w-96 mx-auto">
        {submitted ? (
          <p className="text-xl text-green-500">
            We will get back to you as soon as possible!
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              Stay tuned for Exclusive Access
            </h2>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              type="email"
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              type="tel"
              placeholder="Your Phone Number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-500 hover:cursor-pointer transition"
            >
              Sign up for the early access
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

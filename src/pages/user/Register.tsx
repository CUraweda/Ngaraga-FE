
import { FaArrowLeftLong } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import bg from "@/assets/bg-register.jpeg";

import useAuthStore from "@/store/auth.store";
import Input from "@/components/ui/InputField";
import { useState } from "react";
import Swal from "sweetalert2";

type SignIn = {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuthStore();
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: { email: "", password: "", confirm_password: "", name: "" },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required("email required")
          .email("email invalid format"),
        password: yup.string().required("password required"),
        confirm_password: yup.string().required("confirm password required"),
        name: yup.string().required("name required"),
      })
    ),
  });


  const onSubmit = async (formData: SignIn) => {
    await register(formData).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/login");
    });
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="hidden md:flex w-1/2 h-full justify-center items-center">
          <img src={bg} alt="logo" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 h-full  flex flex-col justify-center items-start p-5">
          <div className="w-full flex">
            <button
              className="btn btn-sm btn-ghost text-yellow-500 text-md"
              onClick={() => navigate("/")}
            >
              <FaArrowLeftLong /> Back
            </button>
          </div>
          <div className="w-full flex h-full justify-center items-center ">
            <div className="flex flex-col gap-5 w-full max-w-96 text-center">
              <p className="text-3xl font-bold text-center">Create Acount</p>
              <p>
                Welcome! enter your details and start creating, collecting Cards
              </p>
              <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  className="grow"
                  placeholder="username"
                  error={errors.name?.message}
                  {...registerForm("name")}
                />
                <Input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  error={errors.email?.message}
                  {...registerForm("email")}
                />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={errors?.password}
                  {...registerForm("password")}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  error={errors?.confirm_password}
                  {...registerForm("confirm_password")}
                />
                <label className="label w-full">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <span className="label-text">Show Password</span>
                </label>

                <button className="btn btn-warning bg-yellow-500 text-white">
                  Create Acount
                </button>
              </form>
              <p>
                {" "}
                Already have an account?{" "}
                <span
                  className="font-bold text-yellow-500 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  {" "}
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

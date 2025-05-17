import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaArrowLeftLong } from "react-icons/fa6";
import Swal from "sweetalert2";

import useAuthStore from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import Input from "@/components/ui/InputField";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { listedParam, listedParamAdmin } from "@/constant/listed.param";

type SignIn = {
  email: string;
  password: string;
};

const Login = () => {
  const { login, error, user } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required("email required")
          .email("email invalid format"),
        password: yup.string().required("password required"),
      })
    ),
  });

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      let timerInterval: NodeJS.Timeout;
      Swal.fire({
        title: "Login Success",
        html: "You will be redirected to the home page in <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup()?.querySelector("b");
          timerInterval = setInterval(() => {
            if (timer) {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }
          }, 100);
        },
        willClose: () => {
          if (user?.role === "admin") {
            navigate(listedParamAdmin.home);
          } else {
            navigate(listedParam.home);
          }
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    }
  }, [user, navigate]);

  const onSubmit = async (formData: SignIn) => {
    await login(formData);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-1/2 h-full flex justify-center items-center">asd</div>
        <div className="w-1/2 h-full  flex flex-col justify-center items-start p-5">
          <div className="w-full flex">
            <button className="btn btn-sm btn-ghost text-yellow-500 text-md">
              <FaArrowLeftLong /> Back
            </button>
          </div>
          <div className="w-full flex h-full justify-center items-center ">
            <div className="flex flex-col gap-5 w-full max-w-96 text-center">
              <p className="text-3xl font-bold text-center">Welcome back!</p>
              <p>
                Enter your details to access your account and continue your
                journey of creating and collecting Cards.
              </p>
              <form
                action=""
                className="flex flex-col gap-3 w-full justify-start items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <div className="space-y-2 w-full">
                  <div className="relative">
                    <Input
                      type={!showPassword ? "text" : "password"}
                      placeholder="Password"
                      error={errors?.password}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <span>Forgot Your Password?</span>
                </div>
                <button
                  type="submit"
                  className="btn w-full btn-warning bg-yellow-500 text-white"
                >
                  Sign In
                </button>
              </form>
              <p>
                {" "}
                Don’t you have an account?{" "}
                <span className="font-bold text-yellow-500">Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

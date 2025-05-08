import { CiMail } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoKeyOutline, IoPersonOutline } from "react-icons/io5";

const Register = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-1/2 h-full flex justify-center items-center">asd</div>
        <div className="w-1/2 h-full  flex flex-col justify-center items-start p-5">
          <div className="w-full flex">
           <button className="btn btn-sm btn-ghost text-yellow-500 text-md"><FaArrowLeftLong/> Back</button>
          </div>
          <div className="w-full flex h-full justify-center items-center ">
            <div className="flex flex-col gap-5 w-full max-w-96 text-center">
              <p className="text-3xl font-bold text-center">Create Acount</p>
              <p>
                Welcome! enter your details and start creating, collecting Cards
              </p>
              <form action="" className="flex flex-col gap-3">
                <label htmlFor="" className="input w-full rounded-md">
                  <CiMail />
                  <input type="email" className="grow" placeholder="Email" />
                </label>
                <label htmlFor="" className="input w-full rounded-md">
                  <IoKeyOutline />
                  <input type="password" className="grow" placeholder="Password" />
                </label>
              
                <label htmlFor="" className="input w-full rounded-md">
                  <IoKeyOutline />
                  <input
                    type="password"
                    className="grow"
                    placeholder="Confirm Password"
                  />
                </label>
                <button className="btn btn-warning bg-yellow-500 text-white">Create Acount</button>
              </form>
              <p > Already have an account? <span className="font-bold text-yellow-500"> Login</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

import React from 'react'
import { CiMail } from 'react-icons/ci'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { IoKeyOutline } from 'react-icons/io5'

const Login = () => {
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
                  <p className="text-3xl font-bold text-center">Welcome back!</p>
                  <p>
                  Enter your details to access your account and continue your journey of creating and collecting Cards.
                  </p>
                  <form action="" className="flex flex-col gap-3">
                    <label htmlFor="" className="input w-full rounded-md">
                      <CiMail />
                      <input type="email" className="grow" placeholder="Email" />
                    </label>
                    <label htmlFor="" className="input w-full rounded-md">
                      <IoKeyOutline/>
                      <input type="password" className="grow" placeholder="Password" />
                    </label>
                    <div className='w-full flex justify-end'>

                    <span>Forgot Your Password?</span>
                    </div>
                    <button className="btn btn-warning bg-yellow-500 text-white">Sign Up</button>
                  </form>
                  <p > Don’t you have an account? <span className="font-bold text-yellow-500">Sign Up</span></p>
                </div>
              </div>
            </div>
          </div>
        </>
  )
}

export default Login

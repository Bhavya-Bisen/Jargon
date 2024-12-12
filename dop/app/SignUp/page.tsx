"use client";
import { redirect } from "next/dist/server/api-utils";
import React from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    // Validation
    if (!username || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Registration successful!");
        router.push("/");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  return (
    <>
       <div className="flex h-screen items-center justify-center bg-[#fdf1e2]">
        <div className="w-[350px] rounded-lg border border-[#b0725c] bg-[#fdf6ed] p-6 shadow-lg">
          {/* Profile Icon */}
          <div className="-mt-10 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#b0725c] bg-[#fdf6ed]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#b0725c"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 19.5a8.25 8.25 0 0115 0"
                />
              </svg>
            </div>
          </div>

          {/* Sign Up Title */}
          <h1 className="mt-4 text-center text-xl font-semibold text-[#4b2b1f]">
            Sign Up
          </h1>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 text-center text-sm text-red-500">
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 text-center text-sm text-green-500">
              {successMessage}
            </div>
          )}

          {/* Username Field */}
          <div className="mt-6">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#b0725c"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 19.5a8.25 8.25 0 0115 0"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={username}
                className="w-full rounded-lg border border-[#b0725c] bg-[#fdf6ed] px-8 py-2 text-[#4b2b1f] placeholder-[#b0725c] focus:outline-none focus:ring-2 focus:ring-[#b0725c]"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </label>
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#b0725c"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 7.5l-9 6-9-6M3.75 8.25v9.75a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25V8.25"
                  />
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#b0725c] bg-[#fdf6ed] px-8 py-2 text-[#4b2b1f] placeholder-[#b0725c] focus:outline-none focus:ring-2 focus:ring-[#b0725c]"
                placeholder="Email"
              />
            </label>
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#b0725c"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5v-3a4.5 4.5 0 10-9 0v3M4.5 10.5h15M7.5 10.5v9h9v-9"
                  />
                </svg>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#b0725c] bg-[#fdf6ed] px-8 py-2 text-[#4b2b1f] placeholder-[#b0725c] focus:outline-none focus:ring-2 focus:ring-[#b0725c]"
                placeholder="Password"
              />
            </label>
          </div>

          {/* Sign Up Button */}
          <div className="mt-6">
            <button
            onClick={handleSignUp}
              className="w-full rounded-lg bg-[#b0725c] py-2 text-white hover:bg-[#8c5946]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

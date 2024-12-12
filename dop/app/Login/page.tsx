"use client";
import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setErrorMessage("");

        // You can store user information or tokens in localStorage or cookies if needed.
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to the dashboard or home page
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
      setSuccessMessage("");
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

          {/* Login Title */}
          <h1 className="mt-4 text-center text-xl font-semibold text-[#4b2b1f]">Login</h1>

          {/* Display Success or Error Messages */}
          {successMessage && (
            <div className="mt-4 text-center text-sm text-green-600">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 text-center text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
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
                  className="w-full rounded-lg border border-[#b0725c] bg-[#fdf6ed] px-8 py-2 text-[#4b2b1f] placeholder-[#b0725c] focus:outline-none focus:ring-2 focus:ring-[#b0725c]"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  className="w-full rounded-lg border border-[#b0725c] bg-[#fdf6ed] px-8 py-2 text-[#4b2b1f] placeholder-[#b0725c] focus:outline-none focus:ring-2 focus:ring-[#b0725c]"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            {/* Remember Me Checkbox */}
            <div className="mt-4 flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border border-[#b0725c] bg-[#fdf6ed] focus:ring-[#b0725c]"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-[#4b2b1f]"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-lg bg-[#b0725c] py-2 text-white hover:bg-[#8c5946]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

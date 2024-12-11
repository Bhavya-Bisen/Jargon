import React from "react";

export default function Login() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="">
          <form action="/register" method="POST">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

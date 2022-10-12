import React, { useState } from "react"

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">DABI Test | Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="Auth-links" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label className="form_input_labels">Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group mt-3">
              <label className="form_input_labels">Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" id="Auth-button" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-center mt-2">
              <a className="Auth-links" href="#">Forgot password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">DABI Test | Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="Auth-links" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Miguel"
            />
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">First Surname</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Bermea"
            />
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Second Surname</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Rodriguez"
            />
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" id="Auth-button" className="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

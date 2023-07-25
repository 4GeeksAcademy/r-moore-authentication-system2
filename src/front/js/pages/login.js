import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setLoginSuccess(false); // Reset the success message
  
    try {
      const response = await actions.login(email, password);
      console.log("Login Response:", response);
  
      if (response.status === "success" || response.success === true) {
        setLoginSuccess(true); // Show success message
        navigate("/private"); // Navigate to the private page on successful login
      } else {
        setError("Login Success"); // Show error message
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="loginCont">
      <form className="loginForm">
        <div className="loginFormContent">
          <h1>Login</h1>

          {loginSuccess && <div>Login Successful</div>}
          {error && <div className="error">{error}</div>}

          <div className="input-field">
            <input
              className="myInput"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              className="myInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="loginFormAction">
          <button className="formBtn regBtn" onClick={(e) => handleLogin(e)}>
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
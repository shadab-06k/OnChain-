import React, { useState } from "react";
import "./LoginPage.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const apiIp = process.env.REACT_APP_API_IP;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnLogin = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      // alert("Email field canot be blank");
      toast.error("Email field canot be blank.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    if (!formData.password) {
      // alert("Password field canot be blank");
      toast.error("Password field canot be blank", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    try {
      const res = await fetch(`${apiIp}/login`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log('email body ==== ',formData.email)
      console.log('passwords body == ',formData.password)


      if (!res.ok) {
        const text = await res.text();
        console.error("Server returned an error:", text);
        alert("Failed to login in. Please check your credentials.");
        return false;
      }

      const result = await res.json();
      console.log("Result for api in Login Page === ", result);
      // const authToken = sessionStorage.setItem("authToken");
      // console.log("Authenticatoon token for Login Page ===", authToken);

      setFormData({
        email: "",
        password: "",
      });
      navigate("/connect-wallet");
      return true;
    } catch (error) {
      console.log("Error for fetching ", error);
      return false;
    }
  };

  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const togglePass = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login-main-container">
      <ToastContainer />
      <div className="login-container">
        <h1 className="text-white my-4">Login</h1>

        <form className="d-flex flex-column" onSubmit={handleOnLogin}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label text-white">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleOnchange}
            />
          </div>
          <div className="mb-3 password-input-container ">
            <label
              for="exampleInputPassword1"
              className="form-label text-white"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={formData.password}
              onChange={handleOnchange}
            />
            <span onClick={togglePass}>
              {showPassword ? (
                <FaEye className="eye" />
              ) : (
                <FaEyeSlash className="eye" />
              )}
            </span>
          </div>

          <button type="submit" className="btn btn-primary my-4 butt">
            Login
          </button>
          <Link to="/signup" className="text-center signup-text">
            Create An Account? SignUp
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

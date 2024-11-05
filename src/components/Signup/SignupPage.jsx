import React, { useContext, useState } from "react";
import "./SignupPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { WalletContext } from "../WalletContext";
import { Bounce, toast, ToastContainer } from "react-toastify";

const SignupPage = () => {
  const navigate = useNavigate();
  const apiIp = process.env.REACT_APP_API_IP;
  const { walletAddress } = useContext(WalletContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    walletAddress: walletAddress,
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePass = () => {
    setShowPassword(!showPassword);
  };
  const handleOnSignUp = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      // alert("all file");
      toast.error("All fields are required.", {
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
      const res = await fetch(`${apiIp}/sign-up`, {
        method: `POST`,
        headers: {
          "Content-type": `application/json`,
        },

        body: JSON.stringify({
          FirstName: formData.firstName,
          LastName: formData.lastName,
          Email: formData.email,
          Password: formData.password,
          WalletAddress: formData.walletAddress,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Server returned an error:", text);
        alert("Failed to sign in. Please check your server.");
        return false;
      }
      const result = await res.json();
      // alert("User Signed in successfully");
      console.log("Result for Signup page ==>>>", result);
      console.log("User Signed in successfully");
      toast.success("User Signed in successfully", {
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

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        walletAddress: "",
      });

      navigate("/login");

      return true;
    } catch (error) {
      console.error("Failed to sign up:", error);
      toast.error("Unable To Sign up", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return false;
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="login-main-container">
      <ToastContainer />
      <div className="signup-container">
        <h1 className="text-white my-4">Signup</h1>

        <form className="d-flex flex-column" onSubmit={handleOnSignUp}>
          <div className="full-name-div">
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label text-white">
                First Name
              </label>
              <input
                type="name"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className=" mb-3">
              <label for="exampleInputEmail1" className="form-label text-white">
                Last Name
              </label>
              <input
                type="name"
                className="mx-2 form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label text-white">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              onChange={handleChange}
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
            Signup
          </button>
          <Link to="/login" className="text-center signup-text">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

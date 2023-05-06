import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import img from "../images/img5.png";
// import img2 from "../images/4.jpeg";
// import toast from "/react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
 
  const login = async () => {
    try {
      dispatch(ShowLoading())
      const response = await axios.post("/api/users/login", user);
      dispatch(HideLoading())
      if (response.data.success) {
        alert("User logged in successfully");
        // toast.success(response.data.message);
        localStorage.setItem("token",response.data.data);
        navigate("/");
       
      } else {
        // toast.error(response.data.message)
        alert(response.data.message);
      }
    } catch (error) {
      // toast.error('Something went wrong');
      dispatch(HideLoading())
      console.log(error);
    }
  };

  return (
    <>
    <div className="back flex flex-col h-0">
      <img
        className="img-login "
        // src="https://img.freepik.com/premium-photo/3d-rendering-3d-illustration-red-black-music-note-icon-isolated-white-background-song-melody-tune-symbol-concept_640106-443.jpg?w=2000"
        src={img}
        alt="" />
    </div>
    
    
    
    <div className="flex items-center min-h-screen justify-center ">
    <div className="back flex flex-col h-0 pb-48">
      <img
        className="img-login "
        // src="https://img.freepik.com/premium-photo/3d-rendering-3d-illustration-red-black-music-note-icon-isolated-white-background-song-melody-tune-symbol-concept_640106-443.jpg?w=2000"
        // src={img2}
        alt="" />
    </div>


        <div className="flex flex-col gap-5 w-98 p-24 ">
          <h1 className="text-3xl font-bold text-secondary ">Welcome Back!</h1>
          <hr />
          <input
            type="text"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })} />

          <button className="primary bg-primary" onClick={login}>
            Login
          </button>
          <Link to="/register" className="text-secondary underline ">Not Yet Registered?</Link>
        </div>


      </div>
      </>
  );
}

export default Login;

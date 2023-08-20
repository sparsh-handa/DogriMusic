import React, { Children, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.user);
  // const toggle_btn = document.querySelector("#checkbox");

  const[myStyle,setmyStyle] =useState({
    color : 'black',
        backgroundColor : 'white'

  })
  // const [btnText,setbtnText] = useState("Enable Dark Mode")

  const navigate = useNavigate();
  return (
    <div className="main" style={myStyle}>
      <div className="header flex justify-between shadow p-5 items-center">
        <h1
          className="text-3xl ml-7 font-bold cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <b className="text-primary">DOGRI </b>
          <b className="text-secondary"> MUSIC</b>
        </h1>

        {/* <div>
        
        toggle_btn.addEventListener('change',() => {
          if(toggle_btn.checked)
          {
            document.body.classList.add("dark-mode")
          }
        else{
          document.body.classList.remove("dark-mode")
          }
        }
        )
        

        </div>     */}

        

      



        <div className="flex items-center gap-2">
          {user.isAdmin &&
          !(window.location.href === "http://localhost:3000/admin") ? (
            <button
              className="text-white bg-orange-500 py-2 px-5"
              onClick={() => {
                navigate("/admin");
              }}
            >
              Add Song 
                 
            </button>
          ) : null}
{/* 
              <div className="container">
              
              </div> */}
              <i className="ri-sun-fill text-4xl" style={myStyle} onClick={toggleStyle}>
            
              </i>



          <h1 className="text-xl">{user?.name.toUpperCase()}</h1>
          <i
            className="ri-logout-circle-r-line text-xl cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          ></i>
        </div>
      </div>

      <div className="content m-10">{children}</div>
    </div>
  );
}

export default DefaultLayout;

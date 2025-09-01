import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {UserData} from "../context/User";
import { SongData } from "../context/Song";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const {registerUser, btnLoading} = UserData();

    const {getAllAlbums, getAllSongs} = SongData();
  

  const navigate = useNavigate()

  const submitHandler = (e) =>{
    e.preventDefault();

    registerUser(name, email, password, navigate, getAllAlbums, getAllSongs);
  }
  
  return (
    <div className="flex justify-center items-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Register to Melofy
        </h2>

        <form className="mt-8" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium  mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="auth-input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium  mb-1">
              Email or Username
            </label>
            <input
              type="email"
              placeholder="Email or Username"
              className="auth-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium  mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              required
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button disabled={btnLoading} className="auth-btn">{btnLoading?"Please Wait..." : "Register"}</button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-sm text-gray-400 hover:text-gray-300"
          >
             Have an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

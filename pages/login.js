import { useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const inputHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (form.password === "admin" && form.username === "admin") {
      await axios.post("/api/login", { token: "admin" });
      Router.push("/admin");
    } else {
      setMessage("Invalid Credentials");
    }
  };

  return (
    <div className="flex self-center justify-center min-w-full">
      <form
        className="mt-3 w-4/12 shadow-lg p-10 flex flex-col bg-gray-200 bg-opacity-60 rounded-md"
        onSubmit={submitHandler}
      >
        <h1 className="font-bold text-3xl">Login</h1>
        {message ? (
          <div className="flex justify-between p-2 mt-3 min-w-full bg-red-300 border-2 border-red-400 rounded">
            <p className="text-white">{message}</p>
            <button
              className="text-white outline-none"
              type="button"
              onClick={() => setMessage("")}
            >
              X
            </button>
          </div>
        ) : null}
        <div className="flex flex-col mt-3">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            className="mt-1 mb-2 p-2 outline-none border-2 rounded border-gray-400 focus:border-indigo-500"
            placeholder="Your username"
            onChange={inputHandler}
          />
        </div>
        <div className="flex flex-col mt-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="mt-1 mb-2 p-2 outline-none border-2 rounded border-gray-400 focus:border-indigo-500"
            placeholder="Your password"
            onChange={inputHandler}
          />
        </div>
        <div>
          <button
            className="bg-purple-400 w-full p-1 mt-3 text-white font-bold hover:bg-purple-500"
            type="submit"
          >
            <p className="tracking-wider leading-10">Login</p>
          </button>
        </div>
      </form>
    </div>
  );
}

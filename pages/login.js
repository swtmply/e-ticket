import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const inputHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post("/api/login", { token: "admin" });
  };

  // click niyo lang yung login tapos punta kayo localhost:3000/admin
  return (
  
    <div class="bg-white py-32 px-10 min-h-screen">
    <div class="flex flex-1 justify-center">
    <div class="bg-purple-300 rounded-lg sm:border-6 border-black px-4 lg:px-24 py-20 lg:max-w-xl sm:max-w-md w-full text-center">
      <h1 class="text-5xl font-normal leading-normal mt-0 mb-10 text-pink-800 text-center">Login</h1>
      <form onSubmit={submitHandler}>
        <div class="relative w-full mb-3">
          <label class="block uppercase text-purple-900 text-xl font-bold text-left mb-2">Username:</label>
          <input class="border-0 px-3 py-3 text-purple-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" onChange={inputHandler} />
        </div>
        <div class="relative w-full mb-3">
          <label class="block uppercase text-purple-900 text-xl font-bold text-left mb-2">Password:</label>
          <input class="border-0 px-3 py-3  text-purple-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" onChange={inputHandler} />
        </div>
        <div>
          <button type="submit"class="mt-8 block w-full rounded bg-purple-500 py-2 hover:bg-pink-300 focus:shadow-outline focus:outline-none text-white font-bold shadow"><p class="tracking-wider leading-10">Login</p></button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}

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
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" onChange={inputHandler} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={inputHandler} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

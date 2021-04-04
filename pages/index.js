import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyId: "",
    department: "",
    description: "",
  });
  const [image, setImage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState("request notif");

  const inputHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "frrc0gy6");

      setIsSubmitting(true);

      const { url } = await axios
        .post(
          "https://api.cloudinary.com/v1_1/allenwhun-cldnry/image/upload",
          formData
        )
        .then((res) => res.data);

      await axios
        .post("http://localhost:3000/api/request", {
          ...form,
          imageURL: url,
        })
        .then((res) => {
          if (res) setResponse("Request Sent! :>");
        });

      setIsSubmitting(false);
    } catch (error) {
      setResponse("Something went wrong! :<");
    }
  };

  // punta kayo sa localhost:3000/login pagtapos nito

  return (
    <div>
      <h1>Request Form</h1>

      {response ? (
        <div className="flex">
          <p>{response}</p>
          <button
            className="ml-3"
            type="button"
            onClick={() => setResponse("")}
          >
            X
          </button>
        </div>
      ) : null}

      <form onSubmit={submitHandler}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={inputHandler} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" name="email" onChange={inputHandler} />
        </div>
        <div>
          <label>Department:</label>
          <select name="department" onChange={inputHandler}>
            <option value="">---Select Department---</option>
            <option value="Marketing">Marketing</option>
            <option value="Advertising">Advertising</option>
            <option value="IT">IT</option>
          </select>
        </div>
        <div>
          <label>Company ID:</label>
          <input type="text" name="companyId" onChange={inputHandler} />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="imageURL"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            onChange={inputHandler}
          ></textarea>
        </div>

        <div>
          <button disabled={isSubmitting} type="submit">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}

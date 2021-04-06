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
  const [response, setResponse] = useState("");

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
        .post("http://localhost:3000/api/requests", {
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
    <div className="flex self-center justify-center min-w-full">
      <form
        className="mt-3 w-8/12 shadow-lg p-10 flex justify-between bg-gray-200 bg-opacity-60 rounded-md"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col w-5/12">
          <h3 className="text-3xl font-bold">Request Form</h3>

          {response ? (
            <div
              className={
                response === "Request Sent! :>"
                  ? "flex justify-between p-2 mt-3 min-w-full bg-green-400 border-2 border-green-500 rounded bg-opacity-70"
                  : "flex justify-between p-2 mt-3 min-w-full bg-red-300 border-2 border-red-400 rounded"
              }
            >
              <p className="text-white">{response}</p>
              <button
                className="text-white outline-none"
                type="button"
                onClick={() => setResponse("")}
              >
                X
              </button>
            </div>
          ) : null}
          <div className="flex flex-col mt-3">
            <label>Name:</label>
            <input
              className="mt-1 mb-2 p-2 outline-none border-2 rounded border-gray-400 focus:border-indigo-500"
              type="text"
              placeholder="Your name"
              name="name"
              onChange={inputHandler}
            />
          </div>
          <div className="flex flex-col">
            <label>Email:</label>
            <input
              className="mt-1 mb-2 p-2 outline-none border-2 rounded border-gray-400 focus:border-indigo-500"
              type="text"
              id="email"
              name="email"
              placeholder="Your email"
              onChange={inputHandler}
            />
          </div>
          <div className="flex flex-col">
            <label for="department">Department:</label>
            <select
              className="mt-1 mb-2 p-2 outline-none border-2 rounded border-gray-400 focus:border-indigo-500"
              onChange={inputHandler}
            >
              <option value="">---Select Department---</option>
              <option value="Marketing">Marketing</option>
              <option value="Advertising">Advertising</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Company ID:</label>
            <input
              type="text"
              className="mt-1 mb-2 p-2 outline-none border-2 rounded border-gray-400 focus:border-indigo-500"
              id="company"
              name="company"
              placeholder="Your Company ID (ex. IT123)"
              onChange={inputHandler}
            />
          </div>
        </div>

        <div className="flex flex-col w-6/12">
          <div className="mb-2">
            <label className="mr-2">Image:</label>
            <input
              type="file"
              name="imageURL"
              accept=".jpg, .png, .jpeg"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label>Description:</label>
            <textarea
              className="mt-1 mb-2 p-2 outline-none border-2 rounded border-gray-400 focus:border-indigo-500"
              name="description"
              cols="30"
              rows="9"
              placeholder="Your request or complain"
              onChange={inputHandler}
            ></textarea>
          </div>
          <div className="min-w-full">
            <button
              className="bg-purple-400 w-full p-2 text-white font-bold hover:bg-purple-500 disabled:opacity-50 disabled:cursor-default"
              type="button"
              disabled={!isSubmitting}
              type="submit"
            >
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

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
    <div class="bg-gradient-to-r from-pink-300 to-yellow-200 py-32 px-10 min-h-screen">
      <h3 class="text-5xl font-normal leading-normal mt-0 mb-2 text-pink-800 text-center">
          Request Form
      </h3>

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

      <form class="md:w-1/2 mx-auto" onSubmit={submitHandler}>
        <div class="shadow-xl">
          <div class="flex items-center bg-purple-400 rounded-t-lg border-b border-purple-500">
          <label for="name" class="w-16 text-right font-semibold mr-16">Name:</label>
          <input type="text" id="name" name="name" class="flex-1 p-4 pl-0 bg-transparent outline-none text-white ml-16" onChange={inputHandler} />
        </div>
        <div class="flex items-center bg-purple-400 rounded-none border-b border-purple-500">
          <label for="name" class="w-16 text-right font-semibold mr-16">Email:</label>
          <input type="text" id="email" name="email" class="flex-1 p-4 pl-0 bg-transparent outline-none text-white ml-16" onChange={inputHandler} />
        </div>
        <div class="flex items-center bg-purple-400 rounded-none border-b border-purple-500">
          <label for="department" class="w-16 text-right font-semibold ml-4 mr-16">Department:</label>
          <select class="form-select mt-1 block w-full h-12  bg-purple-400 rounded-none border-purple-500 ml-12 text-white"onChange={inputHandler}>
            <option value="">---Select Department---</option>
            <option value="Marketing">Marketing</option>
            <option value="Advertising">Advertising</option>
            <option value="IT">IT</option>
          </select>
        </div>
        <div class="flex items-center bg-purple-400 rounded-none border-b border-purple-500">
          <label for="company" class="w-16 text-right font-semibold ml-4 mr-16">Company ID:</label>
          <input type="text" id="company" name="company" class="flex-1 p-4 pl-0 bg-transparent outline-none text-white ml-12" onChange={inputHandler} />
        </div>
        <div class="flex items-center bg-purple-400 rounded-b-lg mb-10">
          <label for="name" class="w-20 text-right font-semibold mr-16">Image:</label>
          <input type="file" class="flex-1 p-4 pl-0 bg-blue ml-12"
            name="imageURL"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div class="flex items-center bg-purple-400 rounded-none border-b-lg border-purple-500">
              <label for="description" class="w-24 text-right font-semibold">
                        Description
              </label>
              <textarea class="ml-20 resize-none border rounded-md w-full bg-purple-400 text-white border-purple-500" 
                 name="description"
                 cols="30"
                 rows="9"
                 onChange={inputHandler}>
              </textarea>
          </div>
        <div>
          <button class="block w-full rounded bg-purple-500 py-3 hover:bg-pink-300 focus:shadow-outline focus:outline-none text-white font-bold shadow" type="button" disabled={isSubmitting} type="submit">
            Submit Request
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}

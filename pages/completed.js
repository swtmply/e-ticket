import axios from "axios";
import emailjs from "emailjs-com";
import Link from "next/link";

export default function Admin({ requests }) {
  const requestHandler = async (e, request) => {
    // update request
    const data = await axios
      .put(`/api/requests/${request._id}`, {
        ...request,
        completed: e,
      })
      .then((res) => res.data);

    // email notification
    if (data) {
      emailjs
        .send(
          "service_eomwvjp",
          "template_5gfbjp9",
          {
            name: request.name,
            description: request.description,
            email: request.email,
            id: request._id,
          },
          "user_r9SnkP1SzCSCO8yifxzz4"
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
            location.reload();
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
    }
  };

  return (
    <div className="self-center w-8/12 bg-gray-200 bg-opacity-60 p-5 rounded">
      <div>
        <h2 className="font-bold text-3xl mb-3">
          Completed Requests{" "}
          <Link href="/admin">
            <span className="text-indigo-500 font-normal text-sm mx-2 cursor-pointer">
              See Pending Requests
            </span>
          </Link>
        </h2>
        <table className="table-auto shadow-md w-full">
          <thead className="w-full border-2 border-indigo-200 ">
            <tr>
              <td className="font-bold text-xl p-2">Name</td>
              <td className="font-bold text-xl p-2">Department</td>
              <td className="font-bold text-xl p-2">Company ID</td>
              <td className="font-bold text-xl p-2">Ticket ID</td>
              <td className="font-bold text-xl p-2">Image</td>
              <td className="font-bold text-xl p-2">Completed</td>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, i) => {
              if (r.completed)
                return (
                  <tr
                    className="even:bg-gray-300 border-l-2 border-r-2 border-indigo-200"
                    key={i}
                  >
                    <td className="p-2">{r.name}</td>
                    <td className="p-2">{r.department}</td>
                    <td className="p-2">{r.companyId}</td>
                    <td className="p-2 font-bold">
                      <Link href={`/request/${r._id}`}>{r._id}</Link>
                    </td>
                    <td className="p-2 text-indigo-500 font-bold">
                      <a target="_blank" href={r.imageURL}>
                        Click here
                      </a>
                    </td>
                    <td className="p-2 flex justify-center">
                      <input
                        type="checkbox"
                        checked={r.completed}
                        className="p-2 checked:border-indigo-500"
                        onChange={(e) => requestHandler(e.target.checked, r)}
                      />
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  if (!req.cookies.token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = await axios
    .get("http://localhost:3000/api/requests")
    .then((res) => res.data);

  return {
    props: { requests: res }, // will be passed to the page component as props
  };
}

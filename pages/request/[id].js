import axios from "axios";

export default function Request({ request }) {
  return (
    <div className="h-3/6 flex self-center bg-gray-200 bg-opacity-60 rounded p-5">
      <div>
        <h1 className="font-bold text-3xl my-3">
          <span className="text-xl">Request ID:</span>
          <span className="text-indigo-500"> {request._id} </span>
          <span className="text-sm font-normal">
            {request.completed ? "finished" : "on process"}
          </span>
        </h1>
        <p className="my-3 text-xl font-medium">
          From: {request.name} ({request.companyId})
          <span className="text-sm font-normal">
            {" "}
            {request.department} Department
          </span>
        </p>
        <img
          className="h-2/5 rounded shadow-md"
          src={request.imageURL}
          alt="image request"
        />
        <p className="my-3 font-medium">Description:</p>
        <p>{request.description}</p>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const data = await axios
    .get(`http://localhost:3000/api/requests`)
    .then((res) => res.data);

  const paths = data.map((req) => ({ params: { id: req._id } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const request = await axios
    .get(`http://localhost:3000/api/requests/${params.id}`)
    .then((res) => res.data);

  return { props: { request } };
}

import axios from "axios";

export default function Admin({ requests }) {
  const requestHandler = async (e, request) => {
    const data = await axios
      .put(`/api/requests/${request._id}`, {
        ...request,
        completed: e,
      })
      .then((res) => res.data);

    // TODO: email notification
    // TODO: hot reload per update
  };

  return (
    // TODO: Table
    // pwede niyo bawasan yung data na ilalabas sa table kung trip niyo
    <div>
      {requests.map((r, i) => (
        <div key={i}>
          <p>Name: {r.name}</p>
          <p>Company ID: {r.companyId}</p>
          <p>Department: {r.department}</p>
          <p>Description: {r.description}</p>
          <p>Photo: </p>
          <img src={r.imageURL} alt="complaint picture" />
          <input
            type="checkbox"
            checked={r.completed}
            onChange={(e) => requestHandler(e.target.checked, r)}
          />
        </div>
      ))}
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

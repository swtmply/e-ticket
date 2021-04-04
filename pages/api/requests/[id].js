import connectDB from "../../../util/mongodb";
import Request from "../../../models/Request";

connectDB();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      const getRequests = await Request.findById(id);
      return res.status(200).json(getRequests);

    case "PUT":
      const requests = await Request.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json(requests);

    case "DELETE":
      const request = await Request.deleteOne({ _id: id });
      return res.status(200).json(request);

    default:
      return res.status(500).json({ message: "Bad connection" });
  }
};

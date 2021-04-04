import connectDB from "../../../util/mongodb";
import Request from "../../../models/Request";

connectDB();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const requests = await Request.find({});
      return res.status(200).json(requests);

    case "POST":
      const request = await Request.create(req.body);
      return res.status(200).json(request);

    default:
      return res.status(500).json({ message: "Bad connection" });
  }
};

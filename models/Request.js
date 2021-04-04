import { Schema, model, models } from "mongoose";

const requestSchema = new Schema(
  {
    name: String,
    email: String,
    companyId: String,
    department: String,
    completed: {
      type: Boolean,
      default: false,
    },
    description: String,
    imageURL: String,
  },
  { timestamps: true }
);

export default models.Request || model("Request", requestSchema);

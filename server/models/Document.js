import mongoose from "mongoose";
const documentSchema = mongoose.Schema(
  {
    documentName: {
      type: String,
      required: true,
    },
   
    documentURL: {
      type: String,
      required: true,
    },
    caseNumberRecord: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Document = mongoose.model("Document", documentSchema);
export default Document;

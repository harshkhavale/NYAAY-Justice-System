import mongoose from "mongoose";
const policeStationSchema = mongoose.Schema(
  {
    departmentId: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    policeStationName: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },

    passkey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const PoliceStation = mongoose.model("PoliceStation", policeStationSchema);
export default PoliceStation;

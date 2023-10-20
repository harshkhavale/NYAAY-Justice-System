import PoliceStation from "../models/PoliceStation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const policeAuth = async (req, res) => {
  try {
    const { departmentId, passkey, state, district, policeStationName } =
      req.body;

    // Check if a police station with the provided departmentId exists
    const existingStation = await PoliceStation.findOne({
      departmentId: departmentId,
    });

    if (!existingStation) {
      return res.status(400).json({ msg: "Police station does not exist." });
    }

    // Check if the provided state, district, and police station name match with the existing station
    if (
      existingStation.state !== state ||
      existingStation.district !== district ||
      existingStation.policeStationName !== policeStationName
    ) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(passkey, existingStation.passkey);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const token = jwt.sign({ id: existingStation._id }, process.env.JWT_SECRET);
    delete existingStation.password;

    res.status(200).json({ token, station: existingStation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const policeRegister = async (req, res) => {
  try {
    const { departmentId, passkey, state, district, policeStationName,pincode } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(passkey, salt);

    const newPoliceStation = new PoliceStation({
      departmentId,
      passkey: passwordHash,
      state,
      district,
      policeStationName,
      pincode
    });
    const savedPoliceStation = await newPoliceStation.save();
    res.status(201).json(savedPoliceStation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

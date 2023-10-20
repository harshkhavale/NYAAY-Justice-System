import Case from "../models/Case.js";
export const createCase = async (req, res) => {
  try {
    const {
      name,
      date,
      status,
      aadhar,
      contact,
      state,
      district,
      caseNumberRecord,
    } = req.body;
    const newCase = new Case({
      name,
      date,
      status,
      aadhar,
      contact,
      state,
      district,
      caseNumberRecord,
    });

    const createdcase = await newCase.save();
    res.status(201).json(createdcase);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCase = async (req, res) => {
  try {
    const { caseNumberRecord } = req.params; // Assuming you want to pass caseNumberRecord as a parameter
    const fetchCase = await Case.findOne({ caseNumberRecord }); // Use findOne to search for a specific caseNumberRecord
    if (fetchCase) {
      res.status(200).json(fetchCase);
    } else {
      res.status(404).json({ message: "Case not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message }); // You might want to use a different status code for server errors (e.g., 500)
  }
};

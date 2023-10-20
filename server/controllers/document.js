import Document from "../models/Document.js";
export const createDocument = async (req, res) => {
  try {
    const {
      documentName,

      documentURL,

      caseNumberRecord,
    } = req.body;
    const newDocument = new Document({
      documentName,

      documentURL,

      caseNumberRecord,
    });

    const createddocument = await newDocument.save();
    res.status(201).json(createddocument);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const { caseNumberRecord } = req.params; // Assuming you want to pass caseNumberRecord as a parameter
    const fetchDoc = await Document.find({ caseNumberRecord }); // Use findOne to search for a specific caseNumberRecord
    if (fetchDoc) {
      res.status(200).json(fetchDoc);
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message }); // You might want to use a different status code for server errors (e.g., 500)
  }
};

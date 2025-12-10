export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    return res.status(200).json({
      message: "File received successfully",
      fileName: req.file.originalname,
      size: req.file.size,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

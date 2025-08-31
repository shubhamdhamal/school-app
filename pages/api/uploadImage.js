import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./public/schoolImages";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export const config = {
  api: { bodyParser: false },
};

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        res.status(500).json({ error: err.message });
        return reject(err);
      }
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return reject("No file uploaded");
      }
      res.status(200).json({ image: `/schoolImages/${req.file.filename}` });
      resolve();
    });
  });
}

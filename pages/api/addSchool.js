import { connectDB } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, address, city, state, contact, image, email_id } = req.body;

    if (!name || !address || !city || !state || !email_id) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    try {
      const db = await connectDB();
      await db.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact || null, image || null, email_id]
      );
      res.status(200).json({ message: "School added successfully!" });
    } catch (err) {
      console.error("❌ MySQL Error:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

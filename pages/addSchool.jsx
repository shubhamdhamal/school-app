import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      let imagePath = "";
      if (data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const res = await axios.post("/api/uploadImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imagePath = res.data.image;
      }
      await axios.post("/api/addSchool", { ...data, image: imagePath });
      setMessage("✅ School added successfully!");
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="page">
      <header className="navbar">
        <h1>🏫 School Directory</h1>
        <nav>
          <a href="/addSchool">Add School</a>
          <a href="/showSchools">Show Schools</a>
        </nav>
      </header>

      <main className="form-container glass">
        <h2>Add a School</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="School Name" {...register("name", { required: "School name is required" })} />
          {errors.name && <span>{errors.name.message}</span>}

          <input placeholder="Address" {...register("address", { required: "Address is required" })} />
          {errors.address && <span>{errors.address.message}</span>}

          <input placeholder="City" {...register("city", { required: "City is required" })} />
          {errors.city && <span>{errors.city.message}</span>}

          <input placeholder="State" {...register("state", { required: "State is required" })} />
          {errors.state && <span>{errors.state.message}</span>}

          <input placeholder="Contact Number" {...register("contact", { pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" } })} />
          {errors.contact && <span>{errors.contact.message}</span>}

          <input type="email" placeholder="Email" {...register("email_id", { required: "Email required", pattern: { value: /^\S+@\S+$/i, message: "Enter valid email" } })} />
          {errors.email_id && <span>{errors.email_id.message}</span>}

          <input type="file" {...register("image")} />

          <button type="submit">Submit</button>
        </form>
        {message && <p className="msg">{message}</p>}
      </main>
    </div>
  );
}

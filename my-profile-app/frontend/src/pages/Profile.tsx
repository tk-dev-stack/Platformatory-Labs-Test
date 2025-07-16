import React from "react";
import { useState } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "Kanna",
    lastName: "User",
    phone: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form className="grid gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Save
        </button>
      </form>
    </div>
  );
}
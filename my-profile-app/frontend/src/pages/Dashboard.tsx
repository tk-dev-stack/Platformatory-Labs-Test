import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Phone, Mail, MapPin, Landmark } from "lucide-react";
import { auth } from "../auth";
import { getProfile, saveProfile } from "../utils/api";

export default function Dashboard() {
  
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const storedProfile = localStorage.getItem("profile");

  if (storedProfile) {
    formik.setValues(JSON.parse(storedProfile));
  } else if (storedUser) {
    const user = JSON.parse(storedUser);
    formik.setFieldValue("firstName", user.given_name || "");
    formik.setFieldValue("lastName", user.family_name || "");
    formik.setFieldValue("email", user.email || "");

    // Load from backend
    getProfile(user.email)
      .then((data: any) => formik.setValues(data))
      .catch((err) => console.error("Fetch failed", err));
  }
}, []);


  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      pincode: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
      city: Yup.string().required("City is required"),
      pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),
    }),
    onSubmit: async (values) => {
      localStorage.setItem("profile", JSON.stringify(values));
      try {
        await saveProfile(values);
        alert("Profile update in progress!");
      } catch (err) {
        alert("Failed to save profile");
        console.error(err);
      }
    },
  });

   

  const renderInput = (
    name: string,
    label: string,
    Icon: React.ElementType,
    type = "text"
  ) => (
    <div className="w-full">
      <label
        htmlFor={name}
        className="flex items-center gap-1.5 text-sm text-gray-700 mb-1"
      >
        <Icon className="w-4 h-4 text-gray-500" />
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name as keyof typeof formik.values]}
        placeholder={`Enter ${label}`}
        className={`w-full px-2 py-1.5 text-sm border ${
          formik.touched[name] && formik.errors[name]
            ? "border-red-500"
            : "border-gray-300"
        } rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none`}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-xs mt-0.5">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-3">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <User className="w-6 h-6 text-gray-700" />
            My Profile
          </div>
          <button
            onClick={() => auth.logout(() => navigate("/login"))}
            className="flex items-center gap-1.5 text-sm bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-md"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            {renderInput("firstName", "First Name", User)}
            {renderInput("lastName", "Last Name", User)}
          </div>
          {renderInput("email", "Email", Mail, "email")}
          {renderInput("phone", "Phone Number", Phone, "tel")}
          <div className="flex gap-3">
            {renderInput("city", "City", MapPin)}
            {renderInput("pincode", "Pincode", Landmark, "tel")}
          </div>

          <button
            type="submit"
            className="mt-3 w-full bg-gray-800 text-white py-2 rounded-md text-sm font-medium hover:bg-gray-900"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { postLostItem } from "../api-work/fetchinng";

function ReportLostItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    item: "",
    location: "",
    date: "",
    description: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // ✅ Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.item.trim()) newErrors.item = "Item name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const result = await postLostItem(formData);
      console.log("Submitted successfully:", result);

      setSubmitSuccess(true);
      setFormData({
        name: "",
        item: "",
        location: "",
        date: "",
        description: "",
        phone: "",
        email: "",
      });

      // Redirect after success
      setTimeout(() => navigate("/lost-items"), 2000);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setErrors({ submit: "Failed to submit form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      item: "",
      location: "",
      date: "",
      description: "",
      phone: "",
      email: "",
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-green-50 to-green-100 px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg border"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="text-red-700">Report</span>{" "}
            <span className="text-green-700">Lost Item</span>
          </h2>

          {submitSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              ✓ Item reported successfully! Redirecting...
            </div>
          )}

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-green-300"
              }`}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Item */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Item <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.item
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-green-300"
              }`}
              placeholder="e.g., Black Wallet, Silver Laptop"
            />
            {errors.item && (
              <p className="text-red-500 text-sm mt-1">{errors.item}</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.location
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-green-300"
              }`}
              placeholder="Where did you lose it?"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.date
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-green-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Item Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.description
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-green-300"
              }`}
              rows={3}
              placeholder="Provide a detailed description..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-green-300"
              }`}
              placeholder="e.g., +254 712 345 678"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block mb-1 font-semibold">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-green-300"
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="flex-1 border px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Reset
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/lost-items")}
              className="text-green-700 hover:underline"
            >
              ← Back to Lost Items
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ReportLostItem;

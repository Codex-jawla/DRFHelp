import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router";

const AddCollage = () => {
  const [formData, setFormData] = useState({
    cname: "",
    cwebsite: "",
    cAddress: "",
    cAffiliation: "",
    cabout: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://mystudent-lcac.onrender.com/api/2211/collage/", formData);
      setResponseMessage("Collage details submitted successfully!");
      setFormData({
        cname: "",
        cwebsite: "",
        cAddress: "",
        cAffiliation: "",
        cabout: "",
      });
    } catch (error) {
      setResponseMessage("Failed to submit collage details. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Add Collage Details
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Collage Name */}
          <div className="mb-4">
            <label htmlFor="cname" className="block text-gray-700 font-medium mb-2">
              Collage Name
            </label>
            <input
              type="text"
              id="cname"
              name="cname"
              value={formData.cname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter collage name"
              required
            />
          </div>

          {/* Web URL */}
          <div className="mb-4">
            <label htmlFor="cwebsite" className="block text-gray-700 font-medium mb-2">
              Web URL
            </label>
            <input
              type="text"
              id="cwebsite"
              name="cwebsite"
              value={formData.cwebsite}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter web URL"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="cAddress" className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              id="cAddress"
              name="cAddress"
              value={formData.cAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter address"
              required
            />
          </div>

          {/* Affiliation */}
          <div className="mb-4">
            <label htmlFor="cAffiliation" className="block text-gray-700 font-medium mb-2">
              Affiliated University
            </label>
            <input
              type="text"
              id="cAffiliation"
              name="cAffiliation"
              value={formData.cAffiliation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter affiliated university"
              required
            />
          </div>

          {/* About */}
          <div className="mb-6">
            <label htmlFor="cabout" className="block text-gray-700 font-medium mb-2">
              About
            </label>
            <textarea
              id="cabout"
              name="cabout"
              value={formData.cabout}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter information about the collage"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md text-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Submit Details
          </button>
        </form>

        {/* Response Message */}
        {responseMessage && (
          <p className="text-center text-lg font-medium mt-4 text-gray-600">
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddCollage;

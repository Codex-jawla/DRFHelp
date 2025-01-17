import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roll_no: "",
    sName: "",
    sEmail: "",
    sAddress: "",
    sCourse: "",
    shighestqualification: "",
    collage: "",
  });

  const [collages, setCollages] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  const isEdit = location.state?.isEdit || false; // Check if editing
  const studentData = location.state?.student || {}; // Get existing student data if editing

  // Fetch colleges for the dropdown
  const fetchCollages = async () => {
    try {
      const response = await axios.get("https://mystudent-lcac.onrender.com/api/2211/collage/");
      setCollages(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error.message);
    }
  };

  useEffect(() => {
    fetchCollages();
    if (isEdit) {
      // Populate the form with existing student data when editing
      setFormData({
        roll_no: studentData.roll_no || "",
        sName: studentData.sName || "",
        sEmail: studentData.sEmail || "",
        sAddress: studentData.sAddress || "",
        sCourse: studentData.sCourse || "",
        shighestqualification: studentData.shighestqualification || "",
        collage: studentData.collage ? studentData.collage.split("/").slice(-2, -1)[0] : "",
      });
    }
  }, []);

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

    const formattedData = {
      ...formData,
      collage: `https://mystudent-lcac.onrender.com/api/2211/collage/${formData.collage}/`,
    };

    try {
      if (isEdit) {
        // Update student
        await axios.put(
          `https://mystudent-lcac.onrender.com/api/2211/student/${studentData.student_id}/`,
          formattedData
        );
        setResponseMessage("Student updated successfully!");
      } else {
        // Add new student
        await axios.post("https://mystudent-lcac.onrender.com/api/2211/student/", formattedData);
        setResponseMessage("Student added successfully!");
      }
      navigate(-1); // Go back to the student list page
    } catch (error) {
      console.error("Error submitting the form:", error.response?.data || error.message);
      setResponseMessage("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
          {isEdit ? "Update Student Details" : "Add Student Details"}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="sName" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="sName"
              name="sName"
              value={formData.sName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter student's name"
              required
            />
          </div>

          {/* Roll no. */}
          <div className="mb-4">
            <label htmlFor="roll_no" className="block text-gray-700 font-medium mb-2">
              Roll no.
            </label>
            <input
              type="text"
              id="roll_no"
              name="roll_no"
              value={formData.roll_no}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter student's roll no."
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="sEmail" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="sEmail"
              name="sEmail"
              value={formData.sEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter student's email"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="sAddress" className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              id="sAddress"
              name="sAddress"
              value={formData.sAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter student's address"
              required
            />
          </div>

          {/* Course */}
          <div className="mb-4">
            <label htmlFor="sCourse" className="block text-gray-700 font-medium mb-2">
              Course
            </label>
            <input
              type="text"
              id="sCourse"
              name="sCourse"
              value={formData.sCourse}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter student's course"
              required
            />
          </div>

          {/* Highest Qualification */}
          <div className="mb-4">
            <label htmlFor="shighestqualification" className="block text-gray-700 font-medium mb-2">
              Highest Qualification
            </label>
            <select
              id="shighestqualification"
              name="shighestqualification"
              value={formData.shighestqualification}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            >
              <option value="">Select Recent Qualification</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Diploma">Diploma</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
            </select>
          </div>

          {/* College */}
          <div className="mb-6">
            <label htmlFor="collage" className="block text-gray-700 font-medium mb-2">
              College
            </label>
            <select
              id="collage"
              name="collage"
              value={formData.collage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            >
              <option value="">Select College</option>
              {collages.map((collage) => (
                <option key={collage.collage_id} value={collage.collage_id}>
                  {collage.cname}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md text-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            {isEdit ? "Update Student" : "Add Student"}
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

export default AddStudent;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const StudentList = () => {
  const { id } = useParams(); // College ID
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://mystudent-lcac.onrender.com/api/2211/collage/${id}/student`
      );
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`https://mystudent-lcac.onrender.com/api/2211/student/${studentId}`);
      fetchData(); // Refresh the list after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = (student) => {
    // Navigate to Add Student page with student details as state
    navigate(`/addstudent`, { state: { student,isEdit:true, collegeId: id } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h3 className="text-xl text-blue-500">Loading...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h3 className="text-xl text-red-500">{`Error fetching data: ${error}`}</h3>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h3 className="text-xl text-gray-500">No students found</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-center text-3xl font-bold text-gray-700 mb-8">
        Student List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-md p-5 transition transform hover:scale-105"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">{student.sName}</h2>
              <p className="text-sm text-gray-500">{student.roll_no}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                <span className="text-gray-700">{student.sEmail}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Address:</span>{" "}
                <span className="text-gray-700">{student.sAddress}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Highest Qualification:</span>{" "}
                <span className="text-gray-700">{student.shighestqualification}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">About:</span>{" "}
                <span className="text-gray-700">{student.sCourse}</span>
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="text-red-500 bg-transparent"
                  onClick={() => handleDelete(student.id)}
                >
                  Remove
                </button>
                <button
                  className="text-blue-500 bg-transparent"
                  onClick={() => handleUpdate(student)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;

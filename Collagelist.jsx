import React, { useState, useEffect } from "react";
import { Link } from "react-router"; // Changed to `react-router-dom` for compatibility
import axios from "axios";

const Collagelist = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://mystudent-lcac.onrender.com/api/2211/collage/");
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleremove= async(college_id)=>{
    try {
      await axios.delete(`https://mystudent-lcac.onrender.com/api/2211/collage/${college_id}`);
      fetchData()
    } catch (error) {
      setError(error.message);
    }
  }

  const getAbout = (body) => {
    return body.length > 150 ? `${body.slice(0, 150)}...` : body;
  };

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
        <h3 className="text-xl text-gray-500">No colleges found</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-center text-3xl font-bold text-gray-700 mb-8">
        College List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((college, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105"
          >
            <img
              src="https://content.jdmagicbox.com/v2/comp/delhi/v4/011pxx11.xx11.001023353037.h8v4/catalogue/maharaja-agrasen-institute-of-technology-rohini-sector-22-delhi-colleges-3u3lj99.jpg"
              alt="College"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {college.cname}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{college.cAddress}</p>
              <p className="text-sm text-gray-500 mb-2">
                Affiliation: {college.cAffiliation}
              </p>
              <p className="text-sm text-gray-600">
                {getAbout(college.cabout)}{" "}
                <a
                  href={college.cwebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </a>
              </p>
              <div className="mt-4 flex justify-around">
                <Link
                  to={`/${college.collage_id}/students`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition"
                >
                  Show Students Details
                </Link>
                <button className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition" onClick={()=>handleremove(college.collage_id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collagelist;

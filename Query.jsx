import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Query = () => {
    const [data, setData] = useState([]); // Initialize data as an empty array
    const [services, setServices] = useState({}); // Map of service URLs to names
  
    // Fetch all form data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/form/");
        setData(response.data);
      } catch (e) {
        console.error("Error fetching form data:", e);
      }
    };
  
    // Fetch all services and map URLs to names
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/service/");
        const serviceMap = response.data.reduce((map, service) => {
          map[service.url] = service.service; // Assuming `url` is the key and `service` is the name
          return map;
        }, {});
        setServices(serviceMap);
      } catch (e) {
        console.error("Error fetching services:", e);
      }
    };
  
    // Handle delete operation
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/form/${id}`);
        setData((prevData) => prevData.filter((item) => item.form_id !== id));
      } catch (e) {
        console.error("Error deleting data:", e);
      }
    };
  
    useEffect(() => {
      fetchData();
      fetchServices();
    }, []);
  
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            User Appointment Data
          </h2>
  
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No data available.</p>
          ) : (
            data.map((item) => (
              <div
                key={item.form_id}
                className="bg-white p-6 rounded-lg shadow-md mb-6 transition-all hover:shadow-lg"
              >
                {/* Get the service name from the services map */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {services[item.service] || "Loading..."}
                </h3>
                <p className="text-gray-700">Name: {`${item.fname} ${item.lname}`}</p>
                <p className="text-gray-700">Contact: {item.contact}</p>
                <p className="text-gray-700">Email: {item.email}</p>
                <p className="text-gray-700">
                  Appointment Type: {item.appointment_type}
                </p>
                <p className="text-gray-700">
                  Appointment Date: {item.a_date}
                </p>
                <button
                  onClick={() => handleDelete(item.form_id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
}

export default Query
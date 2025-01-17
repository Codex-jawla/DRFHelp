import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Recent from "./Recent";

const Panel = () => {
  const [data, setData] = useState([]);
  const [services, setServices] = useState({});
  const [serviceCounts, setServiceCounts] = useState({});

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

  // Count the number of forms for each service
  const calculateServiceCounts = (formData) => {
    const counts = formData.reduce((acc, form) => {
      acc[form.service] = (acc[form.service] || 0) + 1;
      return acc;
    }, {});
    setServiceCounts(counts);
  };

  useEffect(() => {
    fetchData();
    fetchServices();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      calculateServiceCounts(data);
    }
  }, [data]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Appointment Data
        </h2>

        {Object.keys(serviceCounts).length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Service Counts:
            </h3>
            <div className="grid grid-cols-3 gap-6 mt-4">
              {Object.entries(serviceCounts).map(([serviceUrl, count]) => (
                <div
                  key={serviceUrl}
                  className="text-black bg-green-300 p-4 flex justify-between items-center rounded-lg"
                >
                  <h2>{services[serviceUrl] || serviceUrl}</h2>
                  <h2>{count}</h2>
                </div>
              ))}
            </div>
          </div>
        )}
        <Recent />
      </div>
    </div>
  );
};

export default Panel;

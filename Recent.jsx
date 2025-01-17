import React, {useState,useEffect } from "react";
import axios from "axios";

const Recent = () => {
  const [data, setData] = useState([]);
  const [services, setServices] = useState({});

  // Fetch all form data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/form/");
      const sortedData = response.data.sort((a, b) => new Date(b.addtime) - new Date(a.addtime));
      setData(sortedData);
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
  useEffect(() => {
    fetchData();
    fetchServices();
  }, []);
  return (
    <div>
      {data.length === 0 ? (
            <p className="text-center text-gray-500">No data available.</p>
          ) : (
            data.map((item) => (
              <div
                key={item.form_id}
                className="bg-white p-4 rounded-lg shadow-md mb-6 flex transition-all p-5  hover:shadow-lg"
              >
                {/* Get the service name from the services map */}
                <h3 className="text-xl font-semibold text-gray-800 p-2">
                  {services[item.service] || "Loading..."}
                </h3>
                <p className="text-gray-700 p-2"> {`${item.fname} ${item.lname}`}</p>
                <p className="text-gray-700 p-2"> {item.contact}</p>
                <p className="text-gray-700 p-2"> {item.email}</p>
                <p className="text-gray-700 p-2">
                  {item.appointment_type}
                </p>
                <p className="text-gray-700 p-2">
                 {item.a_date}
                </p>
              </div>
            ))
          )}
    </div>
  )
}

export default Recent
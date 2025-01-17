import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [sdata, setSdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/service/")
      .then((response) => {
        setSdata(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [formData, setFormData] = useState({
    service: "",
    fname: "",
    lname: "",
    contact: "",
    email: "",
    message: "",
    appointment_type: "",
    a_date: "",
    a_time: "",
    place_birth: "",
    date_birth: "",
    time_birth: "",
    referal: "",
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
    const formattedData = {
      ...formData,
      service: `http://127.0.0.1:8000/api/service/${formData.service}/`,
    };
    console.log(formattedData.service);
    console.log(formattedData);
    e.preventDefault();
    try {
      // Simulate API call
      await axios.post("http://127.0.0.1:8000/api/form/", formattedData);
      console.log("Form Data Submitted: ", formData);
      setResponseMessage("Form details submitted successfully!");
      setFormData({
        service: "",
        fname: "",
        lname: "",
        contact: "",
        email: "",
        message: "",
        appointment_type: "",
        a_date: "",
        a_time: "",
        place_birth: "",
        date_birth: "",
        time_birth: "",
        referal: "",
        specify: "",
      });
    } catch (error) {
      setResponseMessage("Failed to submit form details. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Book Appointment</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit} // Corrected onSubmit handler
      >
        <div className="col-span-2">
          <select
            name="service"
            className="w-full p-2 border rounded-md"
            value={formData.service} // This holds the service ID
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Please select
            </option>
            {sdata.map((data) => (
              <option key={data.service_id} value={data.service_id}>
                {data.service}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          className="w-full p-2 border rounded-md"
          value={formData.fname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lname"
          placeholder="Last Name"
          className="w-full p-2 border rounded-md"
          value={formData.lname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Your Contact Number"
          className="w-full p-2 border rounded-md"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded-md"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <select
          name="appointment_type"
          className="w-full p-2 border rounded-md"
          value={formData.appointment_type}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Please select
          </option>
          <option value="online appointment">Online Appointment</option>
          <option value="offline appointment">Offline Appointment</option>
        </select>
        <input
          type="date"
          name="a_date"
          className="w-full p-2 border rounded-md"
          value={formData.a_date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="a_time"
          className="w-full p-2 border rounded-md"
          value={formData.a_time}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          className="col-span-2 w-full p-2 border rounded-md"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <div className="col-span-2 font-semibold text-gray-700">
          Provide Birth Details Below
        </div>
        <input
          type="text"
          name="place_birth"
          placeholder="Place of Birth"
          className="w-full p-2 border rounded-md"
          value={formData.place_birth}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date_birth"
          className="w-full p-2 border rounded-md"
          value={formData.date_birth}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time_birth"
          className="w-full p-2 border rounded-md"
          value={formData.time_birth}
          onChange={handleChange}
          required
        />
        <select
          name="referal"
          className="w-full p-2 border rounded-md col-span-1"
          value={formData.referal}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            How did you hear about us?
          </option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="Google">Google</option>
          <option value="Friend">Friend</option>
          <option value="other">Other (Please Specify)</option>
        </select>
        {formData.referal === "other" && (
          <input
            type="text"
            name="specify"
            placeholder="Please Specify"
            className="w-full p-2 border rounded-md col-span-1"
            value={formData.othervalue}
            onChange={handleChange}
            required
          />
        )}
        <button
          type="submit"
          className="col-span-2 w-full p-2 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600"
        >
          Book Appointment
        </button>
      </form>
      {responseMessage && (
        <p className="text-center mt-4 text-green-600">{responseMessage}</p>
      )}
    </div>
  );
};

export default Form;

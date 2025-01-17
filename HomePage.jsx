import React from "react";
import Navbar from "./Navbar";
import Collagelist from "./Collagelist";
import { Route, Routes } from "react-router";
import AddStudent from "./AddStudent";
import AddCollage from "./AddCollage";
import StudentList from "./StudentList";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<Collagelist/>}/>
      <Route path="/addstudent" element={<AddStudent/>}/>
      <Route path="/addcollage" element={<AddCollage/>}/>
      <Route path="/:id/students" element={<StudentList/>}/>
      </Routes>
    </div>
  );
};

export default HomePage;

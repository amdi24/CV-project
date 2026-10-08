import React from "react";
import DoctorCard from "./DoctorCard";
const DoctorList = React.memo(
    function DoctorList({doctors,}) {
    return (
        <div className="doctor-grid">
         {doctors.map( (doctor) => (
           <DoctorCard
                key={doctor.id}
                doctor={doctor}
              /> ))}
              </div>
      );
    }
  );


export default DoctorList;
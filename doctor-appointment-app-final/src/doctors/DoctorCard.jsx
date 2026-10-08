import { Link } from "react-router-dom";
import Card from "../ui/Card";
export default function DoctorCard({doctor,}) {

  return (
    <Card>
      <div className="avatar">{doctor.name.charAt(3)}</div>
      <p className="eyebrow">{doctor.department}</p>
      <h2>{doctor.name}</h2>
      <p> {doctor.specialization}</p>
      <p> {doctor.experience} {" "} years of experience</p>
      <Link className="button" to={`/doctors/${doctor.id}`}>View details</Link>
 </Card>
  );
}
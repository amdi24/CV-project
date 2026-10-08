import {Link,useParams,} from "react-router-dom";
import { useFetch }from "../hooks/useFetch";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import EmptyState from "../ui/EmptyState";
import Card from "../ui/Card";
export default function DoctorDetail() {
const { id } = useParams();
const {data,loading,error,} = useFetch("/doctors.json");
const doctor =data?.find((doctor) =>doctor.id === id);
if (loading) {

  return (
      <Loading message="Loading doctor details..."/> );
  }
if (error) {
  return (
      <ErrorMessage message={error}/>);
  }
if (!doctor) {
  return (
    <EmptyState title="Doctor not found"
        message="The doctor ID does not match the current data."/>);}
return (
    <section className="detail-layout">

<Card>
  <div className="avatar large">
          {doctor.name.charAt(3)}
          </div>
          <p className="eyebrow">{doctor.department}</p>
          <h1>{doctor.name}</h1>
          <p className="lead">{doctor.specialization}</p>
          <p><strong>Experience:</strong>{" "}{doctor.experience}{" "}years</p>
          <p><strong>Location:</strong>{" "}{doctor.location}</p>
          <p><strong>Available:</strong>{" "}{doctor.availableDays.join(", ")}</p>
          <p>{doctor.bio}</p>
          <Link className="button" to={`/booking/${doctor.id}`}>Book appointment</Link>
          </Card>

    </section>
  );
}
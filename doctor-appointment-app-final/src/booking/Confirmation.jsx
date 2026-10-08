import {Link,useLocation,} from "react-router-dom";
import Card from "../ui/Card";
export default function Confirmation() {
  const location = useLocation();
  const appointment =location.state?.appointment;
  if (!appointment) {
    return (
      <Card>
        <h1>No booking data  </h1>               
        <p> Complete the booking form first.</p>                 
        <Link className="button" to="/doctors">Find a doctor </Link>                                             
      </Card>
    );
  }
  return (
    <section className="confirmation">
      <Card>
        <p className="eyebrow">Confirmed </p>
        <h1> Appointment booked  </h1>               
        <p>Your appointment has been added to your appointment history.</p>        
        <div className="summary">
          <p>
            <strong>
              Doctor:
            </strong>{" "}
            {appointment.doctorName}
          </p>

          <p>
            <strong>
              Department:
            </strong>{" "}
            {appointment.department}
          </p>

          <p>
            <strong>
              Date:
            </strong>{" "}
            {appointment.date}
          </p>

          <p>
            <strong>
              Time:
            </strong>{" "}
            {appointment.time}
          </p>
          <p>
            <strong>
              Patient:
            </strong>{" "}
            {appointment.patientName}
          </p>
        </div>
        <div className="button-row">
          <Link className="button" to="/appointments">  View appointments </Link>
          <Link className="button secondary" to="/doctors"> Find another doctor </Link>                                                     
        </div>
      </Card>
    </section>
  );
}
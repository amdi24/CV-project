
import { Link } from "react-router-dom";
import { useAppointmentStore } from "./appointmentStore";
import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

export default function AppointmentHistory() {
  const appointments = useAppointmentStore(
    (state) => state.appointments
  );

  const removeAppointment = useAppointmentStore(
    (state) => state.removeAppointment
  );

  const clearAppointments = useAppointmentStore(
    (state) => state.clearAppointments
  );

  function handleClearAppointments() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel all appointments?"
    );

    if (confirmed) {
      clearAppointments();
    }
  }

  if (appointments.length === 0) {
    return (
      <EmptyState
        title="No appointments yet"
        message="Book a doctor first"
      />
    );
  }

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your appointments</p>
          <h1>Appointment history</h1>
        </div>

        <div>
          <Link className="button" to="/doctors">
            Book another
          </Link>

          <button
            className="button secondary"
            onClick={handleClearAppointments}
          >
            Cancel all
          </button>
        </div>
      </div>

      <div className="appointment-list">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <div className="appointment-row">
              <div>
                <p className="eyebrow">{appointment.department}</p>

                <h2>{appointment.doctorName}</h2>

                <p>
                  {appointment.date} at {appointment.time}
                </p>

                <p>Patient: {appointment.patientName}</p>

                <p>Phone: {appointment.phone}</p>
              </div>

              <button
                className="button secondary"
                onClick={() =>
                  removeAppointment(appointment.id)
                }
              >
                Cancel
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}


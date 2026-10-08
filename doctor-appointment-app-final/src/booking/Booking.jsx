
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../ui/Card";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import NotFound from "../ui/NotFound";
import { useFetch } from "../hooks/useFetch";
import { useAppointmentStore } from "../appointments/appointmentStore";
import { useAuth } from "../auth/AuthContext";

export default function Booking() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const addAppointment = useAppointmentStore(
    (state) => state.addAppointment
  );

  const { user } = useAuth();

  const { data, loading, error } = useFetch("/doctors.json");

  const [form, setForm] = useState({
    patientName: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const doctor = useMemo(() => {
    if (!data) return null;

    return data.find((item) => item.id === doctorId);
  }, [data, doctorId]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;

  if (!doctor) {
    return <NotFound message="Doctor not found." />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function validate(formData) {
    const nextErrors = {};

    if (!formData.patientName.trim()) {
      nextErrors.patientName = "Please enter your name.";
    }

    if (!formData.date) {
      nextErrors.date = "Please choose an appointment date.";
    }

    if (!formData.time) {
      nextErrors.time = "Please choose an appointment time.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    const validationErrors = validate(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    const appointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.department,
      date: form.date,
      time: form.time,
      patientName: form.patientName.trim(),
      phone: user.phone,
    };

    addAppointment(appointment);

    navigate("/confirmation", {
      state: { appointment },
    });

    setSubmitting(false);
  }

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Book appointment</p>
          <h1>{doctor.name}</h1>
          <p>{doctor.department}</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientName">Patient name</label>

            <input
              id="patientName"
              name="patientName"
              type="text"
              value={form.patientName}
              onChange={handleChange}
            />

            {errors.patientName && (
              <p className="error">{errors.patientName}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Appointment date</label>

            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />

            {errors.date && (
              <p className="error">{errors.date}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="time">Appointment time</label>

            <input
              id="time"
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
            />

            {errors.time && (
              <p className="error">{errors.time}</p>
            )}
          </div>

          <button
            className="button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Booking..." : "Book appointment"}
          </button>
        </form>
      </Card>
    </section>
  );
}

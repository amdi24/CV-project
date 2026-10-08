import {useState,} from "react";
import {useLocation,useNavigate,} from "react-router-dom";
import Card from "./ui/Card";
import {useAuth,} from "./auth/AuthContext";
export default function Login() {
  const {login,} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/doctors";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Enter your name.");
      return;
    }
   if (!/^(?:\+251|0)9\d{8}$/.test(phone.trim())) {
  setError("Enter a valid phone number.");
  return;
}
    login(phone,name);
    navigate(from,
      {replace: true,}
    );
  }

  return (
    <main className="container page">
      <section className="form-layout">
        <Card>
          <p className="eyebrow"> CampusCare </p>
          <h1>  Sign in </h1>
          <p> Sign in before booking an appointment.</p>
          <form  onSubmit={handleSubmit}   noValidate >
          <label>Name
          <input value={name} onChange={(event) => setName(event.target.value)}/>
          </label>
          <label> Phone
          <input value={phone} onChange={(event) =>setPhone(event.target.value)}/>
          </label>{error && (
          <p className="field-error"> {error}</p>)}
          <button className="button" type="submit">Sign in </button>
          </form>
        </Card>
      </section>
    </main>
  );
}
import {NavLink,Outlet,} from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
export default function Layout() {
  const {user,logout,} = useAuth();
  return (
    <div className="app-shell">
      <header>
        <div className="container nav">
          <NavLink to="/" className="brand">CampusCare</NavLink>
          <nav>
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/doctors">Doctors</NavLink>
            {user && (<NavLink to="/appointments">Appointments</NavLink>)}
            </nav>
            <div>
              {user ? (
              <><span>Hi, {user.name}</span>{" "}
              <button className="button secondary" onClick={logout}>  Sign out   </button>
                  </>   ) : (  
              <NavLink   className="button" to="/login"> Sign in </NavLink> )}
          </div>
        </div>
      </header>
      <main className="container page">
        <Outlet />
      </main>
      <footer className="footeralline">
         <p>© 2026 Student Clinic. All rights reserved.</p>
         <p>CampusCare | Student Healthcare</p>
      </footer>

    </div>
  );
}
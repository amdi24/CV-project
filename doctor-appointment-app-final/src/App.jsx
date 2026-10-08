import {lazy,Suspense,} from "react";
import {Navigate,Route,Routes,} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Login from "./Login";
import Doctors from "./doctors/Doctors";
import DoctorDetail from "./doctors/DoctorDetail";
import Booking from "./booking/Booking";
import Confirmation from "./booking/Confirmation";
import RequireAuth from "./auth/RequireAuth";
import Loading from "./ui/Loading";
import NotFound from "./ui/NotFound";
import ErrorBoundary from "./ui/ErrorBoundary";
const AppointmentHistory = lazy(() =>
    import("./appointments/AppointmentHistory"));
export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="doctors" element={<Doctors />}/>
        <Route path="doctors/:id" element={<DoctorDetail />}/>
        <Route path="booking/:doctorId" element={<RequireAuth><Booking /></RequireAuth>}/>
        <Route path="confirmation" element={<Confirmation />}/>
        <Route path="appointments" element={<RequireAuth> <Suspense fallback={<Loading  message="Loading appointments..."  /> }>          
                  <AppointmentHistory />
                </Suspense>
              </RequireAuth>}/>
        <Route path="*" element={<NotFound />}/>
        </Route>
        <Route path="/login" element={<Login />}/>
        </Routes>
        </ErrorBoundary>
  );
}
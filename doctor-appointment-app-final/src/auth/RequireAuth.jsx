import {Navigate,useLocation,} from "react-router-dom";
import { useAuth } from "./AuthContext";
export default function RequireAuth({children,}) {
const {user,loading,} = useAuth();
const location =useLocation();
if (loading) {
    return (
      <p>Checking </p>
    );
  }
if (!user) {
 return (
      <Navigate to="/login" state={{from: location,}}replace/>);}

      return children;
}
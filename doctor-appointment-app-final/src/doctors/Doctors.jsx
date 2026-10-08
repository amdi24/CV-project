import {useMemo,useState,} from "react";
import { useFetch } from "../hooks/useFetch";
import DepartmentFilter from "./DepartmentFilter";
import DoctorList from "./DoctorList";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import EmptyState from "../ui/EmptyState";
export default function Doctors() {

const [department,setDepartment,] = useState("All");
const {data: doctors,loading,error,} = useFetch("/doctors.json" );
const departments = useMemo(() => {const values = (doctors || []).map( (doctor) => doctor.department);
 
    return [ "All", ...new Set(values), ];}, [doctors] );
 const shownDoctors =useMemo( () => {
 return (  doctors || [] ).filter(  (doctor) => department === "All" || doctor.department === department);},
      [doctors,department,]);
if (loading) 
    { return (<Loading  message="Loading doctors..."/>);
  }
if (error)
     { return ( <ErrorMessage message={error} />);
  }

 return (
    <section>
    <div className="section-heading">
      <div>
       <p className="eyebrow">Find care</p>
       <h1>Doctors</h1>
         </div> 
         </div>

    <DepartmentFilter
        departments={departments}
        value={department}
        onChange={setDepartment}
      />
    {shownDoctors.length === 0 ? (
    <EmptyState
          title="No doctors found"
          message="There are no doctors in this department."
        />) : (
        <DoctorList
          doctors={shownDoctors}
        /> )}
        </section>
  );
}
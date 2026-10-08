export default function DepartmentFilter({departments,value,onChange,}) {

  return (
    <div className="filter-bar">
      <label htmlFor="department">Department</label>
      <select
        id="department"
        value={value}
        onChange={(event) =>onChange(event.target.value)}>
          {departments.map((department) => (
            <option key={department} value={department}>{department}</option>))}
            </select>
            </div>
  );
}
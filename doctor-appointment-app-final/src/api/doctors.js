export async function loadDoctors(signal) {
  const response = await fetch("/doctors.json",
    {signal,});

    if (!response.ok) {throw new Error(`Failed to load doctors (${response.status})`);}
  return response.json();
}
export async function loadDoctor(id,signal) {
  const doctors =await loadDoctors(signal);
  return (
    doctors.find(
      (doctor) => doctor.id === id
    ) || null
  );
}
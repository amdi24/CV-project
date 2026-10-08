export default function Loading({message = "Loading...",}) {
  return (
    <div className="state-box" role="status">
      <p>{message}</p>
    </div>
  );
}
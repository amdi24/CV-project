export default function ErrorMessage({message,}) {
  return (
    <div className="state-box error" role="alert">
      <h2>Something went wrong</h2>
      <p>{message}</p>
    </div>
  );
}
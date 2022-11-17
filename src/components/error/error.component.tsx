import "./error.style.scss";
const Error = ({ message }: { message: string }) => {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
};

export default Error;

import { useContext, useEffect } from "react";
import { showErrorContext } from "../../contexts/showError.context";
import "./errorMessage.style.scss";
const ErrorMessage = () => {
  const { errorMessage, setErrorMessage } = useContext(showErrorContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  });
  return (
    <>
      {errorMessage && (
        <div className="error">
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;

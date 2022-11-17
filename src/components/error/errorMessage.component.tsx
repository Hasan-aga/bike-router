import { useContext } from "react";
import { showErrorContext } from "../../contexts/showError.context";
import "./errorMessage.style.scss";
const ErrorMessage = () => {
  const { errorMessage, setErrorMessage } = useContext(showErrorContext);
  let timer;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    setErrorMessage("");
  }, 3000);
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

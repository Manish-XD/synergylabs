import "../css/spinner.css";

function Spinner({isOpen, onClose}) {
  return (
    <div className="spinner__container">
        <img src="/spinner.webp" alt="Loading..."/>
    </div>
  )
}

export default Spinner;
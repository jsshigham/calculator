import  PropTypes  from "prop-types";

function DigitButton({ dispatch, digit, uniqueID }) {
  return (
    <button
    id={uniqueID}
    onClick={() => dispatch({ type: "add-digit", payload: { digit } })}
    className="buttons"
  >
    {digit}
  </button>
  )
}
DigitButton.propTypes = {
    dispatch: PropTypes.object.isRequired,
    digit: PropTypes.string.isRequired,
    uniqueID: PropTypes.string.isRequired,

  }
export default DigitButton;
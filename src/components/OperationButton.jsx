import  PropTypes  from "prop-types";

function OperationButton({ dispatch, operation, uniqueID }) {
  return (
    <button
    id={uniqueID}
    onClick={() =>
      dispatch({ type: "choose-operation", payload: { operation } })
    }
    className="buttons"
  >
    {operation}
  </button>
    )

}

OperationButton.propTypes = {
  dispatch: PropTypes.object.isRequired,
  operation: PropTypes.string.isRequired,
  uniqueID: PropTypes.string.isRequired,

}

export default OperationButton
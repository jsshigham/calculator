import { useReducer } from "react";
import OperationButton from "./components/OperationButton";
import DigitButton from "./components/DigitButton";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "add-digit":
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      } else if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      if (state.currentOperand === "0" && payload.digit !== ".") {
        return {
          ...state,
          currentOperand: payload.digit,
        };
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case "choose-operation":
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null && payload.operation == "-") {
        return {
          ...state,
          currentOperand: payload.operation,
        };
      }

      if (state.currentOperand == "-") {
        return {
          ...state,
          operation: `${state.operation} ${state.currentOperand} ${payload.operation}`,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case "clear":
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: "0",
      };
    case "evaluate":
      if (
        state.currentOperand == null &&
        state.previousOperand == null &&
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
};

function evaluate({ currentOperand, operation, previousOperand }) {
  const opp = operation.slice(-1);
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(curr) || isNaN(prev)) return "";
  let result = "";
  switch (opp) {
    case "*":
      result = curr * prev;
      break;
    case "/":
      result = prev / curr;
      break;
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
  }
  return result.toString();
}

const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator">
      <div id="displayContainer">
        <p id="calc">
          {previousOperand} {operation}
        </p>
        <p id="display">{currentOperand}</p>
      </div>
      <button
        id="clear"
        onClick={() => dispatch({ type: "clear", payload: "0" })}
      >
        AC
      </button>
      <OperationButton uniqueID="multiply" operation="*" dispatch={dispatch} />
      <OperationButton uniqueID="divide" operation="/" dispatch={dispatch} />
      <DigitButton uniqueID="seven" digit="7" dispatch={dispatch} />
      <DigitButton uniqueID="eight" digit="8" dispatch={dispatch} />
      <DigitButton uniqueID="nine" digit="9" dispatch={dispatch} />
      <OperationButton uniqueID="subtract" operation="-" dispatch={dispatch} />
      <DigitButton uniqueID="four" digit="4" dispatch={dispatch} />
      <DigitButton uniqueID="five" digit="5" dispatch={dispatch} />
      <DigitButton uniqueID="six" digit="6" dispatch={dispatch} />
      <OperationButton uniqueID="add" operation="+" dispatch={dispatch} />
      <DigitButton uniqueID="one" digit="1" dispatch={dispatch} />
      <DigitButton uniqueID="two" digit="2" dispatch={dispatch} />
      <DigitButton uniqueID="three" digit="3" dispatch={dispatch} />
      <button id="equals" onClick={() => dispatch({ type: "evaluate" })}>
        =
      </button>
      <DigitButton uniqueID="zero" digit="0" dispatch={dispatch} />
      <DigitButton uniqueID="decimal" digit="." dispatch={dispatch} />
    </div>
  );
};

export default App;

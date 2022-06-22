import React, { useReducer } from 'react';
import DigitButton from "./digitbutton";
import OperationButton from "./operationbutton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE: 'delete',
  COMPUTE: 'compute',
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite){
        return {
          ...state,
          currentOperand: `${payload.digit}`,
          overwrite: false
        }
      }
      if (payload.digit === '0' && state.currentOperand === 0) 
        return state
      if (state.currentOperand === '0') {
        return {
          ...state,
          currentOperand: `${payload.digit}`,
        }
      }
      if (payload.digit === '.' && (state.currentOperand.includes(".") || state.currentOperand === null))
        return state
     
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === null && state.previousOperand === null)
        return state
      
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: `${state.currentOperand}`,
          currentOperand: null,
          operation: `${payload.operation}`,
        }
      }

      return {
        ...state,
        currentOperand: 0,
        operation: null,
        previousOperand: evaluate(state),
      }
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DELETE:
      if (state.currentOperand.charAt(state.currentOperand.length-2) === '.')
        return {
          currentOperand: `${state.currentOperand.slice(0, -2)}`
        }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: '0',
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand.slice(0, -1)}`
      }

    case ACTIONS.COMPUTE:
      if (state.currentOperand === null || state.currentOperand === '0' || state.previousOperand === null || state.previousOperand === '0' || state.operation === null)
        return state
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
    default:
      return null
  }
}

function evaluate ({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)

  let computation = ""

  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "/":
      computation = prev / current
      break
    case "*":
      computation = prev * current
      break
    default:
      return null
  }
  return computation.toString()
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )
  return (
    <div className="mx-auto grid grid-cols-4 mt-8 bg-white opacity-80 gap-1 p-4 w-80">
      <div className='col-span-4 bg-blue-900 flex justify-around flex-col p-4 h-24 min-h-full -m-4 mb-3'>
        <div className='text-white text-right opacity-75 pb-2'>{previousOperand} {operation}</div>
        <div className='text-white text-right text-3xl'>{currentOperand}</div>
      </div>
      <button className='col-span-2 bg-slate-200 p-3 hover:bg-white' onClick={() => dispatch({ type:ACTIONS.CLEAR })}>AC</button>
      <button className='bg-slate-200 p-3 hover:bg-white' onClick={() => dispatch({ type:ACTIONS.DELETE })}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className='col-span-2 bg-slate-200 p-3 hover:bg-white' onClick={() => dispatch({ type:ACTIONS.COMPUTE })}>=</button>
    </div>
  );
}

export default App;

import { ACTIONS } from './App'

function DigitButton ({ dispatch, digit }) {
  return (
    <button className='bg-slate-200 p-3 hover:bg-white' onClick={() => dispatch({ type:ACTIONS.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  )
}

export default DigitButton;
import { ACTIONS } from './App';

function OperationButton ({ dispatch, operation }) {
  return (
    <button className='bg-slate-200 p-3 hover:bg-white' onClick={() => dispatch({ type:ACTIONS.CHOOSE_OPERATION, payload: { operation } })}>
      {operation}
    </button>
  )
}

export default OperationButton;
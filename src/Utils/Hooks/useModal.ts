import { useReducer } from 'react';

function useModal() {
  const [isOpen, dispatch] = useReducer(reducer, false);

  return {
    isOpen,
    dispatch,
  };
}

enum ACTION {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

function reducer(state: boolean, action: { type: ACTION }): boolean {
  switch (action.type) {
    case ACTION.OPEN:
      document.body.classList.add('max-h-screen', 'overflow-y-hidden');
      return true;
    case ACTION.CLOSE:
      document.body.classList.remove('max-h-screen', 'overflow-y-hidden');
      return false;
    default:
      return state;
  }
}

export default useModal;
export { ACTION };

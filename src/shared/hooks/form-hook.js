import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT-CHANGE':
      let formisValid = true;
      for (const inputID in state.inputs)
        if (inputID === action.inputID) {
          formisValid = formisValid && action.isValid;
        }
        else {
          formisValid = formisValid && state.inputs[inputID].isValid;
        }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputID]: { value: action.value, isValid: action.isValid }
        },
        isValid: formisValid
      };
    case 'SET-DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  })

  const inputHandler = useCallback((id, isValid, value) => {
    dispatch({
      type: 'INPUT-CHANGE',
      value: value,
      validity: isValid,
      inputID: id
    })
  }, []);
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET-DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, [])
  return [formState, inputHandler, setFormData];
};
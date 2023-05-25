import React, { useReducer, useEffect } from "react";
import 'Input.css'
import { validate } from "../../util/validators";


const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    isValid: false,
    isTouched: false,
    value: props.initialValue
  });

  const inputReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE-':
        return {
          ...state,
          value: action.val,
          isValid: validate(action.validators)
        };
      case 'Touch - ':
        return {
          ...state,
          isTouched: true
        }
      default:
        return state;
    }
  };

  const inputHandler = event => {
    dispatch({
      type: 'CHANGE-',
      val: event.target.value,
      validators: props.validators
    });
  };
  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };
  const [isValid, value] = inputState;
  const [id, onInput] = props;
  useEffect(() => {
    onInput(id, isValid, value)
  }, [id, isValid, value, onInput])

  const element =
    props.element === 'input' ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.initialValue}
        onChange={inputHandler}
        onBlur={touchHandler}
      />
    ) : (
      <textArea>

      </textArea>
    );

  return (
    <div>
      <label htmlFor={props.id}>{props.lable}</label>
      {element}
      {!inputState.isvalid && inputState.isTouched && <p>{props.errorMessage}</p>}
    </div>
  );
};

export default Input;
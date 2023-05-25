import React from "react";
import Input from "../../shared/components/FormElements/Input"
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import useForm from "../../shared/hooks/form-hook"
import './PlaceForm.css'

const NewPlace = () => {

  const [formState, inputHandler] = useForm({
    title: {
      isValid: false,
      value: ''
    }
  },
    false
  );
  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log("formState.inputs");
  }

  return (
    <form onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        placeHolder="Enter you name please"
        onInput={inputHandler}
        errorMessage="Please Enter valid Name ."
      />
      <button type="submit" disabled={!formState.isValid}> ADD PLACE </button>
    </form>
  );
}
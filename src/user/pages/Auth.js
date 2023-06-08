import React, { useContext, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";

export default function Auth() {

    const [isLogin, setLoginMode] = useState(true);
    const auth = useContext(AuthContext);
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
        false
    );

    const switchModeHandler = () => {
        //change form structure based on mode.
        if (!isLogin) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                ((formState.inputs.email.isValid) && (formState.inputs.password.isValid))
            );
        }
        else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setLoginMode(previous => !previous);
    }

    const userSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    return (
        <Card className="authentication" >
            <h2>LOGIN REQUIRED</h2>
            <hr />
            <form onSubmit={userSubmitHandler}>
                {!isLogin && (
                    <Input
                        id="name"
                        type="text"
                        element="input"
                        label="Your Name: "
                        errorText="Required field, Please enter valid name. "
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                    />)
                }
                <Input
                    id="email"
                    type="text"
                    element="input"
                    label="Email-id: "
                    errorText=" Please Enter a valid email Input. "
                    onInput={inputHandler}
                    validators={[VALIDATOR_EMAIL()]}
                />
                <Input
                    id="password"
                    type="password"
                    element="input"
                    label="Your Password"
                    errorText=" Please Enter a valid password input "
                    onInput={inputHandler}
                    validators={[VALIDATOR_MINLENGTH(8)]}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLogin ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                Switch to {isLogin ? 'Signup' : 'Login'}
            </Button>
        </Card>
    )
}
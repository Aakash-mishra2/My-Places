import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
    const auth = useContext(AuthContext);

    const [isLogin, setLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: ' ',
                isValid: false
            },
            password: {
                value: ' ',
                isValid: false
            }
        },
        false
    );
    const switchModeHandler = () => {
        if (!isLogin) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                ((formState.inputs.email.isValid) && (formState.inputs.password.isValid))
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: ' ',
                        isValid: false
                    }
                },
                false
            );
        }
        setLoginMode(prevMode => !prevMode);
    };
    const userSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    };
    return (
        <Card className="authentication">
            <h2>Login required</h2>
            <hr />
            <form onSubmit={userSubmitHandler}>
                {!isLogin && (
                    <Input
                        id="name"
                        type="text"
                        element="input"
                        label="Your Name. "
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name ."
                        onInput={inputHandler}
                    />
                )}
                <Input
                    id="email"
                    type="text"
                    element="input"
                    validators={[VALIDATOR_EMAIL()]}
                    label="Email"
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    type="password"
                    element="input"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password. Minimum length = 6. "
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLogin ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}
            </Button>
        </Card>
    )

}

export default Auth;

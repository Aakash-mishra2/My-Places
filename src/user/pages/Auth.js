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
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import './Auth.css';

export default function Auth() {

    const [isLogin, setLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

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
    const userSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (isLogin) {
            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    method: "POST",
                    headers: { 'Content-type': 'application/json' }
                });

                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                auth.login();
            }
            catch (err) {
                console.log(err);
                setError(err.message || "Something went wrong, please try again!. ");
                setIsLoading(false);
            }
        }
        else {
            try {
                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                console.log(responseData);
                setIsLoading(false);
                auth.login();
            } catch (err) {
                console.log(err);
                setError(err.message || "Something went wrong, please try again!. ")
                setIsLoading(false);
            }
        }
    };
    const errorHandler = () => { setError(null); }
    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading ... </h2>
            </div>
        );

    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
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
        </React.Fragment>

    )
}
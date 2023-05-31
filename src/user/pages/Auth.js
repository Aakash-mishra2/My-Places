import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const Auth = () => {
    const auth = useContext(AuthContext);

    const [isLogin, setLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
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
                formState.inputs.email.isValid && formState.inputs.password.isValid
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
    const userSubmitHandler = async event => {
        event.preventDefault();
        if (isLogin) {

        } else {
            try {
                setIsLoading(true);

                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        //without backend won't know what kind of data it recieves. our body parser will not kick in correctly.
                        'Content-Type': 'application/json'
                    },
                    //takes regular js data array or object and covert to json data.
                    //keys that I am expecting at the backend route inside fetch when we expect new user.
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
                //if we throw the error, the code below will not execute.
                console.log(responseData);
                setIsLoading(false);
                auth.login();
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || 'Something went wrong, please try again.');
            }
        }

    };
    //line 86 to set the erro modal.
    //to reset the error
    const errorHandler = () => { setError(null); }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
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
        </React.Fragment>
    )

}

export default Auth;
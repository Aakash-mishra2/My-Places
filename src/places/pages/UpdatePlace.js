import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import './PlaceForm.css';

export default function UpdatePlace() {

    const DUMMY_PLACES = [
        {
            id: 'p1',
            title: 'Empire State Building',
            description: 'One of the most famous sky scrapers in the world!',
            imageUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
            address: '20 W 34th St, New York, NY 10001',
            location: {
                lat: 40.7484405,
                lng: -73.9878584
            },
            creator: 'u1'
        },
        {
            id: 'p2',
            title: 'Emp. State Building',
            description: 'One of the most famous sky scrapers in the world!',
            imageUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
            address: '20 W 34th St, New York, NY 10001',
            location: {
                lat: 40.7484405,
                lng: -73.9878584
            },
            creator: 'u2'
        }
    ];

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const placeID = useParams().placeId;
    const identified_place = DUMMY_PLACES.find(p => p.id === placeID);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (identified_place) {
            setFormData({
                title: {
                    value: identified_place.title,
                    isValid: true
                },
                description: {
                    value: identified_place.title,
                    isValid: true
                }
            },
                true
            );
            setIsLoading(false);
        }
    }, [setFormData, identified_place])


    if (!identified_place) {
        return (
            <div className="center">
                <Card>
                    <p>No such places found!</p>
                </Card>
            </div>

        );
    }

    const placeSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if (isLoading) {
        return (
            <div>
                <h2> Loading ... </h2>
            </div>
        );
    }

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                label="Place Title: "
                type="text"
                element="input"
                errorText="Invalid Title. Please enter again ."
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.valid}
            />
            <Input
                id="desc"
                label="Place Description :"
                type="text"
                element="textarea"
                errorText=" Enter valid Description of over 20 words."
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(20)]}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.valid}
            />
            <Button type="submit" disabled={!formState.isValid}>UPDATE</Button>
        </form>
    );
};
import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useParams } from 'react-router-dom';
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
const UpdatePlace = () => {
    const placeId = useParams().placeId;

    const updatePlace = DUMMY_PLACES.find(p => p.id === placeId);
    if (!updatePlace) {
        return (<div className='center'><h2>COULD NOT FIND PLACES. </h2></div>);
    }
    return <form>
        <Input
            id="title"
            type="text"
            element="input"
            placeholder="Enter place's name."
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter suitable title."
            onInput={() => { }}
            value={updatePlace.title}
            valid={true}
        />
        <Input
            id="description"
            type="text"
            element="textarea"
            placeholder="Enter description name."
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a suitable description of min 5 characters."
            onInput={() => { }}
            //UPDATEplace form needs to support 
            value={updatePlace.description}
            valid={true}
        />
        <Button type="Submit" disabled={true} >
            UPDATE PLACE
        </Button>
    </form>
};

export default UpdatePlace;
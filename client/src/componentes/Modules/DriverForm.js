import React, {useEffect, useState} from 'react';
import {ServerApi} from '../../utils';

const DriverForm = (props) => {

    const [state, setState] = useState({
        id: 0,
        name: '',
        number: '',
    });

    const {id, name, number} = state;

    const handlerInputChange = (event) => {
        switch (event.target.name) {
            case 'name':
                setState({...state, name: event.target.value});
                break;
            case 'number':
                setState({...state, number: event.target.value});
                break;
        }
    };

    const fromStarter = async () => {
        if (typeof props.id != 'undefined' && props.id) {
            await getData(props.id);
        }
    };

    const submitForm = () => {
        const param = {
            id,
            name,
            number,
        };

        if (!name) {
            alert('Missing Name');
            return;
        }

        if (!number) {
            alert('Missing Number');
            return;
        }

        ServerApi.setDriver(param).then(resp => {
            if (resp.data.status) {
                window.location.href = '/drivers';
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    const getData = async (driver_id) => {
        await ServerApi.getDriver(driver_id).then(async resp => {
            if (resp.data.status) {
                await setState({
                    ...state,
                    id: resp.data.data.id,
                    name: resp.data.data.name,
                    number: resp.data.data.number,
                });
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    useEffect(() => {
        fromStarter();
    }, []);

    return (
        <form id="form" method="post">
            <input type="hidden" name="id" value={id}/>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" value={name} onChange={handlerInputChange}/>
            </div>
            <div>
                <label htmlFor="number">Number</label>
                <input id="number" type="text" name="number" value={number} onChange={handlerInputChange}/>
            </div>
            <button type="button" onClick={submitForm}>Submit</button>
        </form>
    );

};

export default DriverForm;
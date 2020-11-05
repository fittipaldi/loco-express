import React, {useEffect, useState} from 'react';
import {ServerApi} from '../../utils';

const RouteForm = (props) => {

    const [state, setState] = useState({
        id: 0,
        departure: '',
        arrival: '',
        shift: '',
    });

    const {id, departure, arrival, shift} = state;

    const handlerInputChange = (event) => {
        switch (event.target.name) {
            case 'departure':
                setState({...state, departure: event.target.value});
                break;
            case 'arrival':
                setState({...state, arrival: event.target.value});
                break;
            case 'shift':
                setState({...state, shift: event.target.value});
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
            departure,
            arrival,
            shift,
        };

        if (!departure) {
            alert('Missing Departure');
            return;
        }

        if (!arrival) {
            alert('Missing Arrival');
            return;
        }

        if (!shift) {
            alert('Missing Shift');
            return;
        }

        ServerApi.setRoute(param).then(resp => {
            if (resp.data.status) {
                window.location.href = '/routes';
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    const getData = async (route_id) => {
        await ServerApi.getRoute(route_id).then(async resp => {
            if (resp.data.status) {
                await setState({
                    ...state,
                    id: resp.data.data.id,
                    departure: resp.data.data.departure,
                    arrival: resp.data.data.arrival,
                    shift: resp.data.data.shift,
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
                <label htmlFor="departure">Departure</label>
                <input id="departure" type="text" name="departure" value={departure} onChange={handlerInputChange}/>
            </div>
            <div>
                <label htmlFor="arrival">Arrival</label>
                <input id="arrival" type="text" name="arrival" value={arrival} onChange={handlerInputChange}/>
            </div>
            <div>
                <label htmlFor="shift">Shift</label>
                <input id="shift" type="text" name="shift" value={shift} onChange={handlerInputChange}/>
            </div>
            <button type="button" onClick={submitForm}>Submit</button>
        </form>
    );

};

export default RouteForm;
import React, {useEffect, useState} from 'react';
import {ServerApi} from '../../utils';
import Header from '../Modules/Header';
import Loading from '../Modules/Loading';
import Footer from '../Modules/Footer';
import {Col, Grid, Row} from "react-flexbox-grid";

const Home = (props) => {

    const [state, setState] = useState({
        items: [],
        isLoading: false,
        message: '',
    });

    const {items, isLoading, message} = state;

    const loadScheduleData = async () => {
        try {
            await setState({...state, isLoading: true, items: []});
            ServerApi.getSchedule().then(async (resp) => {
                if (resp.data.status) {
                    await setState({...state, isLoading: false, message: '', items: resp.data.data});
                } else {
                    await setState({...state, isLoading: false, message: resp.msg, items: []});
                    console.log(resp.msg);
                }
            }).catch(async (err) => {
                const msg = (typeof err.message != 'undefined') ? err.message : err;
                await setState({...state, isLoading: false, message: msg, items: []});
                console.log(msg);
            });
        } catch (err) {
            const msg = (typeof err.message != 'undefined') ? err.message : err;
            await setState({...state, isLoading: false, message: msg, items: []});
            console.log(msg);
        }

    };

    const generateSchedule = async () => {
        await ServerApi.scheduleGenerator().then(async resp => {
            if (resp.data.status) {
                loadScheduleData();
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    useEffect(() => {
        loadScheduleData();
    }, []);

    return (
        <div className="App">

            <Header/>

            <div className="content-site">

                {(isLoading) && <Loading/>}

                <h1>Schedule</h1>
                <p>
                    <button className="link-add" onClick={generateSchedule}>Generate the Schedule</button>
                </p>

                <div className="clear-fix"></div>
                <Grid fluid>
                    <Row>
                        {Object.keys(items).map(i => (
                            <Col md={12} className="col-items">
                                <div className="row-item">
                                    {items[i].day} / {items[i].route.shift} -
                                    Route: {items[i].route.departure} - {items[i].route.arrival} -
                                    Driver: {items[i].driver.name}
                                </div>
                                <div className="clear-fix"></div>
                            </Col>
                        ))}
                    </Row>
                </Grid>

            </div>

            <Footer/>

        </div>
    )
};

export default Home;
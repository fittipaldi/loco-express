import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Loading from '../Modules/Loading';
import {Col, Grid, Row} from 'react-flexbox-grid';
import Footer from '../Modules/Footer';
import Header from '../Modules/Header';
import RouteForm from '../Modules/RouteForm';

const DriverItem = (props) => {

    const [state, setState] = useState({
        isLoading: false,
        message: ''
    });

    const {id} = useParams();
    const {isLoading, message} = state;

    return (
        <div className="App">

            <Header/>

            <div className="content-site">

                {(isLoading) && <Loading/>}

                <h1>Route</h1>

                <Grid fluid>
                    <Row>
                        <Col md={12} className="col-items">
                            <RouteForm id={id}/>
                        </Col>
                    </Row>
                </Grid>
            </div>

            <Footer/>

        </div>
    )
};

export default DriverItem;
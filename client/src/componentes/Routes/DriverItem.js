import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Loading from '../Modules/Loading';
import {Col, Grid, Row} from 'react-flexbox-grid';
import Footer from '../Modules/Footer';
import DriverForm from '../Modules/DriverForm';
import Header from "../Modules/Header";

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

                <h1>Driver</h1>

                <Grid fluid>
                    <Row>
                        <Col md={12} className="col-items">
                            <DriverForm id={id}/>
                        </Col>
                    </Row>
                </Grid>
            </div>

            <Footer/>

        </div>
    )
};

export default DriverItem;
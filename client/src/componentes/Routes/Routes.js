import React, {useEffect, useState} from 'react';
import {Col, Grid, Row} from 'react-flexbox-grid';
import {ServerApi} from '../../utils';
import Header from '../Modules/Header';
import Loading from '../Modules/Loading';
import Footer from '../Modules/Footer';

const Routes = (props) => {

    const [state, setState] = useState({
        items: [],
        isLoading: false,
        message: ''
    });

    const {items, isLoading, message} = state;

    const handleLoadRoutes = async () => {
        try {
            await setState({...state, isLoading: true, items: []});
            ServerApi.getRoutes().then(async (resp) => {
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

    const deleteRoute = (id) => {
        if (window.confirm('Are you sure?')) {
            ServerApi.deleteRoute(id).then(async (resp) => {
                if (resp.data.status) {
                    window.location.reload();
                } else {
                    alert(resp.msg);
                }
            }).catch(async (err) => {
                const msg = (typeof err.message != 'undefined') ? err.message : err;
                await setState({...state, isLoading: false, message: msg});
                alert(msg);
            });
        }
    };

    useEffect(() => {
        handleLoadRoutes();
    }, []);

    return (
        <div className="App">

            <Header/>

            <div className="content-site">

                {(isLoading) && <Loading/>}

                <h1>Routes</h1>
                <p>
                    <a className="link-add" href="/add-route">Add</a>
                </p>

                <Grid fluid>
                    <Row>
                        {Object.keys(items).map(i => (
                            <Col md={12} className="col-items">
                                <div className="row-item">
                                    From: {items[i].departure} - To: {items[i].arrival} - Shift {items[i].shift}
                                    <div className="action-btn">
                                        <a className="link-edit" href={'/edit-route/' + items[i].id}>Edit</a>
                                        <a className="link-delete" onClick={() => {
                                            deleteRoute(items[i].id)
                                        }}>Delete</a>
                                    </div>
                                    <div className="clear-fix"></div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Grid>
            </div>

            <Footer/>

        </div>
    )
};

export default Routes;
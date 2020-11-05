import React, {useEffect, useState} from 'react';
import {Col, Grid, Row} from 'react-flexbox-grid';
import {ServerApi} from '../../utils';
import Header from '../Modules/Header';
import Loading from '../Modules/Loading';
import Footer from '../Modules/Footer';

const Drivers = (props) => {

    const [state, setState] = useState({
        items: [],
        isLoading: false,
        message: ''
    });

    const {items, isLoading, message} = state;

    const handleLoadDrivers = async () => {
        try {
            await setState({...state, isLoading: true, items: []});
            ServerApi.getDrivers().then(async (resp) => {
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

    const deleteDriver = (id) => {
        if (window.confirm('Are you sure?')) {
            ServerApi.deleteDriver(id).then(async (resp) => {
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
        handleLoadDrivers();
    }, []);

    return (
        <div className="App">

            <Header/>

            <div className="content-site">

                {(isLoading) && <Loading/>}

                <h1>Drivers</h1>
                <p>
                    <a className="link-add" href="/add-driver">Add</a>
                </p>

                <div className="clear-fix"></div>
                <Grid fluid>
                    <Row>
                        {Object.keys(items).map(i => (
                            <Col md={12} className="col-items">
                                <div className="row-item">
                                    {items[i].name} - {items[i].number}
                                    <div className="action-btn">
                                        <a className="link-edit" href={'/edit-driver/' + items[i].id}>Edit</a>
                                        <a className="link-delete" onClick={() => {
                                            deleteDriver(items[i].id)
                                        }}>Delete</a>
                                    </div>
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

export default Drivers;
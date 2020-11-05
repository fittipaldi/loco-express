import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './componentes/Routes/Home';
import NotFound from './componentes/Routes/NotFound';
import Drivers from './componentes/Routes/Drivers';
import DriverItem from './componentes/Routes/DriverItem';
import Routes from './componentes/Routes/Routes';
import RouteItem from './componentes/Routes/RouteItem';

function App(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/drivers" component={Drivers}/>
                <Route exact path="/add-driver" component={DriverItem}/>
                <Route exact path="/edit-driver/:id" component={DriverItem}/>

                <Route exact path="/routes" component={Routes}/>
                <Route exact path="/add-route" component={RouteItem}/>
                <Route exact path="/edit-route/:id" component={RouteItem}/>

                <Route path="*" component={NotFound}/>
            </Switch>
        </Router>
    );
}

export default App;

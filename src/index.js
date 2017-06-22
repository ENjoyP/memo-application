import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router,
    HashRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { App, Home, Login, Register } from 'containers';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path='/' component={Home}/> 
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </Switch>
        </App>
    </Router>,
    rootElement
);

import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import About from 'content/About';
import SimpleAddition from 'content/SimpleAddition';


import './App.scss';
import TopNav from 'components/TopNav';
import {LabeledPath} from 'model/types';
import Topics from 'content/Topics';

type Props = {};

type State = {};

const home: LabeledPath = {label: 'DSP Playground', path: '/'};
const links = [
    {label: 'Topics', path: '/topics' },
    {label: 'About', path: '/about' },
];
const navProps = {home, links};

class App extends Component<Props, State> {


    render(): JSX.Element {
        return (
            <div className="App">
                <Router>
                    <TopNav {...navProps} />
                    <Switch>
                        <Route path="/add-sines">
                            <SimpleAddition />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/topics">
                            <Topics />
                        </Route>
                        <Route path="/">
                            <Topics />
                        </Route>
                    </Switch>
                </Router>



            </div>
        );
    };
}
export default App;

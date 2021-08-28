import React, { Component } from 'react';
import {
    HashRouter,
    Switch,
    Route,
} from 'react-router-dom';

import preval from 'preval.macro'

import About from 'content/About';
import SimpleAddition from 'content/SimpleAddition';


import './App.scss';
import TopNav from 'components/TopNav';
import {LabeledPath} from 'model/types';
import ConvolutionSteps from './content/ConvolutionSteps/ConvolutionSteps';
import Topics from 'content/Topics';
import SumOfManySines from 'content/SumOfManySines';
import UnitCircleAndCurves from 'content/UnitCircleAndCurves/UnitCircleAndCurves';
import SineOverTime from 'content/SineOverTime';
import SoundsFromSines from "./content/SoundsFromSines";

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
        const buildStamp = preval`module.exports = new Date().toLocaleString();`;
        return (
            <div className="App">
                <HashRouter basename="/">
                    <TopNav {...navProps} centerText=""/>
                    <Switch>
                        <Route path="/unit-circle">
                            <UnitCircleAndCurves />
                        </Route>
                        <Route path="/sine-over-time">
                            <SineOverTime />
                        </Route>
                        <Route path="/add-sines">
                            <SimpleAddition />
                        </Route>
                        <Route path="/sum-many-sines">
                            <SumOfManySines />
                        </Route>
                        <Route path="/sounds-from-sines">
                            <SoundsFromSines/>
                        </Route>
                        <Route path="/convolution-steps">
                            <ConvolutionSteps/>
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

                    <TopNav {...navProps} centerText={`© 2021 - WoundedPixels.com  Last build at: ${buildStamp}`} />
                </HashRouter>
            </div>
        );
    };
}
export default App;

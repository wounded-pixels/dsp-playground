import React, { Component } from 'react';

import SimpleAddition from "./content/addition/SimpleAddition";

import './App.scss';

type Props = {};

type State = {};

class App extends Component<Props, State> {

    render(): JSX.Element {
        return (
            <div className="App">
                <SimpleAddition />
            </div>
        );
    };
};
export default App;

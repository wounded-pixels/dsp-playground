import React, { FunctionComponent, CSSProperties } from 'react';

import {IconButton, Tooltip } from '@material-ui/core';
import {ContactSupport} from '@material-ui/icons';

type HintProps = {text: string};
const hintStyles: CSSProperties = {};
export const Hint: FunctionComponent<HintProps> = ({text, children}) => {
    return (
        <div style={hintStyles}>
            {children}
            <Tooltip title={text}>
                <IconButton aria-label="hint">
                    <ContactSupport fontSize="small"/>
                </IconButton>
            </Tooltip>
        </div>
    );
};

type KeyIdeaProps = {};
const keyIdeaStyles: CSSProperties = {
    background: '#f6ebb0',
    margin: '10px 0',
    padding: '10px 10px',
};
export const KeyIdea: FunctionComponent<KeyIdeaProps> = ({children}) => {
    return (
        <div style={keyIdeaStyles}>
            {children}
        </div>
    );
};

type RowProps = {};
const rowStyles: CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 2,
    justifyContent: 'center',
    width: '100%',
};
export const Row: FunctionComponent<RowProps> = ({children}) => {
    return (
        <div style={rowStyles}>
            {children}
        </div>
    );
};

type ContextProps = {};
const contextStyles: CSSProperties = {
    paddingTop: '5px',
};
export const Context: FunctionComponent<ContextProps> = ({children}) => {
    return (
    <div style={contextStyles}>
    {children}
    </div>
    );
};

type TopicProps = {};
const topicStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    textAlign: 'left',
    width: '85%',
};
export const Topic: FunctionComponent<TopicProps> = ({children}) => {
    return (
      <div style={topicStyles}>
          {children}
      </div>
    );
};

type SymbolProps = {};
const symbolStyles: CSSProperties = {
    display: 'flex',
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    width: '150px',
    height: '32px',
};
export const Symbol: FunctionComponent<SymbolProps> = ({children}) => {
    return (
      <div style={symbolStyles}>
          {children}
      </div>
    );
};

type VisualizationProps = {};
const visualizationStyles: CSSProperties = {
    padding: '10px 10px',
};
export const Visualization: FunctionComponent<VisualizationProps> = ({children}) => {
    return (
      <div style={visualizationStyles}>
          {children}
      </div>
    );
};


import React, { SFC, CSSProperties } from 'react';

import {Icon, IconButton, Tooltip } from '@material-ui/core';
import {ContactSupport, Info} from '@material-ui/icons';

type HintProps = {text: string};
const hintStyles: CSSProperties = {textAlign: 'left'};
export const Hint: SFC<HintProps> = ({text, children}) => {
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
    textAlign: 'left',
};
export const KeyIdea: SFC<KeyIdeaProps> = ({children}) => {
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
    textAlign: 'left',
    width: '100%',
};
export const Row: SFC<RowProps> = ({children}) => {
    return (
        <div style={rowStyles}>
            {children}
        </div>
    );
};

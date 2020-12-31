import React, { SFC, CSSProperties } from 'react';

import {IconButton, Tooltip } from '@material-ui/core';
import {ContactSupport} from '@material-ui/icons';

type HintProps = {text: string};
const hintStyles: CSSProperties = {textAlign: 'left'};
export const Hint: SFC<HintProps> = ({text, children}) => {
    return (
        <div style={hintStyles}>
            {children}
            <Tooltip title={text}>
                <IconButton aria-label="hint">
                    <ContactSupport/>
                </IconButton>
            </Tooltip>
        </div>
    );
};
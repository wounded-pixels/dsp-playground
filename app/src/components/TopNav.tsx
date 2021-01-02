import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import './TopNav.scss';
import {LabeledPath} from 'model/types';

const buildLink = (labeledPath: LabeledPath) => {
    return <Link key={labeledPath.path} to={labeledPath.path}>{labeledPath.label}</Link>
};


type Props = {home: LabeledPath, links: LabeledPath[]};
const TopNav: FunctionComponent<Props> = ({home, links}) => {
    const linkElements = links.map(buildLink);
    return (
        <div className="TopNav">
            { buildLink(home)}
            <div className="right-nav-link">
                {linkElements}
            </div>
        </div>
    );
};

export default TopNav;
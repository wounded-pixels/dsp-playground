import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import './TopNav.scss';
import { LabeledPath } from 'model/types';

const buildLink = (labeledPath: LabeledPath) => {
  return (
    <Link key={labeledPath.path} to={labeledPath.path}>
      {labeledPath.label}
    </Link>
  );
};

type Props = {
  home: LabeledPath;
  links: LabeledPath[];
  centerText: string;
};

const TopNav: FunctionComponent<Props> = ({ home, links, centerText }) => {
  const linkElements = links.map(buildLink);
  return (
    <div className="TopNav">
      <div className="left-nav-link">{buildLink(home)}</div>
      <div className="center-text">{centerText}</div>
      <div className="right-nav-link">{linkElements}</div>
    </div>
  );
};

export default TopNav;

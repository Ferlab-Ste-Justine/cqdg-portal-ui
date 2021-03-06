/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import Link from '@cqdg/components/Links/Link';

import './Tab.css';

const Tabs = ({
  activeKey,
  children,
  containerClassName = '',
  forceResetTable = false, // should be removed and use a callback instead, leaky abstraction
  panes,
  tabsKey,
  tabToolbar,
  type = 'default',
}) => (
  <div className={`containers-tab-layout ${containerClassName}`}>
    <div className={`containers-tab-nav ${type}`}>
      {panes.map((pane) => {
        return (
          <div
            className={`containers-tab ${activeKey === pane.id ? 'active' : ''}`}
            key={pane.id}
            >
            <Link
              className="containers-tab-link"
              forceResetOffset={forceResetTable}
              key={pane.id}
              merge
              query={{
                [tabsKey]: pane.id,
              }}
              >
              {pane.text}
            </Link>
          </div>
        );
      })}
      {tabToolbar && <span style={{ marginLeft: 'auto' }}>{tabToolbar}</span>}
    </div>
    {children}
  </div>
);

export default Tabs;

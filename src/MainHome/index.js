import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Post from './Post';

const Side = styled.div`
  flex: 0 1 200px;
  height: 100%;
`;
const Article = styled.div`
  flex: 1 0;
`;

const MainHome = () => (
  <Fragment>
    <Side>
      <Sidebar />
    </Side>
    <Article>
      <Switch>
        <Route path="/:tabId" component={Post} />
      </Switch>
    </Article>
  </Fragment>
);

export default MainHome;

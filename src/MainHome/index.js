import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Post from './Post';
import PostEditor from './Post/PostEditor';

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
        <Route path="/edit" component={PostEditor} />
        <Route path="/:tabId?/:postId?" component={Post} />
      </Switch>
    </Article>
  </Fragment>
);

export default MainHome;

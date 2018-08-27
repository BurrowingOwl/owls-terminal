import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Post from './Post';
import PostView from './PostView';

const Side = styled.div`
  flex: 0 1 200px;
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
      <Route exact path="/" component={Post} />
      <Route path="/post/:postId" component={PostView} />
    </Article>
  </Fragment>
);

export default MainHome;

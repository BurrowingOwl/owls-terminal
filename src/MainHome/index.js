import React, { Fragment } from 'react';
import styled from 'styled-components';

import Sidebar from './Sidebar';
import Post from './Post';

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
      <Post />
    </Article>
  </Fragment>
);

export default MainHome;

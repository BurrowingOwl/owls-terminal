import React from 'react';
import styled from 'styled-components';
import Sidebar from '@/Sidebar';
import Post from '@/Post';

const Container = styled.div`
  width: 100%;

  display: flex;
`;
const Side = styled.div`
  flex: 0 1 200px;
`;
const Main = styled.div`
  flex: 1 0;
`;
class App extends React.Component {
  state = {
    selectedTabId: '',
  };
  changeTab = (tabId) => () => {
    this.setState({
      selectedTabId: tabId,
    });
  }
  render() {
    const { selectedTabId } = this.state;
    return (
      <Container>
        <Side>
          <Sidebar changeTab={this.changeTab} selectedTabId={selectedTabId} />
        </Side>
        <Main>
          <Post selectedTabId={selectedTabId} />
        </Main>
      </Container>
    );
  }
}

export default App;

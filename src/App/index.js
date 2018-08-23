import React from 'react';
import styled from 'styled-components';
import Header from '@/Header';
import Sidebar from '@/Sidebar';
import Post from '@/Post';
import Login from '@/Login';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Section = styled.div`
  width: 100%;
  
  display: flex;
`;
const Side = styled.div`
  flex: 0 1 200px;
`;
const Main = styled.div`
  flex: 1 0;
`;

const GET_LOGIN_DATA = gql`
  query getLoginData {
    login @client {
      _id
      username
      name
      isLoggedIn
    }
  }
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
        <Query query={GET_LOGIN_DATA}>
          {
            ({ data }) => {
              if (!data.login.isLoggedIn) {
                return <Login />;
              }
              return (
                <React.Fragment>
                  <Header />
                  <Section>
                    <Side>
                      <Sidebar changeTab={this.changeTab} selectedTabId={selectedTabId} />
                    </Side>
                    <Main>
                      <Post selectedTabId={selectedTabId} />
                    </Main>
                  </Section>
                </React.Fragment>
              );
            }
          }
        </Query>
      </Container>
    );
  }
}

export default App;

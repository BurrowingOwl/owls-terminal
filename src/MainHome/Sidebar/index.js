import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Loading } from '@/common';
import TabList from './TabList';
import TabItem from './TabItem';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-basis: 200px;
  flex-shrink: 0;
  min-width: 1px;
  min-height: 100%;
  max-width: 260px;
  z-index: 201;
  box-sizing: content-box;
  visibility: visible;

  background-color: #118ad5;
  color: white;
`;

const Header = styled.div`
  font-size: 1.2em;
  font-weight: 900;

  margin: 1rem;
`;
const GET_TABS = gql`
  query getTabs {
    tabs {
      _id
      name
    }
  }
`;
const GET_SELECTED_TAB = gql`
  query getSelectedTab {
    selectedTabId @client
  }
`;
const SELECT_TAB = gql`
  mutation selectTabId($tabId: String!) {
    selectTabId(tabId: $tabId) @client
  }
`;
const Sidebar = () => (
  <Container>
    <Mutation mutation={SELECT_TAB}>
      {
        selectTabId => (
          <Query query={GET_TABS} onCompleted={data => (data.tabs[0] ? selectTabId({ variables: { tabId: data.tabs[0]._id } }) : null)}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />;
              if (error) return <div>{`Error! ${error.message}`}</div>;
              return (
                <TabList>
                  <Header>Categories</Header>
                  {
                    data.tabs.map(tab => (
                      <Query key={tab._id} query={GET_SELECTED_TAB}>
                        {({ data: { selectedTabId } }) => (
                          <TabItem
                            key={tab._id}
                            name={tab.name}
                            selected={tab._id === selectedTabId}
                            onClick={() => selectTabId({ variables: { tabId: tab._id } })}
                          />
                        )}
                      </Query>
                    ))
                  }
                </TabList>
              );
            }}
          </Query>
        )
      }
    </Mutation>
  </Container>
);
export default Sidebar;

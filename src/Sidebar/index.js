import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Loading } from '@/common';
import TabList from './TabList';
import TabItem from './TabItem';

const GET_TABS = gql`
  {
    tabs {
      _id
      name
    }
  }
`;
const GET_SELECTED_TAB = gql`
  query {
    selectedTabId @client
  }
`;
const SELECT_TAB = gql`
  mutation selectTabId($tabId: String!) {
    selectTabId(tabId: $tabId) @client
  }
`;
const Sidebar = () => (
  <Mutation mutation={SELECT_TAB}>
    {
      selectTabId => (
        <Query query={GET_TABS} onCompleted={data => (data.tabs[0] ? selectTabId({ variables: { tabId: data.tabs[0]._id } }) : null)}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>{`Error! ${error.message}`}</div>;
            return (
              <TabList>
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
);
export default Sidebar;

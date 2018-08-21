import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loading } from '@/common';
import TabList from './TabList';
import TabItem from './TabItem';

const GET_TAGS = gql`
  {
    tabs {
      _id
      name
    }
  }
`;
const Sidebar = ({ changeTab, selectedTabId }) => (
  <Query query={GET_TAGS} onCompleted={data => (data.tabs[0] ? changeTab(data.tabs[0]._id)() : null)}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <div>{`Error! ${error.message}`}</div>;

      return (
        <TabList>
          {
            data.tabs.map(tab => (
              <TabItem
                key={tab._id}
                name={tab.name}
                selected={tab._id === selectedTabId}
                onClick={changeTab(tab._id)}
              />
            ))
          }
        </TabList>
      );
    }}
  </Query>
);
Sidebar.propTypes = {
  changeTab: PropTypes.func.isRequired,
  selectedTabId: PropTypes.string.isRequired,
};
export default Sidebar;

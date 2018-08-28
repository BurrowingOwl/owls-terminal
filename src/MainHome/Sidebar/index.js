import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter, matchPath } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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

  background-color: ${props => props.theme.primary};
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
class Sidebar extends Component {
  getRandomInRange = (max, min = 0) => Math.floor(Math.random(max - min + 1) + min);
  getTabIdFromParams = () => {
    const { location } = this.props;
    const matched = matchPath(location.pathname, {
      path: '/:tabId?/:postId?',
    });
    if (!matched || !matched.params) {
      return null;
    }
    return matched.params.tabId;
  }
  tabFetched = (tabs) => {
    const tabId = this.getTabIdFromParams();
    if (!tabId && tabs.length > 0) {
      const { history } = this.props;
      const randomTabId = tabs[this.getRandomInRange(tabs.length)]._id;
      history.replace(`/${randomTabId}`);
    }
  }
  render() {
    const tabId = this.getTabIdFromParams();
    return (
      <Container>
        <Query query={GET_TABS} onCompleted={data => this.tabFetched(data.tabs)}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>{`Error! ${error.message}`}</div>;
            return (
              <TabList>
                <Header>Categories</Header>
                {
                  data.tabs.map(tab => (
                    <TabItem
                      key={tab._id}
                      name={tab.name}
                      selected={tab._id === tabId}
                      {...tab}
                    />
                  ))
                }
              </TabList>
            );
          }}
        </Query>
      </Container>
    );
  }
}

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);

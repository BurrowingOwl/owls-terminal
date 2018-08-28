import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
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
  render() {
    const { match } = this.props;
    const { tabId } = match.params;
    return (
      <Container>
        <Query query={GET_TABS}>
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
  match: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);

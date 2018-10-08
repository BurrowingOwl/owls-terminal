import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

class ScrollSpy extends Component {
  static propTypes = {
    gap: PropTypes.number,
    onHit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    gap: 20,
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = debounce(() => {
    const { documentElement: dE } = document;
    const { onHit, gap } = this.props;
    if (dE.scrollHeight - dE.scrollTop - gap <= dE.clientHeight) {
      onHit();
    }
  }, 500);
  render() {
    return (
      <div style={{ visibility: 'hidden' }} />
    );
  }
}

export default ScrollSpy;

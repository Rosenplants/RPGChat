import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTab } from '../../store/tabOpen';

class TabList extends Component {
  handleClick = (evt) => {
    const { tabOpen, setTab } = this.props;
    console.log(tabOpen);
    console.log(evt.target.value);
    tabOpen === evt.target.value ? setTab('') : setTab(evt.target.value);
  };

  render() {
    return (
      <aside id="tabs">
        <button type="button" value="CharInfo" onClick={this.handleClick}>
          Test
        </button>
      </aside>
    );
  }
}

const mapState = (state) => ({
  tabOpen: state.tabOpen,
});

const mapDispatch = (dispatch) => ({
  setTab: (tabName) => dispatch(setTab(tabName)),
});

export default connect(mapState, mapDispatch)(TabList);

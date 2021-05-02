import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTab } from '../../store/tabOpen';

class TabList extends Component {
  handleClick = (evt) => {
    const { tabOpen, setTab } = this.props;
    tabOpen === evt.target.value ? setTab('') : setTab(evt.target.value);
  };

  render() {
    const { tabs } = this.props;
    return (
      <aside id="tabs">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            type="button"
            value={tab.name}
            onClick={this.handleClick}
          >
            {tab.name}
          </button>
        ))}
      </aside>
    );
  }
}

const mapState = (state) => ({
  tabOpen: state.tabOpen,
  tabs: state.tabs,
});

const mapDispatch = (dispatch) => ({
  setTab: (tabName) => dispatch(setTab(tabName)),
});

export default connect(mapState, mapDispatch)(TabList);

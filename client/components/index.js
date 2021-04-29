/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import Main from './Main';
import Navbar from './Navbar';
import TabList from './Tabs';
import TabContainer from './Tabs/TabContainer';

function Chat({ tabOpen }) {
  return (
    <div id="chat">
      <Navbar />
      <Main />
      <TabContainer />
      <TabList />
    </div>
  );
}

const mapState = (state) => ({
  tabOpen: state.tabOpen,
});

export default connect(mapState)(Chat);

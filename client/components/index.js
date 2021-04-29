/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Main from './Main';
import Navbar from './Navbar';
import TabList from './Tabs';
import TabContainer from './Tabs/TabContainer';

export default function Chat() {
  return (
    <div id="chat">
      <Navbar />
      <Main />
      <TabContainer />
      <TabList />
    </div>
  );
}

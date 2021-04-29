import React from 'react';
import { connect } from 'react-redux';
import CharInfo from './CharInfo';

function TabContainer({ tabOpen }) {
  return (
    <div id="tab-container" className={tabOpen ? 'open' : ''}>
      {tabOpen === 'CharInfo' ? <CharInfo /> : ''}
    </div>
  );
}

const mapState = (state) => ({
  tabOpen: state.tabOpen,
});

export default connect(mapState)(TabContainer);

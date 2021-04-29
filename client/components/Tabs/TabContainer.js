import React from 'react';
import { connect } from 'react-redux';
import CharInfo from './CharInfo';
import Notes from './Notes';
import Scenes from './Scenes';

function TabContainer({ tabOpen }) {
  return (
    <div id="tab-container" className={tabOpen ? 'open' : ''}>
      {tabOpen === 'CharInfo' ? <CharInfo /> : ''}
      {tabOpen === 'Notes' ? <Notes /> : ''}
      {tabOpen === 'Scenes' ? <Scenes /> : ''}
    </div>
  );
}

const mapState = (state) => ({
  tabOpen: state.tabOpen,
});

export default connect(mapState)(TabContainer);

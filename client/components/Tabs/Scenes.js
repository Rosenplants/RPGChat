import React, { Component } from 'react';
import { connect } from 'react-redux';
import SceneLi from './SceneLi';
import { sentScene } from '../../store/messages';

class Scenes extends Component {
  handleSceneSend = (evt) => {
    const { threadId, userId, sendScene } = this.props;
    sendScene(userId, threadId, evt.target.value);
  };

  render() {
    const { scenes } = this.props;
    return (
      <div id="Scenes">
        <h3>Your Scenes For This Game.</h3>
        {scenes.map((scene) => (
          <SceneLi
            scene={scene}
            key={scene.id}
            handler={this.handleSceneSend}
          />
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  scenes: state.scenes,
  userId: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  sendScene: (userId, threadId, sceneId) =>
    dispatch(sentScene(userId, threadId, sceneId)),
});

export default connect(mapState, mapDispatch)(Scenes);

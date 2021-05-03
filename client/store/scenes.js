// Action Type
const GOT_SCENES = 'GOT_SCENES';

// Action Creators
export const gotScenes = (scenes) => ({
  type: GOT_SCENES,
  scenes,
});

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GOT_SCENES:
      return action.scenes;
    default:
      return state;
  }
};

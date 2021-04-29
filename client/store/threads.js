// Reducer
const testState = [
  { id: 1, name: 'Game Room' },
  { id: 2, name: 'OOC Lounge' },
  { id: 3, name: 'GM Chat' },
];
export default (state = testState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

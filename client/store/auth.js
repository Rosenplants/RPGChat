// Reducer
const testState = {
  id: 1,
  email: 'test@test.com',
  name: 'Testy McTestFace',
};
export default (state = testState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
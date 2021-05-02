// Action Types
const GOT_THREADS = 'GOT_THREADS';

// Action Creators
export const gotThreads = (threads) => ({
  type: GOT_THREADS,
  threads,
});

// // Thunk Creators
// export const fetchThreads = (gameId) => {
//   return async (dispatch, getState, { axios }) => {
//     try {
//       const { data: threads } = await axios.get(`/api/games/${gameId}`);
//       dispatch(gotThreads(threads));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GOT_THREADS:
      return action.threads;
    default:
      return state;
  }
};

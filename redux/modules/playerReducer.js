const SET_CURRENT_PLAYING = "PLAYER//SET_CURRENT_PLAYING";
const RESET_PLAYER = "PLAYER//RESET_PLAYER";
const PLAY = "PLAYER//PLAY";
const PAUSE = "PLAYER//PAUSE";
const SET_POSITION = "PLAYER//PAUSE"
const initialState = {
  isPlaying: false,
  isVisible: false,
  currentPlaying: null,
  position: 0,
  playbackLoaded: false
};

export default function reducer(state = initialState, action = {}) {
  console.log(initialState);
  switch (action.type) {
    case SET_CURRENT_PLAYING:
      return {
        ...initialState,
        currentPlaying: action.payload.data,
        isPlaying: true,
        isVisible: true
      };
    case RESET_PLAYER:
      return {
        state: initialState
      };
    case PLAY:
      return {
        ...state,
        isPlaying: true
      }
    case SET_POSITION:
      return {
        ...state,
        position: action.payload.position
      }
    case PAUSE:
      return {
        ...state,
        isPlaying: false
      }

    default:
      return state;
  }
}

export const setCurrentPlaying = data => ({
  type: SET_CURRENT_PLAYING,
  payload: {
    data
  }
});
export const play = () => ({
  type: PLAY,
});
export const pause = () => ({
  type: PAUSE,
});
export const resetPlayer = () => ({
  type: RESET_PLAYER
});
export const setPosition = position => ({
  type: SET_POSITION,
  payload: {
    position
  }
})


export const getCurrentPlaying = state => state.player.currentPlaying;
export const getIsPlaying = state => state.player.isPlaying;
export const getIsVisible = state => state.player.isVisible;
export const getPosition = state => state.player.position
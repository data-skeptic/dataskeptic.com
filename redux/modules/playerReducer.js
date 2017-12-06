const SET_CURRENT_PLAYING ='SET_CURRENT_PLAYING'
const initialState = {
    isPlaying:false,
    isVisible:false,
    currentPlaying:null,
    position:null,
    playbackLoaded:false
}

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        case SET_CURRENT_PLAYING:
            return{
                ...state,
                currentPlaying:action.payload.data
            }
        default:
            return state
    }
}

export const setCurrentPlaying = data => ({
    type:SET_CURRENT_PLAYING,
    payload:{
        data
    }
})
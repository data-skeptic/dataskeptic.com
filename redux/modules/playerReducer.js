
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

        default:
            return state
    }
}
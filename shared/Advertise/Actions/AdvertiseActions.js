export const SET_ADVERTISE_CARD_CONTENT = 'SET_ADVERTISE_CARD_CONTENT';

export function setAdvertiseCardContent(content) {
    return {
        type: SET_ADVERTISE_CARD_CONTENT,
        payload: {
            content
        }
    }
}
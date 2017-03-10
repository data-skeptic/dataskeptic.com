export const CHANGE_COMMENT_TYPE = 'CHANGE_COMMENT_TYPE';

export function changeCommentType(type) {
    return {
        type: CHANGE_COMMENT_TYPE,
        payload: {
            type
        }
    }
}

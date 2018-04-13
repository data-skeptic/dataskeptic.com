export default (state) => ({
  ...state,
  list: {
    loading: false,
    loaded: false,
    error: null,
    offset: 0,
    limit: 10,
    hasMore: false,
    items: []
  }
})

export const getItems = (state) => state.list.item
export const getLoading = (state) => state.list.loading
export const getLoaded = (state) => state.list.loaded
export const getError = (state) => state.list.error
export const getLimit = (state) => state.list.limit
export const getOffset = (state) => state.list.offset
export const getHasMore = (state) => state.list.offset

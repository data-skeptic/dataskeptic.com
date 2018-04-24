export default state => ({
  ...state,
  list: {
    loading: false,
    loaded: false,
    error: null,
    offset: 0,
    limit: 10,
    total: 0,
    hasMore: true,
    items: []
  }
})

export const getItems = state => state.list && state.list.items
export const getLoading = state => state.list && state.list.loading
export const getLoaded = state => state.list && state.list.loaded
export const getError = state => state.list && state.list.error
export const getLimit = state => state.list && state.list.limit
export const getOffset = state => state.list && state.list.offset
export const getHasMore = state => state.list && state.list.hasMore
export const getTotal = state => state.list && state.list.total

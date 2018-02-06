import { createActions } from 'redux-actions'

export const {
  searchCatalystSuccess,
  searchCatalystBegin,
  searchCatalystFailure
} = createActions({
  SEARCH_CATALYST_SUCCESS: (data) => (data)
}, 'SEARCH_CATALYST_BEGIN', 'SEARCH_CATALYST_FAILURE')
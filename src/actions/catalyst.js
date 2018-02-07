import { createActions } from 'redux-actions'

export const {
  searchCatalystSuccess,
  searchCatalystFailure
} = createActions({
  SEARCH_CATALYST_SUCCESS: (data) => (data)
}, 'SEARCH_CATALYST_FAILURE')
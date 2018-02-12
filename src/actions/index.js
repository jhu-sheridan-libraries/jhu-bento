import { createActions } from 'redux-actions'

export const {
  searchBegin,
  searchCancel,
  searchSuccess,
  searchFailure
} = createActions('SEARCH_BEGIN', 'SEARCH_CANCEL', 'SEARCH_SUCCESS', 'SEARCH_FAILURE')
